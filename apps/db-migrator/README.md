# Database Migrator

A simple tool to migrate data from one PostgreSQL database to another.

## Prerequisites

- PostgreSQL 15
- Docker and Docker Compose
- Bash shell

## Setup

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Edit `.env` with your database URLs:

```bash
FROM_POSTGRES_URL=postgresql://user:pass@host:5432/db
TO_POSTGRES_URL=postgresql://user:pass@host:5432/db
```

## Usage

### Using Docker

1. Start the target database:

```bash
docker compose -f simple-postgres.yml up -d
```

2. Create a backup:

```bash
./dump.sh
```

3. Restore the backup:

```bash
./restore.sh
```

### Using Local PostgreSQL

1. Create a backup:

```bash
./dump.sh
```

2. Restore the backup:

```bash
./restore.sh
```

## Notes

- Backup files are created in the `backups` directory with timestamps
- The restore process will not overwrite existing data
- Make sure both source and target databases are accessible
- The target database must exist before restoration
- Use PostgreSQL connection URLs in the format: `postgresql://user:pass@host:5432/db`

## Troubleshooting

- Check PostgreSQL logs for errors
- Verify database connections
- Ensure proper permissions on backup files
- Check environment variables are correctly set
- Make sure the database URLs are properly formatted
