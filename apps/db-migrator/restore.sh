#!/bin/bash

source .env

/opt/homebrew/opt/postgresql@15/bin/pg_restore -v \
  -d "postgresql://${TO_POSTGRES_USER}:${TO_POSTGRES_PASSWORD}@${TO_POSTGRES_HOST}:${TO_POSTGRES_PORT}/${TO_POSTGRES_DB}" \
  --no-owner \
  --no-acl \
  supabase_dump.bak
