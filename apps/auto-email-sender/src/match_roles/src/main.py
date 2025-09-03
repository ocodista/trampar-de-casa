from fastapi import FastAPI, HTTPException
import os
import pandas as pd
import pickle
import psycopg2
import json
import logging
import sys
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    handlers=[logging.StreamHandler(sys.stdout)])
logger = logging.getLogger("match_roles")

# Log startup information
logger.info("🚀 Starting Match Roles Service")
logger.info(f"📅 Startup time: {datetime.now().isoformat()}")

# Paths
MODEL_PATH = "../models/onehot_skills.pkl"
DATA_PATH = "../data/roles.csv"

# Define placeholder for global variables
ONEHOT_SKILLS = None
DF_ROLES = None
RANK_BY_SKILLS = None

def get_postgres_connection():
    """Create PostgreSQL connection using POSTGRES_URL environment variable"""
    try:
        postgres_url = os.getenv('POSTGRES_URL')
        
        if not postgres_url:
            logger.error("❌ POSTGRES_URL environment variable not found")
            raise ValueError("POSTGRES_URL environment variable is required")
        
        # Mask password for logging
        masked_url = postgres_url
        if '@' in postgres_url and ':' in postgres_url:
            parts = postgres_url.split('@')
            if len(parts) == 2:
                credentials = parts[0].split('://')[-1]
                if ':' in credentials:
                    user, password = credentials.split(':', 1)
                    masked_credentials = f"{user}:***"
                    masked_url = postgres_url.replace(credentials, masked_credentials)
        
        logger.info(f"🔗 Connecting to PostgreSQL: {masked_url}")
        
        conn = psycopg2.connect(postgres_url)
        logger.info("✅ Successfully connected to PostgreSQL")
        return conn
        
    except Exception as e:
        logger.error(f"❌ Failed to connect to PostgreSQL: {str(e)}")
        raise

def fetch_roles_from_postgres():
    """Fetch roles data from PostgreSQL database"""
    try:
        conn = get_postgres_connection()
        
        query = """
        SELECT 
            country,
            "createdAt",
            currency,
            description,
            salary,
            title,
            "updatedAt",
            ready,
            url,
            language,
            "minimumYears",
            "skillsId",
            company,
            id,
            "topicId"
        FROM "Roles"
        WHERE ready = true
        ORDER BY "createdAt" DESC;
        """
        
        logger.info("🔍 Executing query to fetch roles from PostgreSQL...")
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        logger.info(f"✅ Retrieved {len(df)} roles from PostgreSQL")
        
        # Convert skillsId array to JSON string format if it's not already
        if 'skillsId' in df.columns:
            def format_skills(skills):
                try:
                    # Handle None/NaN values first
                    if skills is None or (isinstance(skills, float) and pd.isna(skills)):
                        return "[]"
                    
                    # Handle numpy arrays and check for empty arrays
                    if hasattr(skills, '__len__') and hasattr(skills, 'size'):
                        if skills.size == 0:
                            return "[]"
                    
                    # Handle regular Python lists
                    if isinstance(skills, list):
                        if len(skills) == 0:
                            return "[]"
                        return json.dumps([str(s) for s in skills])
                    
                    # Handle strings
                    if isinstance(skills, str):
                        if skills.strip() == '' or skills.strip() == 'null':
                            return "[]"
                        if skills.startswith('[') and skills.endswith(']'):
                            return skills
                        else:
                            # Handle comma-separated string
                            skills_list = [s.strip().strip('"') for s in skills.split(',') if s.strip()]
                            return json.dumps(skills_list)
                    
                    # Handle other array-like objects
                    try:
                        skills_list = list(skills)
                        if len(skills_list) == 0:
                            return "[]"
                        return json.dumps([str(s) for s in skills_list])
                    except (TypeError, ValueError):
                        pass
                    
                    # Fallback to empty array
                    logger.warning(f"Unknown skillsId format: {type(skills)} - {skills}")
                    return "[]"
                    
                except Exception as e:
                    logger.warning(f"Error formatting skillsId: {e} - returning empty array")
                    return "[]"
            
            df['skillsId'] = df['skillsId'].apply(format_skills)
        
        return df
        
    except Exception as e:
        logger.error(f"❌ Failed to fetch roles from PostgreSQL: {str(e)}")
        raise

