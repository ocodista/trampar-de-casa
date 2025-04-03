#!/bin/bash

source .env

/opt/homebrew/opt/postgresql@15/bin/pg_dump -Fc -v \
  -d "postgresql://${FROM_POSTGRES_USER}:${FROM_POSTGRES_PASSWORD}@${FROM_POSTGRES_HOST}:${FROM_POSTGRES_PORT}/${FROM_POSTGRES_DB}" \
  --schema=public \
  -f supabase_dump.bak
