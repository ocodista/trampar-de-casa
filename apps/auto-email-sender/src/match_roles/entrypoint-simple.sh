#!/bin/sh
set -e

echo "Starting match_roles service..."
mkdir -p /app/data /app/models

# Generate data if missing
if [ ! -f "/app/data/roles.csv" ]; then
    echo "Generating data..."
    cd /app/setup && node generate-data.js
fi

# Create basic model if missing
if [ ! -f "/app/models/onehot_skills.pkl" ]; then
    echo "Creating model file..."
    python3 -c "
import pickle
with open('/app/models/onehot_skills.pkl', 'wb') as f:
    pickle.dump({'variables': ['skillsId'], 'model': []}, f)
"
fi

echo "Starting FastAPI..."
cd /app/src
exec python3 -m uvicorn main:app --host 0.0.0.0 --log-level info