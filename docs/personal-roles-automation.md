## Profiling

We should incorporate profiling into each worker, allowing us to track improvements over time. I'm currently determining the optimal tool for Node + TypeScript workers.

## Queue

We can use RabbitMQ queues to scale any step of the process. We can use Node+TS workers to consume these queues and work on their tasks concurrently. We could even have multiple workers operational simultaneously, if needed.

We should use CloudAMQP, it's an IaaS RabbitMQ service, it offers a great free tier.

## Services

Using Docker and Docker Compose for the workers will simplify _manual_ scaling.

### Role Render

- This service will consume a roleParser queue.
- It will generate an HTML-rendered version of the role.
- The HTML-rendered version will then be added to a hash-based table in Redis (or alternative storage).

### Email Grouper

My suggestion is to append all userEmails to a queue. Then, within a consumer, for each email:

- Identify the most fitting roles for the user.
- Create a hashed-id object using <userId, emailProps>.
- Send the hashed-id object to the Email Renderer Queue.

### Email Prerender

The prerender's function is to combine all the static data of an email (header and footer) with the dynamic, non-static roles.

These roles need to be dynamic as they may become inactive by 11am on the following Wednesday.
![image](https://github.com/ocodista/trampar-de-casa/assets/19851187/5e92f9ea-aaf5-4297-8e13-65a1f1db55dc)

### Email Renderer

Ideally, this should operate close to the send date, possibly starting at 9am on Wednesday, to be safe.  
We should measure the execution time in the future to ensure it operates closer to the **Email Sender**.

For each email, it will:

- Generate an unsubscribeRoute (We may need to persist this data in the future).
- Validate roles, checking if a role is still open and, if not, removing it from roleIds before rendering.
- Generate the HTML version of the email.
- Generate properties for the Email Sender.
- Append the email to the Email Sender Queue.

### Email Sender

The sender must respect to the rate limit, currently set at 25 emails/second.

My initial plan includes:

- Using a single instance.
- Beginning operations at 10:59.
- Consuming emails from the queue in batches of 25.
- Sending all of them using `Promises.all`.
- Repeating this process until all emails have been sent.
- Logging the process.
- Recording data for analytics (MixPanel).
- Storing profiling information.
