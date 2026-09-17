from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base
from backend.seed_data import seed_database
from backend.auth.routes import router as auth_router
from backend.routes.commodities import router as commodities_router
from backend.routes.polymers import router as polymers_router
from backend.routes.engine import router as engine_router
from backend.routes.admin import router as admin_router

app = FastAPI(
    title="Intelligent Food Packaging Recommendation & Permeation Engine",
    description="Industrial-grade decision-support platform for food packaging optimization",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    seed_database()

app.include_router(auth_router)
app.include_router(commodities_router)
app.include_router(polymers_router)
app.include_router(engine_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {"message": "Food Packaging Recommendation Engine API", "version": "1.0.0", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}
