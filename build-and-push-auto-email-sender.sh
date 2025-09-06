#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    echo "Loading environment from .env file..."
    export $(grep -v '^#' .env | xargs)
fi

# Configuration - bypass Cloudflare by using direct registry address
# Remove http:// or https:// prefix if present
REGISTRY="${DOCKER_REGISTRY_HOST:-compose.lan:5000}"
REGISTRY="${REGISTRY#http://}"
REGISTRY="${REGISTRY#https://}"
REPO="auto-email-sender"
PLATFORM="${BUILD_PLATFORM:-linux/amd64}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and pushing auto-email-sender Docker image${NC}"
echo "Registry: $REGISTRY"
echo "Repository: $REPO"
echo "Platform: $PLATFORM"
echo ""

# Check if required environment variables are set
required_vars=(
    "SECRET_KEY"
    "RESEND_KEY" 
    "POSTGRES_URL"
    "MONGO_ADDRESS"
    "MONGO_PASSWORD"
    "MONGO_USERNAME"
    "RABBITMQ_ADDRESS"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${YELLOW}Warning: $var not set. Using default or empty value.${NC}"
    fi
done

# OrbStack insecure registry already configured
echo -e "${GREEN}Using existing OrbStack insecure registry configuration${NC}"

# Login to registry with insecure flag
echo -e "${GREEN}Checking registry access...${NC}"
if [ -n "$DOCKER_REGISTRY_USER" ] && [ -n "$DOCKER_REGISTRY_PASS" ]; then
    echo -e "${GREEN}Logging in to registry...${NC}"
    echo "$DOCKER_REGISTRY_PASS" | docker login --username "$DOCKER_REGISTRY_USER" --password-stdin "$REGISTRY"
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to login to registry${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}No registry credentials provided, skipping login (anonymous push)...${NC}"
fi

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
fi
yarn install

# Setup buildx with insecure registry config
echo -e "${GREEN}Setting up Docker buildx...${NC}"
docker buildx rm auto-email-sender-builder 2>/dev/null || true

# Create buildx config file for insecure registry
cat > /tmp/buildkitd.toml <<EOF
[registry."$REGISTRY"]
  http = true
  insecure = true
EOF

# Create buildx builder with insecure registry support
docker buildx create \
  --name auto-email-sender-builder \
  --driver docker-container \
  --driver-opt network=host \
  --config /tmp/buildkitd.toml \
  --use

# Clean up temp config
rm -f /tmp/buildkitd.toml

# Build and push image
echo -e "${GREEN}Building Docker image...${NC}"
docker buildx build . \
    --platform "$PLATFORM" \
    --file ./Dockerfile.auto \
    --tag "$REGISTRY/$REPO:latest" \
    --build-arg SECRET_KEY="${SECRET_KEY}" \
    --build-arg RESEND_KEY="${RESEND_KEY}" \
    --build-arg POSTGRES_URL="${POSTGRES_URL}" \
    --build-arg MONGO_ADDRESS="${MONGO_ADDRESS}" \
    --build-arg MONGO_PASSWORD="${MONGO_PASSWORD}" \
    --build-arg MONGO_USERNAME="${MONGO_USERNAME}" \
    --build-arg RABBITMQ_ADDRESS="${RABBITMQ_ADDRESS}" \
    --push \
    --progress plain

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully built and pushed $REGISTRY/$REPO:latest${NC}"
else
    echo -e "${RED}Failed to build and push image${NC}"
    exit 1
fi