# Subs to queue

The objective of this service is to send the necessary database information of `email-pre-renderer` and `roles-assigner` for a queue of `email-pre-renderer-subs` and `roles-assigner-subs``.

## Prerequisites

Before starting, you'll need:

- [RabbitMQ](https://www.rabbitmq.com/documentation.html)
- [Supabase](https://supabase.com/docs)
- [Node 18.16.0](https://nodejs.org/en/blog/release/v18.16.0)

Refer to the official documentation for [Node.js](https://nodejs.org/), [RabbitMQ](https://www.rabbitmq.com/documentation.html), and [Supabase](https://supabase.io/) for installation guides.

Or, if you're smart, use Docker.

## Flow Diagram

![image](https://github.com/ocodista/trampar-de-casa/assets/68869379/e18ac657-a3d2-4d08-b95f-ef5f912d174c)

## Sequence Diagram

```mermaid
sequenceDiagram

participant S as Service
participant RC as ReadChunk
participant STIEC as sendToSubsInfoRolesAssigner
participant STIEPR as sendToSubsInfoEmailPreRenderer
participant DB as Supabase
participant R as RabbitMQ

S->>DB: Fetch batch of subscribers
DB-->>S: Return batch of subscribers

loop For Each Chunk
	S->>RC: Subscribers[]
	RC->>STIEC: Send message with data { skillsId,startedWorkingAt,id,email,isConfirmed }
	RC->>STIEPR: Send message with data { id, email }
end
```

## Functions

### subsToQueue

Create a connection with RabbitMQ and Supabase

- Execute `getAllConfirmedSubscribersPaginated`
- Create a loop to read all chunks

### readChunk

- create a loop for each chunk
- execute `sendToSubsInfoRolesAssigner`
- execute `sendToSubsInfoEmailPreRenderer`

### sendToSubsInfoRolesAssigner

- send message to `EmailQueues.SubsInfoRolesAssigner` queue.

### sendToSubsInfoEmailPreRenderer

- send message to `EmailQueues.SubsInfoEmailPreRenderer` queue.

### sendToQueue

A simple abstraction to send a message to RabbitMQ
