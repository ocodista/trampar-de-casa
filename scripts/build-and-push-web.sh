#!/bin/bash

set -e

if [ ! -f .secrets ]; then
	echo "Error: .secrets file not found"
	exit 1
fi

source .secrets

PLATFORM=${1:-amd64}
REGISTRY=${DOCKER_REGISTRY_HOST}
REPO='trampar-de-casa'

# Export all environment variables to make them available to the build
export EMAIL_KEY
export EMAIL_PASS
export CRYPT_SECRET
export RESEND_KEY
export RESEND_WEBHOOK_SECRET
export OWNER_EMAIL
export NEXT_PUBLIC_MIXPANEL_KEY
export CRON_SECRET
export POSTGRES_URL
export REDIS_URL

cd ../

VERSION=$(cd apps/web && cat package.json | jq -r '.version')

docker buildx build . --platform linux/$PLATFORM \
	-t "$REGISTRY/$REPO:latest" \
	-t "$REGISTRY/$REPO:$VERSION" \
	--push \
	--build-arg EMAIL_KEY="$EMAIL_KEY" \
	--build-arg EMAIL_PASS="$EMAIL_PASS" \
	--build-arg CRYPT_SECRET="$CRYPT_SECRET" \
	--build-arg RESEND_KEY="$RESEND_KEY" \
	--build-arg RESEND_WEBHOOK_SECRET="$RESEND_WEBHOOK_SECRET" \
	--build-arg OWNER_EMAIL="$OWNER_EMAIL" \
	--build-arg NEXT_PUBLIC_MIXPANEL_KEY="$NEXT_PUBLIC_MIXPANEL_KEY" \
	--build-arg CRON_SECRET="$CRON_SECRET" \
	--build-arg POSTGRES_URL="$POSTGRES_URL" \
	--build-arg REDIS_URL="$REDIS_URL" 