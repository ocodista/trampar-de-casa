# Email Composer Feature Documentation

This documentation provides an overview of the Email Composer and Pre-Render feature, outlining the core components, workflows, and interactions within the system.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Flow Diagram](#flow-diagram)
- [Email Composer](#email-composer)
- [Parsing Pre-Rendered Messages](#parsing-pre-rendered-messages)
- [Get HTML Roles](#get-html-roles)
- [Creating Email HTML](#creating-email-html)

## Introduction

The Email Composer and Pre-Render feature is a vital aspect of the application, responsible for generating and delivering personalized email content to recipients. This documentation explains the key modules involved in composing, rendering, and delivering emails within the system.

## Prerequisites

Before proceeding, you should have the following installed on your system:

- Latest versions of Node.js
- RabbitMQ

Refer to the official documentation for [Node.js](https://nodejs.org/) and
[RabbitMQ](https://www.rabbitmq.com/monitoring.html) for installation guides.

## Flow Diagram

## Email Composer

The emailComposer.ts module orchestrates the email composition and pre-rendering process.

### Workflow

- Establishes connections to RabbitMQ channels for email composition and sending.
- Consumes messages from the EmailPreRenderer queue.
- Parses and processes pre-rendered email messages.
- Forwards the composed emails to the EmailSender queue.

## Parsing Pre-Rendered Messages

The parsePreRenderMessage.ts module handles the parsing and transformation of pre-rendered email messages.

### Workflow

- Receives pre-rendered email messages.
- Parses the message content into structured data.
- Extracts email, footer HTML, header HTML, and role IDs.
- Generates the composed email body by combining header, roles, and footer HTML.

## Get Html Roles

The getHtmlRoles.ts module is responsible for assembling HTML content for specific roles.

### Workflow

- Retrieves role-specific HTML content from Redis using role IDs.
- Concatenates HTML content for multiple roles.
- Returns the composed HTML content for the roles.

## Creating Email HTML

The createEmailHtml.tsx module generates the final HTML structure for email content.

### Workflow

- Utilizes React components to structure the email HTML.
- Dynamically composes the email body with provided content.
- Renders the HTML using React Email Components and Tailwind CSS.
