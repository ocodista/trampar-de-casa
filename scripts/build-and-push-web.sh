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

cd ../

VERSION=$(cd apps/web && cat package.json | jq -r '.version')

# Build and push with secrets
docker buildx build . --platform linux/$PLATFORM \
	-t "$REGISTRY/$REPO:latest" \
	-t "$REGISTRY/$REPO:$VERSION" \
	--push \
	--secret id=secrets,src="$TEMP_SECRETS"

# Clean up
rm "$TEMP_SECRETS" 
