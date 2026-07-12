from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from core.config import settings
import logging

logger = logging.getLogger(__name__)

# Try connecting to postgres first, fall back to SQLite
try:
    SQLALCHEMY_DATABASE_URL = settings.SQLALCHEMY_DATABASE_URI
    # Test connection immediately
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"connect_timeout": 2})
    # Probe database connection
    with engine.connect() as conn:
        logger.info("Successfully connected to PostgreSQL database.")
except Exception as e:
    logger.warning(f"PostgreSQL connection failed: {e}. Falling back to SQLite.")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./assetflow.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