def generate_csv_from_postgres():
    """Generate CSV file from PostgreSQL data"""
    try:
        logger.info("📊 Generating CSV file from PostgreSQL data...")
        
        # Fetch data from PostgreSQL
        roles_df = fetch_roles_from_postgres()
        
        if roles_df.empty:
            logger.warning("⚠️ No roles found in PostgreSQL database")
            return None
        
        # Define CSV file path
        csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'roles.csv')
        csv_path = os.path.abspath(csv_path)
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(csv_path), exist_ok=True)
        
        # Create backup if file exists
        if os.path.exists(csv_path):
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_path = f"{csv_path}.backup_{timestamp}"
            try:
                os.rename(csv_path, backup_path)
                logger.info(f"📁 Backed up existing CSV to {backup_path}")
            except Exception as e:
                logger.warning(f"⚠️ Failed to backup existing CSV: {str(e)}")
        
        # Save to CSV with UTF-8 encoding and BOM (to match existing format)
        roles_df.to_csv(csv_path, index=False, encoding='utf-8-sig')
        
        logger.info(f"✅ Successfully generated CSV with {len(roles_df)} roles at {csv_path}")
        
        # Verify the file was created
        if os.path.exists(csv_path):
            file_size = os.path.getsize(csv_path)
            logger.info(f"📊 CSV file size: {file_size} bytes")
        
        return roles_df
        
    except Exception as e:
        logger.error(f"❌ Failed to generate CSV from PostgreSQL: {str(e)}")
        raise

# Generate CSV from PostgreSQL and load roles data
logger.info("📊 Generating roles CSV from PostgreSQL data...")
try:
    DF_ROLES = generate_csv_from_postgres()
    
    if DF_ROLES is not None and not DF_ROLES.empty:
        logger.info(f"✅ Generated and loaded {len(DF_ROLES)} roles from PostgreSQL")
        logger.info(f"📊 Roles by language: {DF_ROLES['language'].value_counts().to_dict()}")
        
        # Log some sample data
        logger.info(f"📋 Sample role: {DF_ROLES.iloc[0]['title']} at {DF_ROLES.iloc[0]['company']}")
        logger.info(f"📊 Date range: {DF_ROLES['createdAt'].min()} to {DF_ROLES['createdAt'].max()}")
    else:
        logger.warning("⚠️ No roles found in PostgreSQL, attempting to load existing CSV...")
        try:
            DF_ROLES = pd.read_csv(DATA_PATH)
            logger.info(f"✅ Loaded {len(DF_ROLES)} roles from existing CSV")
        except Exception as csv_error:
            logger.error(f"❌ Failed to load existing CSV: {csv_error}")
            # Create empty DataFrame as fallback
            DF_ROLES = pd.DataFrame(columns=["id", "language", "skillsId"])
            logger.warning("Using empty roles DataFrame as fallback")
    
except Exception as e:
    logger.error(f"❌ Failed to generate/load roles data: {e}")
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
    """Rank roles based on skills and languages with enhanced logging"""
    logger.info(f"🔍 Ranking roles for skills: {skills}, languages: {languages}, n: {n}")
    
    try:
        ranker = get_rank_by_skills()
        
        if len(DF_ROLES) == 0:
            logger.warning("⚠️ No roles data available for ranking")
            return []
            
        # Filter by languages
        user_roles = (DF_ROLES[DF_ROLES['language'].isin(languages)]
                            .copy()[['id']])

        logger.info(f"🌍 Found {len(user_roles)} roles matching languages: {languages}")

        if user_roles.empty:
            logger.warning(f"⚠️ No roles found for languages: {languages}")
            return []

        # Rank roles by skills
        ranked_roles_df = ranker.rank_roles(skills)
        logger.info(f"📊 Ranked {len(ranked_roles_df)} roles by skills")

        # Merge and get top results
        final_result = (ranked_roles_df
                       .merge(user_roles, how='inner')
                       .sort_values('similarity', ascending=False)
                       .head(n))

        ranked_roles = list(final_result.T.to_dict().values())

        logger.info(f"✅ Returning {len(ranked_roles)} ranked roles")

        if ranked_roles:
            top_similarity = final_result.iloc[0]['similarity'] if 'similarity' in final_result.columns else 'N/A'
            logger.info(f"🏆 Top match similarity score: {top_similarity}")
        else:
            logger.warning("⚠️ No ranked roles found after filtering")

        return ranked_roles
        
    except Exception as e:
        logger.error(f"❌ Error in rank_roles: {e}")
        raise HTTPException(status_code=500, detail=f"Error ranking roles: {str(e)}")

