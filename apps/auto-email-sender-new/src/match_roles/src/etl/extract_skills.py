def str_to_list(x):
    x = x.strip("[]").replace('"', '').split(',')
    return x


def extract_skills(df, onehot):
    df['skillsId'] = df["skillsId"].apply(str_to_list)
    df_explode = df.explode('skillsId')[['id', 'skillsId']].set_index('id')
    df_entity = (onehot['model'].transform(df_explode[onehot['variables']])
                                .reset_index()
                                .groupby(['id'])
                                .sum()
                                .reset_index())
    return df_entity