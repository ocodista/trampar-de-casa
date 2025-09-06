FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m -u 1000 appuser

# Install Python packages
RUN pip install --no-cache-dir \
    fastapi==0.95.2 uvicorn==0.22.0 psycopg2-binary==2.9.9 \
    python-multipart==0.0.6 python-dotenv==1.0.1 \
    pandas==1.5.3 scipy==1.10.1 scikit-learn==1.2.2 \
    feature_engine==1.0.2

# Accept build arguments
ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL:-postgresql://postgres:postgres@postgres:5432/trampar-de-casa}

WORKDIR /app

# Create setup directory and install Node dependencies
RUN mkdir -p /app/setup
COPY setup/package.json /app/setup/
WORKDIR /app/setup
RUN npm install --only=production --no-optional

# Copy application files
WORKDIR /app
COPY setup/generate-data.js /app/setup/
COPY src/ src/
COPY entrypoint-simple.sh /app/entrypoint.sh

# Create directories and set permissions
RUN mkdir -p data models \
    && chmod +x /app/entrypoint.sh \
    && chown -R appuser:appuser /app

USER appuser
EXPOSE 8000
ENTRYPOINT ["/app/entrypoint.sh"]