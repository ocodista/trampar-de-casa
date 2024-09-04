from fastapi import FastAPI

import pandas as pd

from predict import rank

ONEHOT_SKILLS = pd.read_pickle("../models/onehot_skills.pkl")
DF_ROLES = pd.read_csv("../data/roles.csv")
RANK_BY_SKILLS = rank.Rank(DF_ROLES, ONEHOT_SKILLS)

def rank_roles(skills:list, languages=['English', 'Portuguese'], n=40):
    user_roles = (DF_ROLES[DF_ROLES['language'].isin(languages)]
                          .copy()[['id']])

    ranked_roles = list(RANK_BY_SKILLS.rank_roles(skills)
                                      .merge(user_roles, how='inner')
                                      .sort_values('similarity', ascending=False)
                                      .head(n)
                                      .T
                                      .to_dict()
                                      .values())
    
    return ranked_roles


app = FastAPI()

@app.get("/best_role")
async def best_role(skills:str, languages:str='English,Portuguese', n:int=40):
    skills = [i.strip(" ") for i in skills.split(",")]
    languages = [i.strip(" ") for i in languages.split(",")]
    res = rank_roles(skills=skills, languages=languages, n=n)
    return {"result":res}