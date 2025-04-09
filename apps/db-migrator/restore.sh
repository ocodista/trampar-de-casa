#!/bin/bash

set -e

source .env

# Get the most recent backup file
BACKUP_FILE=$(ls -t backups/supabase_dump_*.bak | head -n1)

if [ -z "$BACKUP_FILE" ]; then
    echo "Error: No backup files found in backups directory"
    exit 1
fi

# Check if pg_restore exists
if ! command -v pg_restore &> /dev/null; then
    echo "Error: pg_restore command not found. Please install PostgreSQL 15."
    exit 1
fi

# Check if target database is accessible
if ! pg_isready -d "${TO_POSTGRES_URL}" &> /dev/null; then
    echo "Error: Cannot connect to target database. Please check your connection string."
    exit 1
fi

echo "Restoring backup to ${TO_POSTGRES_URL}..."
pg_restore -v \
    -d "${TO_POSTGRES_URL}" \
    --no-owner \
    --no-acl \
    "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
    echo "Restore completed successfully"
else
    echo "Error: Restore failed"
    exit 1
fi
