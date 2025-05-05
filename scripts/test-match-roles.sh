#!/bin/bash
set -e

# Test script for match_roles service
echo "Testing match_roles service..."

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed"
    exit 1
fi

# Check if .env file exists and source it
ENV_FILE="apps/auto-email-sender/.env"
if [ -f "$ENV_FILE" ]; then
    echo "Loading environment variables from $ENV_FILE"
    export $(grep -v '^#' $ENV_FILE | xargs)
else
    echo "Warning: $ENV_FILE not found. Using default environment variables."
    # Set default postgres url
    export POSTGRES_URL="postgresql://postgres:postgres@localhost:5432/trampar-de-casa"
fi

# Start only the match-roles service
echo "Starting match-roles service..."
docker-compose up -d match-roles

# Wait for service to be available
echo "Waiting for service to be available..."
for i in {1..15}; do
    if curl -s "http://localhost:8000/health" | grep -q "ok"; then
        echo "Service is up and running!"
        break
    fi
    
    if [ $i -eq 15 ]; then
        echo "Service failed to start after 15 attempts"
        docker-compose logs match-roles
        docker-compose down match-roles
        exit 1
    fi
    
    echo "Attempt $i: Service not ready yet, waiting 5 seconds..."
    sleep 5
done

# Test the API
echo "Testing the API..."
RESPONSE=$(curl -s "http://localhost:8000/best_role?skills=25,40,450&languages=English,Portuguese&n=2")

echo "API Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# Check if we got a valid JSON response
if echo "$RESPONSE" | jq . &>/dev/null; then
    echo "✅ Test passed! match_roles service is working correctly"
else
    echo "❌ Test failed! Invalid response from match_roles service"
    docker-compose logs match-roles
fi

# Ask user if they want to stop the service
read -p "Do you want to stop the match-roles service? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down match-roles
    echo "Service stopped"
else
    echo "Service is still running at http://localhost:8000"
fi 