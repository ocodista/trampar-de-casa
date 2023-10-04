# Auto Email Sender Documentation

The Auto Email Sender project is a collection of microservices to send opening emails, this project uses these technologies below:

- **Supabase**: Supabase is utilized for access information

- **MongoDB**: MongoDB serves as a caching mechanism to improve the performance of data retrieval and processing within the microservices.

- **React Email**: React Email is employed for generating dynamic and visually appealing email templates.

- **RabbitMQ**: RabbitMQ is used for message queuing and ensures orderly and reliable email sending across the microservices.

- **Resend**: The email API for developers, we use on `email-sender`.

## Microservices

### [Roles Renderer](./roles-renderer/README.md)

- Get roles on Supabase
- Render inline HTML of roles
- Save on MongoDb

### [Roles Validator](./roles-validator/README.md)

- Get roles on Supabase
- Access role URL
- Verify if the role is open
- If not, delete the role of MongoDb

### [Roles Assigner](./roles-assigner/README.md)

The Roles Assigner microservice manages the assignment of roles to users. It provides functionality to assign specific roles to users based on experience time, skills and English level.
When assigning roles, we send them to MongoDb.

- Get subscribers on supabase
- Calculate roles for each subscriber based on Skills, Experience, and English level
- Send results to MongoDb

### [Email Pre-Renderer](./email-pre-renderer/README.md)

- The Email Pre-Renderer accesses the Supabase to get all confirmed subscribers.
- Based on subscriber ID, get infos on MongoDb created by [roles-assigner](./roles-assigner/README.md)
- Render footer component
- Render Header component
- Render Assigned roles components
- Send to RabbitMQ queue

### [Email Composer](./email-composer/README.md)

The Email Composer microservice is responsible for concatenating the Footer, Header and
roles html and send to another rabbitMQ queue

- Consume `email-pre-render` queue
- Concatenate inline HTML of header, footer, and roles
- Send to 'email-sender' queue

### [Email Sender](./email-sender/README.md)

The Email Sender microservice is the core component responsible for sending opening emails.
this service consumes an `email-sender` queue and sends an email. For now, we preserve the old retrieve strategy.

- If the email is sent, save it on `sent-email.txt`
- If the email failed, save on `failed-emails.txt`

## How to use

Here we will delve into the practical aspects of orchestrating a group of microservices

### Flux

The `auto-email-sender` is a group of microservices focused on sending opening emails. Some services in this group require other services to have been run before, as exemplified below:

![image](https://github.com/ocodista/trampar-de-casa/assets/68869379/7ecef00d-429b-4739-9c55-4c59e8434623)

> The order is based on the execution time. The slowest is executed first. This order is more effective for schedule sendings but is not mandatory

Now I will show some dependencies between services:

- `roles-validator` requires `roles-renderer`.
- `email-pre-render` requires `roles-assigner`.
- `email-composer` requires both `roles-validator` and `email-pre-render`.
- `email-sender` requires `email-composer`.

For example: You can initiate these services by running `roles-assigner`:

```sh
docker-compose -f auto-email-sender-compose.yml up -d roles-assigner
```

After this, you can run `email-pre-renderer`:

```sh
docker-compose -f auto-email-sender-compose.yml up -d email-pre-renderer
```

Next, you should run the `email-composer`:

```sh
docker-compose -f auto-email-sender-compose.yml up -d roles-renderer &&
docker-compose -f auto-email-sender-compose.yml up -d roles-validator &&
docker-compose -f auto-email-sender-compose.yml up -d email-composer
```

Finally, after completing the previous steps, you can send the emails using the `email-sender` service:

```sh
docker-compose -f auto-email-sender-compose.yml up -d email-sender
```

### Prerequisites:

Before you begin, ensure you have the following prerequisites installed on your system:

1. **Docker and Docker Compose:** Make sure you have Docker and Docker Compose installed. You can download and install them from the official Docker website.

### Steps to Run the Services:

1. **Start the Microservices:**

   Run the following commands in the terminal, one by one, to start the microservices in the desired order:

   a. Start the `roles-renderer` service:

   ```sh
   docker-compose -f auto-email-sender-compose.yml up -d roles-renderer
   ```

   b. Start the `roles-assigner` service:

   ```sh
   docker-compose -f auto-email-sender-compose.yml up -d roles-assigner
   ```

   c. Start the `email-pre-renderer` service:

   ```sh
   docker-compose -f auto-email-sender-compose.yml up -d email-pre-renderer
   ```

   d. Start the `email-composer` service:

   ```sh
   docker-compose -f auto-email-sender-compose.yml up -d email-composer
   ```

   e. Start the `email-sender` service:

   ```sh
   docker-compose -f auto-email-sender-compose.yml up -d email-sender
   ```

2. **Stop and Remove Containers:**

   When you are done using the services, you can stop and remove the containers by running the following command:

   ```sh
   docker-compose -f auto-email-sender-compose.yml down
   ```
