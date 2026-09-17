from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user" # guest, user, researcher, admin
    organization_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserResponse(BaseModel):
    user_id: str
    name: str
    email: str
    role: str
    organization_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Commodity Schemas ---
class CommodityBase(BaseModel):
    name: str
    category: str
    default_moisture_content: float
    default_oil_fat_content: float
    default_ph: float
    default_respiration_rate: Optional[float] = None
    product_form: Optional[str] = "solid"

class CommodityCreate(CommodityBase):
    pass

class CommodityResponse(CommodityBase):
    commodity_id: str
    is_custom: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Packaging Material Schemas ---
class MaterialBase(BaseModel):
    name: str
    material_type: str
    otr_range: str
    wvtr_range: str
    thickness_range_microns: str
    mechanical_strength_index: float
    sealability_rating: str
    gas_permeability_notes: Optional[str] = None
    map_compatible: bool = True
    cost_index: float = 5.0
    is_recyclable: bool = True
    is_biodegradable: bool = False

class MaterialCreate(MaterialBase):
    sustainability_score: Optional[float] = 50.0
    carbon_footprint_index: Optional[float] = 2.5
    recyclability_notes: Optional[str] = None

class MaterialResponse(MaterialBase):
    material_id: str
    sustainability_score: Optional[float] = None
    carbon_footprint_index: Optional[float] = None
    recyclability_notes: Optional[str] = None

    class Config:
        from_attributes = True

# --- Recommendation Schemas ---
class RecommendationInput(BaseModel):
    commodity_id: Optional[str] = None
    commodity_name: Optional[str] = "freshProduce"
    moisture_content: Optional[str] = "high"
    oil_fat_content: Optional[str] = "low"
    ph_level: Optional[str] = "neutral"
    respiration_rate: Optional[str] = "high"
    desired_shelf_life: Optional[int] = 14
    storage_type: Optional[str] = "chilled"
    storage_temp: Optional[float] = 4.0
    relative_humidity: Optional[float] = 85.0
    transport_conditions: Optional[str] = "smooth"

class RankedMaterial(BaseModel):
    material_id: str
    name: str
    material_type: str
    rank: int
    confidence_score: float
    recommended_thickness: str
    recommended_otr: str
    recommended_wvtr: str
    sealability: str
    map_required: str
    eco_alternative: str
    explanation: str
    cost_index: float
    sustainability_score: float

class RecommendationResponse(BaseModel):
    recommendation_id: str
    commodity: str
    primary_material: str
    target_otr: str
    target_wvtr: str
    thickness: str
    sealability: str
    map_required: str
    eco_alternative: str
    shelf_life_days: float
    ranked_materials: List[RankedMaterial]
    map_advisory: Optional[Dict[str, Any]] = None
    created_at: datetime

# --- Shelf Life Schemas ---
class ShelfLifePredictInput(BaseModel):
    commodity_type: str
    material_type: str
    storage_temp: float
    relative_humidity: float
    initial_moisture: Optional[float] = 60.0
    packaging_barrier_grade: Optional[str] = "standard"

class ShelfLifeResponse(BaseModel):
    commodity: str
    material: str
    predicted_shelf_life_days: float
    decay_rate_per_day: float
    q10_factor: float
    sensitivity_curve: List[Dict[str, Any]]
    recommendation_note: str

# --- MAP Schemas ---
class MapAdvisorInput(BaseModel):
    commodity_name: str
    weight_grams: float = 500.0
    packaging_volume_ml: float = 1200.0
    respiration_rate_ml_co2_kg_hr: Optional[float] = 25.0
    storage_temp_c: float = 4.0

class MapAdvisorResponse(BaseModel):
    commodity: str
    target_o2_percent: float
    target_co2_percent: float
    target_n2_percent: float
    micro_perforation_density: str
    gas_flush_volume_liters: float
    condensation_risk: str
    advisory_notes: str

# --- Sustainability Schemas ---
class SustainabilityInput(BaseModel):
    material_id: Optional[str] = None
    material_name: Optional[str] = "LDPE"
    production_volume_units: int = 10000
    pack_weight_grams: float = 15.0

class SustainabilityResponse(BaseModel):
    material_name: str
    sustainability_score: float
    carbon_footprint_total_kg_co2: float
    carbon_per_unit_g_co2: float
    recyclability_rating: str
    biodegradability: bool
    cost_estimate_usd: float
    cost_per_unit_usd: float
    eco_recommendation: str

# --- QR & Traceability Schemas ---
class QrGenerateInput(BaseModel):
    recommendation_id: Optional[str] = None
    batch_label: str = "BATCH-2026-X1"
    commodity: str = "Organic Apples"
    packaging_material: str = "Breathable Polypropylene (PP)"
    pack_date: Optional[str] = None
    expiry_date: Optional[str] = None

class QrResponse(BaseModel):
    qr_id: str
    qr_code_svg: str
    qr_data_url: str
    batch_label: str
    tracking_url: str

class ScanLogCreate(BaseModel):
    scanned_location: str
    scanned_by: Optional[str] = "Inspector"

class ScanLogResponse(BaseModel):
    log_id: int
    qr_id: str
    scanned_at: datetime
    scanned_location: Optional[str]
    scanned_by: Optional[str]

# --- Admin Schemas ---
class AdminAnalyticsResponse(BaseModel):
    total_recommendations: int
    total_commodities: int
    total_materials: int
    total_users: int
    popular_commodities: List[Dict[str, Any]]
    popular_materials: List[Dict[str, Any]]
    model_status: Dict[str, Any]
