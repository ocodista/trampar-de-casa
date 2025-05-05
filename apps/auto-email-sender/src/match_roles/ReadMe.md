# Match Roles Service

This service handles role matching based on skills using machine learning techniques.

## Architecture

The Match Roles service is now separated as a standalone microservice with the following features:

- FastAPI-based HTTP API for role matching
- Self-contained data generation from PostgreSQL database
- Automated training process for the skills model
- Health check endpoint for monitoring

## How to run

### Using Docker Compose

The easiest way to run the service is using docker-compose:

```bash
# Start only the match-roles service
docker-compose up -d match-roles

# Start the entire system
docker-compose up -d
```

### Testing

You can test the match-roles service independently using the provided script:

```bash
./scripts/test-match-roles.sh
```

## API Endpoints

- `GET /best_role?skills=<skill_ids>&languages=<languages>&n=<number>` - Get best matching roles
- `GET /health` - Health check endpoint

## Environment Variables

The service uses the following environment variable:

- `POSTGRES_URL` - PostgreSQL connection string (default: postgresql://postgres:postgres@postgres:5432/trampar-de-casa)

## Data Flow

1. On startup, the service checks if data files exist
2. If not, it connects to PostgreSQL and generates CSV files
3. It then processes the data and trains/loads the machine learning model
4. The API becomes available once everything is ready

## Structure

- `/app/data` - Contains generated CSV files
- `/app/models` - Contains trained ML models
- `/app/src` - FastAPI application code
- `/app/setup` - Data generation scripts
