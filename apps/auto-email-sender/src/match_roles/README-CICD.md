# Match Roles Service CI/CD

This document describes the continuous integration and deployment setup for the Match Roles service.

## GitHub Actions Workflow

The service is automatically built and pushed to a Docker registry using GitHub Actions. The workflow is triggered:

- On push to the main branch affecting files in the `apps/auto-email-sender/src/match_roles` directory
- Manually through workflow dispatch

### Workflow Details

The GitHub Actions workflow defined in `.gitea/workflows/build-and-push-match-roles.yml`:

1. Checks out the repository code
2. Sets up QEMU for platform emulation
3. Configures Docker Buildx for multi-platform builds
4. Logs in to the Docker registry
5. Builds and pushes the Docker image with the appropriate build arguments

## Environment Variables and Secrets

The following secrets are used in the CI/CD process:

- `DOCKER_REGISTRY_HOST`: The hostname of the Docker registry
- `DOCKER_REGISTRY_USER`: Username for Docker registry authentication
- `DOCKER_REGISTRY_PASS`: Password for Docker registry authentication
- `POSTGRES_URL`: PostgreSQL connection string for database access

## Docker Image

The Docker image is tagged as:

```
${DOCKER_REGISTRY_HOST}/match-roles:latest
```

## Local Development vs CI/CD

### Local Development

For local development, the service is built from the local source code:

```bash
docker-compose up -d match-roles
```

### Production Deployment

For production, you can use the pre-built image from the registry:

```bash
DOCKER_REGISTRY_HOST=your-registry-host docker-compose up -d match-roles
```

## Triggering a Manual Build

To manually trigger a build for a specific platform:

1. Go to the Actions tab in the repository
2. Select the "Build and push match roles service" workflow
3. Click "Run workflow"
4. Select the desired platform (amd64 or arm64)
5. Click "Run workflow"
