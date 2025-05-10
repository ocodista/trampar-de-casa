# %%
import sys

import pandas as pd
from scipy.spatial import distance

sys.path.insert(0, "../")

from etl import extract_skills

class Rank:

    def __init__(self, roles, onehot):
        self.roles = (extract_skills.extract_skills(roles, onehot)
                                    .set_index("id"))
        self.onehot = onehot


    @staticmethod
    def cosine_dist(rows, user):
        # Ensure both vectors have the same length by padding with zeros
        max_len = max(len(rows), len(user))
        rows_padded = rows.tolist() + [0] * (max_len - len(rows))
        user_padded = user + [0] * (max_len - len(user))
        dist = distance.cosine(rows_padded, user_padded)
        return dist


    def transform_skills(self, skills):
        new_skills = pd.DataFrame({"skillsId": [str(i) for i in skills]})
        new_skills['id'] = 1
        new_skills = extract_skills.extract_skills(new_skills, self.onehot)
        new_skills = new_skills.set_index("id")
        return new_skills.iloc[0].tolist()


    def rank_roles(self, skills):
        user_skills = self.transform_skills(skills)
        df_result = pd.DataFrame(index=self.roles.index)
        df_result['similarity'] = 1-self.roles.apply(self.cosine_dist,  user=user_skills, axis=1)
        df_result = df_result.sort_values("similarity", ascending=False).reset_index()
        return df_result
