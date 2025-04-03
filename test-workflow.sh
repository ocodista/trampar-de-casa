#!/bin/bash

# Load secrets from .env file
set -a
source .secrets
set +a

# Build the Docker image locally
docker buildx build . \
  --platform linux/amd64 \
  --no-cache \
  -t "${DOCKER_REGISTRY_HOST}/trampar-de-casa:latest" \
  -t "${DOCKER_REGISTRY_HOST}/trampar-de-casa:$(cd apps/web && cat package.json | jq -r '.version')" \
  --push \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg SUPABASE_URL="${SUPABASE_URL}" \
  --build-arg SUPABASE_SERVICE_ROLE="${SUPABASE_SERVICE_ROLE}" \
  --build-arg EMAIL_KEY="${EMAIL_KEY}" \
  --build-arg EMAIL_PASS="${EMAIL_PASS}" \
  --build-arg CRYPT_SECRET="${CRYPT_SECRET}" \
  --build-arg RESEND_KEY="${RESEND_KEY}" \
  --build-arg RESEND_WEBHOOK_SECRET="${RESEND_WEBHOOK_SECRET}" \
  --build-arg OWNER_EMAIL="${OWNER_EMAIL}" \
  --build-arg NEXT_PUBLIC_MIXPANEL_KEY="${NEXT_PUBLIC_MIXPANEL_KEY}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  --build-arg POSTGRES_HOST="${POSTGRES_HOST}" \
  --build-arg POSTGRES_PORT="${POSTGRES_PORT}" \
  --build-arg POSTGRES_USER="${POSTGRES_USER}" \
  --build-arg POSTGRES_PASSWORD="${POSTGRES_PASSWORD}" 