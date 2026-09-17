from sqlalchemy import Integer, String, Text, Float, DateTime, Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    hashed_password = Column(String(500), nullable=False)
    role = Column(String(20), default='FARMER_USER')
    created_at = Column(DateTime, default=func.now())
    query_logs = relationship('QueryLog', back_populates='user')

class QueryLog(Base):
    __tablename__ = 'query_logs'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    commodity_id = Column(Integer, nullable=True)
    recommended_laminate = Column(Text, nullable=True)
    simulated_shelf_life_days = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=func.now())
    user = relationship('User', back_populates='query_logs')
