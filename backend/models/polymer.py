from sqlalchemy import Integer, String, Float, Boolean, Column
from backend.database import Base

class Polymer(Base):
    __tablename__ = 'polymers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False, unique=True)
    category_type = Column(String(50), nullable=False)
    nominal_thickness_um = Column(Float, default=25.0)
    baseline_wvtr = Column(Float, nullable=False)
    baseline_otr = Column(Float, nullable=False)
    co2_permeability = Column(Float, default=0.0)
    activation_energy_wvtr = Column(Float, default=40.0)
    activation_energy_otr = Column(Float, default=35.0)
    puncture_resistance_N = Column(Float, default=5.0)
    seal_initiation_temp_C = Column(Float, default=120.0)
    optical_haze_pct = Column(Float, default=5.0)
    cost_per_kg_inr = Column(Float, default=200.0)
    carbon_footprint_kgCO2 = Column(Float, default=3.0)
    recyclability_class = Column(String(5), default='C')
    fssai_certified = Column(Boolean, default=True)
