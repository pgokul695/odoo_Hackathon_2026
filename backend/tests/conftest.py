import os
import pytest
import uuid
from datetime import datetime, timezone

import sys

# Ensure backend root is in PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Force testing database before any backend imports
os.environ["TESTING"] = "true"

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from alembic.config import Config
from alembic import command
from fastapi.testclient import TestClient

from core.database import Base, get_db
from core.config import settings
from main import app
from shared.models import User, Department, OrganizationSettings
from shared.enums import Role
from core.security import get_password_hash
import respx
import httpx

@pytest.fixture(autouse=True)
def clear_rate_limits():
    """Clear rate limits before each test."""
    import core.security
    core.security._otp_rate_limit.clear()

# The db_uri logic matches env.py
TEST_DB_URL = settings.SQLALCHEMY_DATABASE_URI.replace(settings.POSTGRES_DB, "assetflow_test")
engine = create_engine(TEST_DB_URL, pool_pre_ping=True)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """Create fresh database via Alembic on test run start."""
    # Run alembic upgrade head
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    
    # Initialize basic org settings
    db = TestingSessionLocal()
    if not db.query(OrganizationSettings).first():
        db.add(OrganizationSettings(name="Test Org"))
        db.commit()
    db.close()
    
    yield
    # Optionally drop tables at end, but nested transactions usually handle cleanup
    # Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db():
    """Yield a database session wrapped in a transaction that rolls back after each test."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    
    # Override FastAPI dependency
    def override_get_db():
        yield session
        
    app.dependency_overrides[get_db] = override_get_db
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()
    app.dependency_overrides.clear()

@pytest.fixture
def client(db):
    """Unauthenticated client."""
    return TestClient(app)

@pytest.fixture
def now():
    import freezegun
    frozen_time = datetime(2026, 7, 12, 12, 0, 0, tzinfo=timezone.utc)
    with freezegun.freeze_time(frozen_time) as frozen:
        yield frozen_time

@pytest.fixture(autouse=True)
def mock_protopost():
    with respx.mock(base_url="http://localhost:5978/api", assert_all_called=False) as respx_mock:
        send_route = respx_mock.post("/send").mock(return_value=httpx.Response(200, json={"success": True}))
        yield send_route

# --- User Factories ---

def _create_and_login_user(db, client, role, email, password="password123", department_id=None, is_verified=True):
    user = User(
        name=f"Test {role}",
        email=email,
        hashed_password=get_password_hash(password),
        role=role,
        department_id=department_id,
        email_verified_at=datetime.utcnow() if is_verified else None
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Login to get token
    response = client.post("/api/auth/login/", json={"email": email, "password": password})
    assert response.status_code == 200, f"Login failed for {email}: {response.json()}"
    token = response.json()["data"]["token"]
    
    auth_client = TestClient(app)
    auth_client.headers.update({"Authorization": f"Bearer {token}"})
    return auth_client, user

@pytest.fixture
def make_admin(db, client):
    def _make():
        return _create_and_login_user(db, client, Role.Admin.value, f"admin_{uuid.uuid4().hex[:6]}@test.com")
    return _make

@pytest.fixture
def make_asset_manager(db, client):
    def _make():
        return _create_and_login_user(db, client, Role.AssetManager.value, f"am_{uuid.uuid4().hex[:6]}@test.com")
    return _make

@pytest.fixture
def make_department_head(db, client):
    def _make(department):
        return _create_and_login_user(db, client, Role.DepartmentHead.value, f"dh_{uuid.uuid4().hex[:6]}@test.com", department_id=department.id)
    return _make

@pytest.fixture
def make_employee(db, client):
    def _make(department):
        return _create_and_login_user(db, client, Role.Employee.value, f"emp_{uuid.uuid4().hex[:6]}@test.com", department_id=department.id)
    return _make

@pytest.fixture
def make_pending_user(db, client):
    def _make():
        return _create_and_login_user(db, client, Role.User.value, f"user_{uuid.uuid4().hex[:6]}@test.com", is_verified=True) # verified but unassigned
    return _make