app = FastAPI(title="Match Roles API", version="1.0.0")

@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "match_roles",
        "total_roles": len(DF_ROLES),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/stats")
async def get_stats():
    """Get statistics about the loaded data"""
    return {
        "total_roles": len(DF_ROLES),
        "languages": DF_ROLES['language'].value_counts().to_dict() if not DF_ROLES.empty else {},
        "date_range": {
            "earliest": DF_ROLES['createdAt'].min() if not DF_ROLES.empty else None,
            "latest": DF_ROLES['createdAt'].max() if not DF_ROLES.empty else None
        } if not DF_ROLES.empty else None,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/best_role")
async def best_role(skills:str, languages:str='English,Portuguese', n:int=40):
    """Get best matching roles for given skills and languages"""
    logger.info(f"🌐 API call: /best_role - skills: {skills}, languages: {languages}, n: {n}")
    
    try:
        # Parse inputs
        skills_list = [i.strip() for i in skills.split(",") if i.strip()]
        languages_list = [i.strip() for i in languages.split(",") if i.strip()]
        
        logger.info(f"📝 Parsed skills: {skills_list}")
        logger.info(f"🌍 Parsed languages: {languages_list}")
        
        # Get ranked roles
        result = rank_roles(skills=skills_list, languages=languages_list, n=n)
        
        logger.info(f"✅ API response: returning {len(result)} roles")
        
        return {"result": result}
        
    except Exception as e:
        logger.error(f"❌ API error in /best_role: {e}")
        return {"error": str(e), "result": []}

@app.post("/sync-data")
async def sync_data():
    """Sync data from PostgreSQL to CSV file and reload in memory"""
    logger.info("🔄 API call: /sync-data - starting data sync process")
    
    try:
        # Generate fresh CSV from PostgreSQL
        fresh_roles_df = generate_csv_from_postgres()
        
        if fresh_roles_df is None or fresh_roles_df.empty:
            logger.warning("⚠️ No fresh data found in PostgreSQL")
            return {
                "status": "warning",
                "message": "No data found in PostgreSQL",
                "roles_count": 0,
                "timestamp": datetime.now().isoformat()
            }
        
        # Reload the data globally
        global DF_ROLES, RANK_BY_SKILLS
        try:
            logger.info("🔄 Reloading data in memory...")
            DF_ROLES = fresh_roles_df
            # Reset the ranker to force reinitialization with new data
            RANK_BY_SKILLS = None
            logger.info(f"✅ Reloaded {len(DF_ROLES)} roles from PostgreSQL")
        except Exception as reload_error:
            logger.error(f"❌ Failed to reload data after sync: {reload_error}")
            raise HTTPException(status_code=500, detail=f"Data sync succeeded but reload failed: {reload_error}")
        
        return {
            "status": "success",
            "message": "Data sync completed successfully",
            "roles_count": len(DF_ROLES),
            "languages": DF_ROLES['language'].value_counts().to_dict(),
            "date_range": {
                "earliest": DF_ROLES['createdAt'].min(),
                "latest": DF_ROLES['createdAt'].max()
            },
            "timestamp": datetime.now().isoformat()
        }
    
    except Exception as e:
        logger.error(f"❌ Error during data sync: {e}")
        raise HTTPException(status_code=500, detail=f"Data sync error: {str(e)}")

logger.info("🎯 Match Roles Service ready to accept requests!")