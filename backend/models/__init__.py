from sqlalchemy import Column, Integer, String, Float, Boolean, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from backend.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    user_id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    phone = Column(String(30), nullable=True)
    password_hash = Column(String(255), nullable=True)
    auth_provider = Column(String(50), default="email") # email, google, otp
    role = Column(String(50), default="user") # guest, user, researcher, admin
    organization_name = Column(String(150), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    recommendations = relationship("Recommendation", back_populates="user")
    reports = relationship("Report", back_populates="user")

class Commodity(Base):
    __tablename__ = "commodities"

    commodity_id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), index=True, nullable=False)
    category = Column(String(100), nullable=False) # fresh produce, dairy, bakery, meat & seafood, dry goods, beverages, ready-to-eat
    default_moisture_content = Column(Float, nullable=False, default=50.0)
    default_oil_fat_content = Column(Float, nullable=False, default=5.0)
    default_ph = Column(Float, nullable=False, default=6.0)
    default_respiration_rate = Column(Float, nullable=True) # mL CO2/kg/hr
    product_form = Column(String(50), default="solid") # solid, liquid, powder, semi-solid
    is_custom = Column(Boolean, default=False)
    created_by = Column(String(36), ForeignKey("users.user_id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    recommendations = relationship("Recommendation", back_populates="commodity")

class PackagingMaterial(Base):
    __tablename__ = "packaging_materials"

    material_id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(100), index=True, nullable=False) # e.g. LDPE, HDPE, PET, Metalized Film, EVOH
    material_type = Column(String(50), nullable=False) # plastic, laminate, biodegradable, foil, breathable film
    otr_range = Column(String(100), nullable=False) # cc/m²/day
    wvtr_range = Column(String(100), nullable=False) # g/m²/day
    thickness_range_microns = Column(String(100), nullable=False)
    mechanical_strength_index = Column(Float, default=7.0) # 1-10
    sealability_rating = Column(String(20), default="high") # low, medium, high
    gas_permeability_notes = Column(Text, nullable=True)
    map_compatible = Column(Boolean, default=True)
    cost_index = Column(Float, default=5.0) # relative scale 1-10
    is_recyclable = Column(Boolean, default=True)
    is_biodegradable = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    sustainability_data = relationship("MaterialSustainabilityData", back_populates="material", uselist=False)
    recommendation_links = relationship("RecommendationMaterial", back_populates="material")

class MaterialSustainabilityData(Base):
    __tablename__ = "material_sustainability_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    material_id = Column(String(36), ForeignKey("packaging_materials.material_id"), unique=True)
    sustainability_score = Column(Float, default=50.0) # 0-100
    carbon_footprint_index = Column(Float, default=2.5) # kg CO2e / kg
    recyclability_notes = Column(Text, nullable=True)

    material = relationship("PackagingMaterial", back_populates="sustainability_data")

class Recommendation(Base):
    __tablename__ = "recommendations"

    recommendation_id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=True, index=True)
    commodity_id = Column(String(36), ForeignKey("commodities.commodity_id"), nullable=True)
    commodity_name = Column(String(100), nullable=True)
    input_moisture_content = Column(Float, nullable=True)
    input_oil_fat_content = Column(Float, nullable=True)
    input_ph = Column(Float, nullable=True)
    input_respiration_rate = Column(Float, nullable=True)
    desired_shelf_life_days = Column(Integer, default=14)
    storage_type = Column(String(50), default="ambient") # ambient, chilled, frozen
    storage_temperature = Column(Float, default=20.0)
    relative_humidity = Column(Float, default=65.0)
    transport_mode = Column(String(100), default="road")
    transport_duration_hours = Column(Float, default=24.0)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    user = relationship("User", back_populates="recommendations")
    commodity = relationship("Commodity", back_populates="recommendations")
    ranked_materials = relationship("RecommendationMaterial", back_populates="recommendation", cascade="all, delete-orphan")
    shelf_life = relationship("ShelfLifePrediction", back_populates="recommendation", uselist=False, cascade="all, delete-orphan")
    map_advisory = relationship("MapAdvisory", back_populates="recommendation", uselist=False, cascade="all, delete-orphan")
    qr_codes = relationship("QrCode", back_populates="recommendation", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="recommendation", cascade="all, delete-orphan")
    feedback = relationship("Feedback", back_populates="recommendation", cascade="all, delete-orphan")

class RecommendationMaterial(Base):
    __tablename__ = "recommendation_materials"

    id = Column(Integer, primary_key=True, autoincrement=True)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=False)
    material_id = Column(String(36), ForeignKey("packaging_materials.material_id"), nullable=False)
    rank = Column(Integer, nullable=False, default=1)
    confidence_score = Column(Float, default=0.90) # 0-1
    recommended_thickness_microns = Column(Float, default=50.0)
    recommended_otr = Column(Float, default=50.0)
    recommended_wvtr = Column(Float, default=5.0)
    explanation_text = Column(Text, nullable=True)

    recommendation = relationship("Recommendation", back_populates="ranked_materials")
    material = relationship("PackagingMaterial", back_populates="recommendation_links")

class ShelfLifePrediction(Base):
    __tablename__ = "shelf_life_predictions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=True)
    predicted_shelf_life_days = Column(Float, nullable=False)
    sensitivity_data_json = Column(JSON, nullable=True)

    recommendation = relationship("Recommendation", back_populates="shelf_life")

class MapAdvisory(Base):
    __tablename__ = "map_advisories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=True)
    recommended_o2_percent = Column(Float, default=3.0)
    recommended_co2_percent = Column(Float, default=5.0)
    recommended_n2_percent = Column(Float, default=92.0)
    micro_perforation_density = Column(String(100), default="80 holes/m² (50μm diameter)")

    recommendation = relationship("Recommendation", back_populates="map_advisory")

class QrCode(Base):
    __tablename__ = "qr_codes"

    qr_id = Column(String(36), primary_key=True, default=generate_uuid)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=True)
    qr_image_url = Column(Text, nullable=False) # Data URL or path
    batch_label = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    recommendation = relationship("Recommendation", back_populates="qr_codes")
    logs = relationship("TraceabilityLog", back_populates="qr_code", cascade="all, delete-orphan")

class TraceabilityLog(Base):
    __tablename__ = "traceability_logs"

    log_id = Column(Integer, primary_key=True, autoincrement=True)
    qr_id = Column(String(36), ForeignKey("qr_codes.qr_id"), nullable=False)
    scanned_at = Column(DateTime, default=datetime.utcnow)
    scanned_location = Column(String(150), nullable=True)
    scanned_by = Column(String(100), nullable=True)

    qr_code = relationship("QrCode", back_populates="logs")

class Report(Base):
    __tablename__ = "reports"

    report_id = Column(String(36), primary_key=True, default=generate_uuid)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=False)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=True)
    file_url = Column(String(255), nullable=True)
    generated_at = Column(DateTime, default=datetime.utcnow)

    recommendation = relationship("Recommendation", back_populates="reports")
    user = relationship("User", back_populates="reports")

class Feedback(Base):
    __tablename__ = "feedback"

    feedback_id = Column(Integer, primary_key=True, autoincrement=True)
    recommendation_id = Column(String(36), ForeignKey("recommendations.recommendation_id"), nullable=True)
    user_id = Column(String(36), ForeignKey("users.user_id"), nullable=True)
    rating = Column(Integer, nullable=False) # 1-5
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    recommendation = relationship("Recommendation", back_populates="feedback")
