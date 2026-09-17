from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./packaging.db"
    SECRET_KEY: str = "food-packaging-engine-secret-key-change-in-production-2024"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    TOPSIS_W_BARRIER: float = 0.35
    TOPSIS_W_COST: float = 0.25
    TOPSIS_W_CARBON: float = 0.20
    TOPSIS_W_MECHANICAL: float = 0.10
    TOPSIS_W_SEAL: float = 0.10
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
