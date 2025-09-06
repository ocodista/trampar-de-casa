#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    echo "Loading environment from .env file..."
    export $(grep -v '^#' .env | xargs)
fi

# Configuration
REGISTRY="${DOCKER_REGISTRY_HOST:-compose.lan:5000}"
REGISTRY="${REGISTRY#http://}"
REGISTRY="${REGISTRY#https://}"
REPO="match-roles"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building match-roles Docker image (simple method)${NC}"
echo "Registry: $REGISTRY"
echo "Repository: $REPO"
echo ""

# Check if POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
    echo -e "${YELLOW}Warning: POSTGRES_URL not set. Using default value.${NC}"
fi

# Build image using standard docker build
echo -e "${GREEN}Building Docker image...${NC}"
docker build \
    ./apps/auto-email-sender/src/match_roles \
    --tag "$REGISTRY/$REPO:latest" \
    --build-arg POSTGRES_URL="${POSTGRES_URL}" \
    --progress plain

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully built $REGISTRY/$REPO:latest${NC}"
    
    # Try to push the image
    echo -e "${GREEN}Pushing image to registry...${NC}"
    docker push "$REGISTRY/$REPO:latest"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Successfully pushed $REGISTRY/$REPO:latest${NC}"
    else
        echo -e "${YELLOW}Failed to push image. You may need to push manually.${NC}"
    fi
else
    echo -e "${RED}Failed to build image${NC}"
    exit 1
fi