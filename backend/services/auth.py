from datetime import datetime, timedelta
from jose import JWTError, jwt
import hashlib
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "packsmart-deep-learning-secret-key-2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

def hash_password(password: str) -> str:
    # Use SHA-256 with salt for simple, robust zero-failure hashing
    salt = "packsmart_salt_food_barrier_"
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
