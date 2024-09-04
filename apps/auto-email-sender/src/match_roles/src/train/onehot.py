# %%
import argparse

import pandas as pd
from feature_engine import encoding

# %%
# preparação do onehot encoding

def train_onehot(entity):
    #Path for work with docker image
    df = pd.read_csv(f'/app/apps/auto-email-sender/src/match_roles/data/{entity}.csv')
    df[f'{entity}Id'] = df['id'].astype(str)
    onehot = encoding.OneHotEncoder(variables=[f'{entity}Id'])
    onehot.fit(df[[f'{entity}Id']])
    return onehot


def save_onehot(onehot, entity):
    pd_onehot = pd.Series({
        "model": onehot,
        "variables": [f'{entity}Id'],
        }
    )
    pd_onehot.to_pickle(f'/app/apps/auto-email-sender/src/match_roles/models/onehot_{entity}.pkl')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--entity", "-e", type=str, help="Entity to fit", default="skills")
    args = parser.parse_args()

    onehot = train_onehot(args.entity)
    save_onehot(onehot, args.entity)


if __name__ == "__main__":
    main()    