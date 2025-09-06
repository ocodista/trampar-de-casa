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
REPO="match-roles"
PLATFORM="${BUILD_PLATFORM:-linux/amd64}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and pushing match-roles Docker image${NC}"
echo "Registry: $REGISTRY"
echo "Repository: $REPO"
echo "Platform: $PLATFORM"
echo ""

# Check if POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
    echo -e "${YELLOW}Warning: POSTGRES_URL not set. Using default value.${NC}"
fi

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

# Setup buildx with insecure registry config
echo -e "${GREEN}Setting up Docker buildx...${NC}"
docker buildx rm match-roles-builder 2>/dev/null || true

# Create buildx config file for insecure registry
cat > /tmp/buildkitd.toml <<EOF
[registry."$REGISTRY"]
  http = true
  insecure = true
EOF

# Create buildx builder with insecure registry support
docker buildx create \
  --name match-roles-builder \
  --driver docker-container \
  --driver-opt network=host \
  --config /tmp/buildkitd.toml \
  --use

# Clean up temp config
rm -f /tmp/buildkitd.toml

# Build and push image
echo -e "${GREEN}Building Docker image...${NC}"
docker buildx build \
    ./apps/auto-email-sender/src/match_roles \
    --platform "$PLATFORM" \
    --tag "$REGISTRY/$REPO:latest" \
    --build-arg POSTGRES_URL="${POSTGRES_URL}" \
    --push \
    --progress plain

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully built and pushed $REGISTRY/$REPO:latest${NC}"
else
    echo -e "${RED}Failed to build and push image${NC}"
    exit 1
fi
