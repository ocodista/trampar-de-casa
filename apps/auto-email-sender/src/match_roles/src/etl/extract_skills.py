def str_to_list(x):
    x = x.strip("[]").replace('"', '').split(',')
    return x


def extract_skills(df, onehot):
    df['skillsId'] = df["skillsId"].apply(str_to_list)
    df_explode = df.explode('skillsId')[['id', 'skillsId']].set_index('id')
    
    # Handle both pandas Series and dictionary formats for backward compatibility
    onehot_model = onehot['model'] if isinstance(onehot, dict) and 'model' in onehot else onehot
    onehot_vars = onehot['variables'] if isinstance(onehot, dict) and 'variables' in onehot else ['skillsId']
    
    print(f"DEBUG: onehot type: {type(onehot)}")
    print(f"DEBUG: onehot_model type: {type(onehot_model)}")
    
    # Perform manual one-hot encoding which is more reliable
    import pandas as pd
    
    # Get unique values from the dataset for encoding
    unique_values = df_explode[onehot_vars[0]].unique()
    print(f"DEBUG: Found {len(unique_values)} unique skills to encode")
    
    # Use pandas get_dummies for one-hot encoding
    one_hot_df = pd.get_dummies(df_explode[onehot_vars[0]], prefix='', prefix_sep='')
    
    # Process the one-hot encoded dataframe
    df_entity = (one_hot_df.reset_index()
                          .groupby(['id'])
                          .sum()
                          .reset_index())
    
    print(f"DEBUG: Final dataframe shape: {df_entity.shape}")
    return df_entity