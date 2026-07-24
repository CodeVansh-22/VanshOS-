import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "vanshos_super_secret_jwt_key_2026")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "vanshos_jwt_access_secret_2026_key")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    
    # MongoDB Atlas Connection URI
    MONGO_URI = os.getenv(
        "MONGO_URI", 
        "mongodb://localhost:27017/vanshos_db"
    )
    
    # Upload Configurations
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", os.path.join(BASE_DIR, "uploads"))
    MAX_CONTENT_LENGTH = int(os.getenv("MAX_CONTENT_LENGTH", 16 * 1024 * 1024)) # 16 MB limit
    ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "webp"}
    
    # Rate Limiting
    RATELIMIT_DEFAULT = "200 per day;50 per hour"
    RATELIMIT_STORAGE_URI = "memory://"
