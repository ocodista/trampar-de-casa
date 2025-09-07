#!/bin/bash

# Build and push services using docker-compose
# Usage: ./build-services.sh [service-name] [platform]
# Examples:
#   ./build-services.sh web-build
#   ./build-services.sh auto-email-sender-build
#   ./build-services.sh match-roles-build
#   ./build-services.sh  # builds all services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables from .secrets file
if [ -f scripts/.secrets ]; then
    echo -e "${GREEN}Loading environment from scripts/.secrets file...${NC}"
    export $(grep -v '^#' scripts/.secrets | xargs)
else
    echo -e "${RED}Error: scripts/.secrets file not found${NC}"
    exit 1
fi

# Set defaults
SERVICE=${1:-""}
PLATFORM=${2:-"linux/amd64"}

echo -e "${YELLOW}Building services with docker-compose${NC}"
echo "Registry: ${DOCKER_REGISTRY_HOST}"
echo "Platform: ${PLATFORM}"
echo ""

# Login to registry if credentials are provided
if [ -n "$DOCKER_REGISTRY_USER" ] && [ -n "$DOCKER_REGISTRY_PASS" ]; then
    echo -e "${GREEN}Logging in to registry...${NC}"
    echo "$DOCKER_REGISTRY_PASS" | docker login "${DOCKER_REGISTRY_HOST}" -u "$DOCKER_REGISTRY_USER" --password-stdin
else
    echo -e "${YELLOW}No registry credentials provided, attempting anonymous push...${NC}"
fi

# Build services
if [ -n "$SERVICE" ]; then
    echo -e "${GREEN}Building service: $SERVICE${NC}"
    docker-compose -f docker-compose.build.yml build --push "$SERVICE"
else
    echo -e "${GREEN}Building all services...${NC}"
    docker-compose -f docker-compose.build.yml build --push
fi

echo -e "${GREEN}Build and push completed successfully${NC}"