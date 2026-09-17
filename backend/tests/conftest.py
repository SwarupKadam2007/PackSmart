import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import Base, engine, SessionLocal
from backend.seed import seed_database

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    # Setup test DB or ensure it's seeded
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield

@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client
