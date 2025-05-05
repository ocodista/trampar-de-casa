import argparse
import pandas as pd
import pickle
from feature_engine.encoding import OneHotEncoder
from pathlib import Path
import os

def train_onehot(entity):
    base_dir = Path(__file__).resolve().parents[2]

    data_path = base_dir / 'data' / f'{entity}.csv'
    
    print(f"Loading data from {data_path}")
    df = pd.read_csv(data_path)
    print(f"Loaded data with shape: {df.shape}")
    
    # Ensure id is treated as string for consistency
    df[f'{entity}Id'] = df['id'].astype(str)
    
    print(f"Creating OneHotEncoder for {entity}Id")
    # For feature_engine 1.0.2, we need to use the correct parameters
    onehot = OneHotEncoder(
        variables=[f'{entity}Id'],
        drop_last=False,
        drop_last_binary=False
    )
    
    print("Fitting encoder...")
    onehot.fit(df[[f'{entity}Id']])
    print("Encoder fitted successfully")
    
    return onehot

def save_onehot(onehot, entity):
    base_dir = Path(__file__).resolve().parents[2]
    
    # Ensure models directory exists
    models_dir = base_dir / 'models'
    os.makedirs(models_dir, exist_ok=True)
    
    model_path = models_dir / f'onehot_{entity}.pkl'
    
    print(f"Saving model to {model_path}")
    
    # Use dictionary for backward compatibility
    onehot_dict = {
        "model": onehot,
        "variables": [f'{entity}Id'],
    }
    
    # Direct pickle serialization
    try:
        with open(model_path, 'wb') as f:
            pickle.dump(onehot_dict, f)
        print(f"Model saved successfully to {model_path}")
    except Exception as e:
        print(f"Error saving model: {e}")
        raise

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--entity", "-e", type=str, help="Entity to fit", default="skills")
    args = parser.parse_args()

    print(f"Training OneHotEncoder for {args.entity}")
    onehot = train_onehot(args.entity)
    save_onehot(onehot, args.entity)
    print("Training completed successfully")

if __name__ == "__main__":
    main()