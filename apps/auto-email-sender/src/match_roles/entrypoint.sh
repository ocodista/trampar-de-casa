#!/bin/bash
set -e

echo "Starting match_roles service setup..."

# Create directories if they don't exist
mkdir -p /app/data /app/models

# Run the data generation script if the data directory is empty
if [ ! -f "/app/data/roles.csv" ] || [ ! -f "/app/data/skills.csv" ]; then
    echo "Data files not found, running data generation script..."
    
    # Run the data generation script
    cd /app/setup
    echo "Attempting to generate data..."
    node generate-data.js
    
    # Check if data was generated successfully
    if [ ! -f "/app/data/roles.csv" ] || [ ! -f "/app/data/skills.csv" ]; then
        echo "WARNING: Data files were not generated. The service may not work correctly."
    else
        echo "Data files generated successfully."
    fi
else
    echo "Data files already exist, skipping data generation."
fi

# Create dummy model if needed - we'll use dynamic one-hot encoding instead
if [ ! -f "/app/models/onehot_skills.pkl" ]; then
    echo "Creating a basic model configuration file..."
    mkdir -p /app/models
    
    # Create a simple Python script to generate a basic model file
    cat > /tmp/create_model.py << 'EOL'
import pickle
import os

# Create a simple dictionary as a placeholder
model_dict = {
    "variables": ["skillsId"],
    "model": []  # Empty placeholder
}

# Save the model
with open('/app/models/onehot_skills.pkl', 'wb') as f:
    pickle.dump(model_dict, f)
    
print("Created basic model configuration file.")
EOL
    
    # Run the script
    python3 /tmp/create_model.py
fi

echo "Setup complete. Starting FastAPI application..."

# Start the FastAPI server
cd /app/src
exec uvicorn main:app --host 0.0.0.0 --log-level debug 