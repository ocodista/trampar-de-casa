from fastapi import FastAPI, HTTPException
import os
import pandas as pd
import pickle
import logging
import sys

# Configure logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[logging.StreamHandler(sys.stdout)])
logger = logging.getLogger(__name__)

# Paths
MODEL_PATH = "../models/onehot_skills.pkl"
DATA_PATH = "../data/roles.csv"

# Define placeholder for global variables
ONEHOT_SKILLS = None
DF_ROLES = None
RANK_BY_SKILLS = None

# Load data with error handling
try:
    logger.info(f"Loading roles data from {DATA_PATH}")
    if not os.path.exists(DATA_PATH):
        logger.error(f"Roles data file not found at {DATA_PATH}")
        raise FileNotFoundError(f"Roles data file not found at {DATA_PATH}")
        
    DF_ROLES = pd.read_csv(DATA_PATH)
    logger.info(f"Loaded {len(DF_ROLES)} roles")
except Exception as e:
    logger.error(f"Error loading roles data: {e}")
    # Create empty DataFrame as fallback
    DF_ROLES = pd.DataFrame(columns=["id", "language", "skillsId"])
    logger.warning("Using empty roles DataFrame as fallback")

# Load model with error handling
try:
    logger.info(f"Loading model from {MODEL_PATH}")
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            ONEHOT_SKILLS = pickle.load(f)
        logger.info("Model loaded successfully")
    else:
        logger.warning(f"Model file not found at {MODEL_PATH}, creating placeholder")
        ONEHOT_SKILLS = {"variables": ["skillsId"], "model": []}
except Exception as e:
    logger.error(f"Error loading model: {e}")
    logger.warning("Using empty model dictionary as fallback")
    ONEHOT_SKILLS = {"variables": ["skillsId"], "model": []}

# Initialize the ranker with lazy loading
def get_rank_by_skills():
    global RANK_BY_SKILLS
    if RANK_BY_SKILLS is None:
        try:
            from predict import rank
            logger.info("Initializing skills ranker")
            RANK_BY_SKILLS = rank.Rank(DF_ROLES, ONEHOT_SKILLS)
            logger.info("Skills ranker initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing skills ranker: {e}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to initialize skills ranker: {str(e)}"
            )
    return RANK_BY_SKILLS

def rank_roles(skills:list, languages=['English', 'Portuguese'], n=40):
    try:
        ranker = get_rank_by_skills()
        
        if len(DF_ROLES) == 0:
            logger.warning("No roles data available for ranking")
            return []
            
        user_roles = (DF_ROLES[DF_ROLES['language'].isin(languages)]
                            .copy()[['id']])

        if user_roles.empty:
            logger.warning(f"No roles found for languages: {languages}")
            return []

        ranked_roles = list(ranker.rank_roles(skills)
                                        .merge(user_roles, how='inner')
                                        .sort_values('similarity', ascending=False)
                                        .head(n)
                                        .T
                                        .to_dict()
                                        .values())
        
        return ranked_roles
    except Exception as e:
        logger.error(f"Error ranking roles: {e}")
        raise HTTPException(status_code=500, detail=f"Error ranking roles: {str(e)}")

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/best_role")
async def best_role(skills:str, languages:str='English,Portuguese', n:int=40):
    try:
        skills_list = [i.strip(" ") for i in skills.split(",")]
        languages_list = [i.strip(" ") for i in languages.split(",")]
        
        logger.info(f"Ranking roles for skills: {skills_list}, languages: {languages_list}, n: {n}")
        res = rank_roles(skills=skills_list, languages=languages_list, n=n)
        logger.info(f"Found {len(res)} matching roles")
        
        return {"result": res}
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))