FROM python:3.11

# Accept build arguments
ARG POSTGRES_URL
ENV POSTGRES_URL=${POSTGRES_URL:-postgresql://postgres:postgres@postgres:5432/trampar-de-casa}

WORKDIR /app

# Install Node.js and npm for TypeScript execution
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first for Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create necessary directories
RUN mkdir -p /app/data /app/models /app/setup

# Copy data generator script and dependencies
COPY setup/ /app/setup/
WORKDIR /app/setup
RUN npm install

# Copy application code
WORKDIR /app
COPY src/ src/

# Setup entrypoint script
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

# Add simple health check endpoint to main.py
WORKDIR /app/src/
RUN echo '\n@app.get("/health")\nasync def health():\n    return {"status": "ok"}\n' >> main.py

EXPOSE 8000

# Use entrypoint script to ensure data is generated before starting the service
ENTRYPOINT ["/app/entrypoint.sh"]