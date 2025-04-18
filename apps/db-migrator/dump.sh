#!/bin/bash

set -e

source .env

# Check if backup directory exists
mkdir -p backups

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/supabase_dump_${TIMESTAMP}.bak"

# Check if pg_dump exists
if ! command -v pg_dump &> /dev/null; then
    echo "Error: pg_dump command not found. Please install PostgreSQL 15."
    exit 1
fi

# Check if source database is accessible
if ! pg_isready -d "${FROM_POSTGRES_URL}" &> /dev/null; then
    echo "Error: Cannot connect to source database. Please check your connection string."
    exit 1
fi

echo "Creating backup from ${FROM_POSTGRES_URL}..."
pg_dump -Fc -v \
    -d "${FROM_POSTGRES_URL}" \
    --schema=public \
    -f "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
    echo "Backup created successfully: ${BACKUP_FILE}"
else
    echo "Error: Backup failed"
    exit 1
fi
