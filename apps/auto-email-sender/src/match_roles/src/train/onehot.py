import argparse
import pandas as pd
from feature_engine import encoding
from pathlib import Path

def train_onehot(entity):
    base_dir = Path(__file__).resolve().parents[2]

    data_path = base_dir / 'data' / f'{entity}.csv'
    
    df = pd.read_csv(data_path)
    df[f'{entity}Id'] = df['id'].astype(str)
    
    onehot = encoding.OneHotEncoder(variables=[f'{entity}Id'])
    onehot.fit(df[[f'{entity}Id']])
    
    return onehot

def save_onehot(onehot, entity):
    base_dir = Path(__file__).resolve().parents[2]
    
    model_path = base_dir / 'models' / f'onehot_{entity}.pkl'
    
    pd_onehot = pd.Series({
        "model": onehot,
        "variables": [f'{entity}Id'],
    })
    
    pd_onehot.to_pickle(model_path)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--entity", "-e", type=str, help="Entity to fit", default="skills")
    args = parser.parse_args()

    onehot = train_onehot(args.entity)
    save_onehot(onehot, args.entity)

if __name__ == "__main__":
    main()