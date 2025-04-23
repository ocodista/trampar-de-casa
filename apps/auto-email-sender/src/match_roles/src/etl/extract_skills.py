def str_to_list(x):
    x = x.strip("[]").replace('"', '').split(',')
    return x


def extract_skills(df, onehot):
    df['skillsId'] = df["skillsId"].apply(str_to_list)
    df_explode = df.explode('skillsId')[['id', 'skillsId']].set_index('id')
    
    # Handle both pandas Series and dictionary formats for backward compatibility
    onehot_model = onehot['model'] if isinstance(onehot, dict) or hasattr(onehot, '__getitem__') else onehot.model
    onehot_vars = onehot['variables'] if isinstance(onehot, dict) or hasattr(onehot, '__getitem__') else onehot.variables
    
    df_entity = (onehot_model.transform(df_explode[onehot_vars])
                              .reset_index()
                              .groupby(['id'])
                              .sum()
                              .reset_index())
    return df_entity