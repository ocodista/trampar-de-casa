# Auto Email Sender

Auto Email Sender is a project designed to automate the sending of personalized emails based on specific criteria such as skills and languages. The project uses a combination of Node.js and Python, along with Docker to facilitate the configuration and execution of services.

## Table of Contents

- [Description](#description)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Directory Structure](#directory-structure)

## Description

This project is designed to automate the creation and sending of personalized emails based on processed data. It is composed of several modules that handle email rendering, role assignment, and communication with an API to determine the best skill matches.

## Project Architecture

The project is divided into several services that work together:

1. **RabbitMQ**: Manages message queues for exchanging information between services.
2. **MongoDB**: Stores data related to roles and users.
3. **Auto Email Sender**: The main service that orchestrates the entire process, from data generation to email sending.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.11+

## Setup

### Environment Variables

Create a `.env` file in the `apps/auto-email-sender/` folder with the following variables:

```bash
SECRET_KEY=<your_secret_key>
RESEND_KEY=<your_resend_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_SERVICE_ROLE=<your_supabase_service_role_key>
MONGO_ADDRESS=<your_mongo_address>
MONGO_USERNAME=<your_mongo_username>
MONGO_PASSWORD=<your_mongo_password>
RABBITMQ_ADDRESS=<your_rabbitmq_address>
```

## Running the Project

You can run the project using the `docker-compose.yml` file located at the root of the `Trampar de Casa` project. This file will start the necessary services, including `rabbitmq`, `mongo`, and build the Docker image specified in `Dockerfile.auto`.

### Steps to Run the Project

1. **Set Up Environment Variables**: Ensure that your environment variables are set up correctly in the `.env` file.

2. **Build and Start Containers**: Use Docker Compose to build and start the containers:

   ```bash
   docker-compose up --build
   ```

3. **Start the Services**: The `auto-email-sender` service will start automatically after the containers are up. The process involves the following steps:

   - **Data Generation**: Executes ETL scripts to prepare data.
   - **Model Training**: Trains models for skill matching.
   - **Service Initialization**: Starts the `match_roles` service and waits for it to be fully operational.
   - **Parallel Processing**: Runs role assignment and email pre-rendering tasks in parallel using multiple cores.
   - **Email Composition and Sending**: Generates personalized emails and sends them to the intended recipients.

Following these steps will set up and run the project, allowing you to utilize the `auto-email-sender` service effectively.

## Directory Structure

Here is an overview of the project's directory structure:

```bash
.
├── email-composer
│   ├── createEmailHtml.tsx
│   ├── getHtmlRoles.ts
│   ├── index.ts
│   ├── parsePreRenderMessage.ts
│   └── renderRolesSection.tsx
├── email-pre-render
│   ├── getTestimonialLink.ts
│   ├── getUnsubscribeLink.ts
│   ├── index.ts
│   ├── renderFooter.tsx
│   ├── renderHeaderAndFooter.ts
│   └── renderHeader.tsx
├── email-sender
│   ├── baseEmail.ts
│   ├── config.ts
│   ├── emailSender.ts
│   ├── index.ts
│   └── sendEmails.ts
├── match_roles
│   ├── data
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── models
│   ├── ReadMe.md
│   ├── requirements.txt
│   └── src
│       ├── etl
│       │   └── extract_skills.py
│       ├── main.py
│       ├── predict
│       │   └── rank.py
│       └── train
│           └── onehot.py
└── utils
    ├── assignRolesWorker.ts
    ├── checkMatchRolesUp.ts
    ├── delay.ts
    ├── emailPreRenderWorker.ts
    └── generateDataMatchRoles.ts
```
