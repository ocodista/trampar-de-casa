set -e

if [ ! -f .secrets ]; then
	echo "Error: .secrets file not found"
	exit 1
fi

source .secrets

PLATFORM=${1:-amd64}
REGISTRY=${DOCKER_REGISTRY_HOST}
REPO='trampar-de-casa'

# Create temporary secrets file
TEMP_SECRETS=$(mktemp)
cat .secrets > "$TEMP_SECRETS"

# Already in root directory

VERSION=$(cd apps/web && cat package.json | jq -r '.version')

# Build and push with build args
docker buildx build . --platform linux/$PLATFORM \
	-t "$REGISTRY/$REPO:latest" \
	-t "$REGISTRY/$REPO:$VERSION" \
	--push \
	--build-arg EMAIL_KEY="${EMAIL_KEY}" \
	--build-arg EMAIL_PASS="${EMAIL_PASS}" \
	--build-arg CRYPT_SECRET="${CRYPT_SECRET}" \
	--build-arg RESEND_KEY="${RESEND_KEY}" \
	--build-arg RESEND_WEBHOOK_SECRET="${RESEND_WEBHOOK_SECRET}" \
	--build-arg OWNER_EMAIL="${OWNER_EMAIL}" \
	--build-arg NEXT_PUBLIC_MIXPANEL_KEY="${NEXT_PUBLIC_MIXPANEL_KEY:-}" \
	--build-arg CRON_SECRET="${CRON_SECRET}" \
	--build-arg POSTGRES_URL="${POSTGRES_URL}" \
	--build-arg REDIS_URL="${REDIS_URL}"

# Clean up
rm "$TEMP_SECRETS" 
