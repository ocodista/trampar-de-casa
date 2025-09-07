#!/bin/bash

# Daily build and push script for auto-email-sender
# Runs at 6 AM daily via crontab

# Set variables
REPO_DIR="/Users/caioborghi/personal/trampar-prod/trampar-de-casa"
LOG_FILE="$REPO_DIR/build-logs/auto-email-sender-$(date +%Y%m%d).log"
REGISTRY="compose.lan:5000"
REPO_NAME="auto-email-sender"
PLATFORM="linux/amd64"

# Create log directory if it doesn't exist
mkdir -p "$REPO_DIR/build-logs"

# Function to log messages
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to handle errors
handle_error() {
    log "ERROR: $1"
    exit 1
}

log "Starting daily build and push for auto-email-sender"

# Change to repo directory
cd "$REPO_DIR" || handle_error "Failed to change to repo directory"

# Load environment variables from .env file
if [ -f .env ]; then
    log "Loading environment from .env file..."
    export $(grep -v '^#' .env | xargs)
fi

# Update repository
log "Updating repository..."
git fetch origin || handle_error "Failed to fetch from origin"
git pull origin main || handle_error "Failed to pull latest changes"

# Install dependencies
log "Installing dependencies..."
if ! command -v yarn &> /dev/null; then
    npm install -g yarn || handle_error "Failed to install yarn globally"
fi
yarn install || handle_error "Failed to install dependencies"

# Login to registry
log "Logging in to Docker registry..."
if [ -n "$DOCKER_REGISTRY_USER" ] && [ -n "$DOCKER_REGISTRY_PASS" ]; then
    echo "$DOCKER_REGISTRY_PASS" | docker login "$REGISTRY" -u "$DOCKER_REGISTRY_USER" --password-stdin || handle_error "Failed to login to registry"
else
    log "No registry credentials provided, attempting anonymous push..."
fi

# Set up Docker buildx with insecure registry support
log "Setting up Docker buildx..."
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
  --use || handle_error "Failed to create buildx builder"

# Clean up temp config
rm -f /tmp/buildkitd.toml

# Build and push Docker image
log "Building and pushing Docker image..."
docker buildx build . \
    --platform "$PLATFORM" \
    --file ./Dockerfile.auto \
    -t "$REGISTRY/$REPO_NAME:latest" \
    --push \
    --build-arg SECRET_KEY="$SECRET_KEY" \
    --build-arg RESEND_KEY="$RESEND_KEY" \
    --build-arg POSTGRES_URL="$POSTGRES_URL" \
    --build-arg MONGO_ADDRESS="$MONGO_ADDRESS" \
    --build-arg MONGO_PASSWORD="$MONGO_PASSWORD" \
    --build-arg MONGO_USERNAME="$MONGO_USERNAME" \
    --build-arg RABBITMQ_ADDRESS="$RABBITMQ_ADDRESS" \
    --progress plain || handle_error "Failed to build and push Docker image"

log "Build and push completed successfully"

# Cleanup old log files (keep last 7 days)
find "$REPO_DIR/build-logs" -name "auto-email-sender-*.log" -mtime +7 -delete 2>/dev/null || true

log "Daily build and push script completed"