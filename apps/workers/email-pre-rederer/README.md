# Email Pre Renderer Feature Documentation

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Functionality](#functionality)
- [Flow Diagram](#flow-diagram)
- [Sequence Diagram](#sequence-diagram)
- [Key concepts](#key-concepts)

## Introduction

- Utilizes Redis and Supabase for seamless data retrieval.
- Generates personalized email templates (headers and footers) for each subscriber.
- Sends pre-rendered templates to a RabbitMQ queue.

## Prerequisites

Before proceeding, you should have the following installed on your system:

- Latest versions of Node.js
- Redis
- Supabase libraries
- RabbitM

Refer to the official documentation for [Node.js](https://nodejs.org/),
[Redis](https://redis.io/),
[Supabase](https://supabase.io/) and
[RabbitMQ](https://www.rabbitmq.com/monitoring.html) for installation guides.

## Functionality

- Establishing connections to the Redis client and RabbitMQ queue.
- Retrieving subscribers in batches from Supabase.
- For each subscriber:
  - Retrieving persisted user information (roles) from Redis using the subscriber's ID.
  - Calculating the total number of roles and generating the header HTML.
  - Creating the footer HTML with an injected unsubscribe link.
  - Sending the pre-rendered email template, including subscriber's email, roles, footer HTML, and header HTML, to the RabbitMQ queue.

## Flow Diagram

```mermaid
graph TD;
  A[Start] --> B[Establish Connections]
  B --> C[Retrieve Subscribers from Supabase]
  C --> D{For each Subscriber}
  D --> E[Retrieve User Information from Redis]
  D --> F[Calculate Total Roles and Generate Header HTML]
  D --> G[Create Footer HTML with Unsubscribe Link]
  D --> H[Send Pre-rendered Email to RabbitMQ]
  E --> D
  F --> D
  G --> D
  H --> D
  D --> I{All Subscribers Processed}
  I --> J[Close RabbitMQ Channel and Disconnect Redis]
  J --> K[End]
```

## Sequence Diagram

```mermaid
sequenceDiagram
  participant A as Start
  participant B as Establish Connections
  participant C as Retrieve Subscribers
  participant D as For each Subscriber
  participant E as Retrieve User Information
  participant F as Calculate Total Roles and Generate Header HTML
  participant G as Create Footer HTML with Unsubscribe Link
  participant H as Send Pre-rendered Email to RabbitMQ
  participant I as All Subscribers Processed
  participant J as Close RabbitMQ Channel and Disconnect Redis
  participant K as End

  A ->> B: Establish Connections
  B ->> C: Retrieve Subscribers from Supabase
  loop For each Subscriber
    C ->> D: Subscriber Data
    D ->> E: Retrieve User Information from Redis
    D ->> F: Calculate Total Roles and Generate Header HTML
    D ->> G: Create Footer HTML with Unsubscribe Link
    D ->> H: Send Pre-rendered Email to RabbitMQ
  end
  D ->> I: All Subscribers Processed
  I ->> J: Close RabbitMQ Channel and Disconnect Redis
  J ->> K: End

```

## Key concepts

Pre-rendering Email Templates:

### Generates personalized email content, including headers and footers, for subscribers.

- Ensures tailored email templates based on individual preferences.
- Enhances engagement through personalized communication.
- Data Retrieval with Redis and Supabase:

### Seamlessly interacts with Redis and Supabase for data retrieval.

- Utilizes Redis to store and retrieve persisted user information, like roles.
- Facilitates efficient retrieval of subscriber data in batches with Supabase.
- Header and Footer Generation:

### Calculates the total number of roles and includes it in the header HTML.

- Creates footer HTML with an unsubscribe link for subscriber opt-out.
- Customizes header and footer for each subscriber's email template.
- Queueing for Further Processing:

### Queues pre-rendered email templates for subsequent handling.

- Enables efficient distribution of email templates using RabbitMQ.
- Facilitates organized and scalable email processing.
- Batch Processing:

### Optimizes performance by processing subscribers in batches.

- Smoothly handles large numbers of subscribers without system overload.
- Reduces processing time and resource utilization.
