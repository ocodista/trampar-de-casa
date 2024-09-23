# Bluesky Job Poster

Bluesky Job Poster is an automated application that fetches job listings from a Supabase database and posts them to the Bluesky social network. It's designed to regularly share job opportunities, making them more visible to potential candidates.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches job listings from a Supabase database
- Processes and formats job information
- Posts job listings to Bluesky social network
- Handles salary parsing and formatting
- Implements rate limiting to avoid overwhelming the Bluesky API
- Dockerized for easy deployment

## Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- Bluesky account

## Installation

1. Clone the repository:

   ```
   git clone git@github.com:ocodista/trampar-de-casa.git
   cd trampar-de-casa
   ```

2. Install dependencies:
   ```
   yarn install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```
   BSKY_EMAIL=your_bluesky_email@example.com
   BSKY_PASSWORD=your_bluesky_password
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE=your_supabase_service_role_key
   ```

## Usage

To run the application:

```
cd apps/bluesky-job-poster
yarn dev
```

This will start the job posting process, which will:

1. Fetch job listings from Supabase
2. Process and format the job information
3. Post the jobs to Bluesky at regular intervals

## Docker

To build and run the application using Docker:

1. Build the Docker image from root of Trampar de Casa:

   ```
   docker build -t apps/bluesky-job-poster .
   ```

2. Run the Docker container:
   ```
   docker run -e BSKY_EMAIL=your_email -e BSKY_PASSWORD=your_password -e SUPABASE_URL=your_url -e SUPABASE_SERVICE_ROLE=your_key bluesky-job-poster
   ```

## Project Structure

- `src/index.ts`: Main entry point of the application
- `Dockerfile`: Instructions for building the Docker image

## How It Works

1. The application logs into Bluesky using provided credentials.
2. It fetches job listings from the Supabase database.
3. Job listings are processed and formatted, including salary parsing.
4. The top 10 jobs (based on salary) are selected for posting.
5. Posts are created on Bluesky with job details and a tracking URL.
6. The process repeats at regular intervals to space out the posts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
