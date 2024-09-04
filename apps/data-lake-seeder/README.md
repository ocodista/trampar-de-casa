# Supabase to AWS S3 Data Export - Trampar de Casa

This project is part of the "Trampar de Casa" application and is designed to automatically export data from a Supabase 'Roles' table to an AWS S3 bucket on a daily basis. It's set up as a GitHub Action that runs at 20:00 UTC every day.

## Project Structure

The project is located in the `apps/data-lake-seeder` directory of the Trampar de Casa application and consists of the following key files:

- `index.ts`: The main script that fetches data from Supabase and uploads it to AWS S3.
- `package.json`: Defines the project dependencies and scripts.
- `.github/workflows/daily-update-s3.yml`: The GitHub Actions workflow file that automates the daily export process.

## Setup

### Prerequisites

- Access to the Trampar de Casa GitHub repository
- A Supabase project with a 'Roles' table
- An AWS account with S3 access
- GitHub Secrets set up with the following keys:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### Configuration

1. Ensure your Supabase 'Roles' table is set up correctly.
2. In the `index.ts` file, verify that the AWS S3 bucket name and folder are correct:
   ```typescript
   const BUCKET_NAME = 'teomewhy-datalake-raw'
   const BUCKET_FOLDER = 'trampar_de_casa'
   ```

## Usage

The export process is automated via GitHub Actions and will run daily at 20:00 UTC. However, you can also trigger it manually:

1. Go to the 'Actions' tab in the Trampar de Casa GitHub repository.
2. Select the 'Daily Supabase to S3 Export' workflow.
3. Click 'Run workflow' and then 'Run workflow' again in the dropdown.

## File Naming Convention

Exported files are named using the following format:

```
roles/YYYYMMDD_HHMM.csv
```

Where YYYY is the year, MM is the month, DD is the day, HH is the hour (in 24-hour format), and MM is the minute.

## Local Development

To run the script locally:

1. Navigate to the project directory:
   ```
   cd apps/data-lake-seeder
   ```
2. Install dependencies:
   ```
   bun install
   ```
3. Set up environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
4. Run the script:
   ```
   bun run index.ts
   ```

## Troubleshooting

- If the GitHub Action fails, check the workflow run logs for error messages.
- Ensure all required GitHub Secrets are set correctly.
- Verify that the Supabase and AWS credentials have the necessary permissions.

## Contributing

To contribute to this project:

1. Fork the Trampar de Casa repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes in the `apps/data-lake-seeder` directory.
4. Commit your changes with a clear commit message.
5. Push your changes to your fork.
6. Create a pull request to the main Trampar de Casa repository.
