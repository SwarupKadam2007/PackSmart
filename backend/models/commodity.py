from sqlalchemy import Integer, String, Float, Boolean, Column
from backend.database import Base

class Commodity(Base):
    __tablename__ = 'commodities'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False, unique=True)
    category = Column(String(100), nullable=False)
    initial_moisture_pct = Column(Float, nullable=False)
    critical_moisture_pct = Column(Float, nullable=False)
    water_activity_aw = Column(Float, nullable=False)
    lipid_pct = Column(Float, default=0.0)
    oxidation_sensitivity = Column(String(20), default='Low')
    light_sensitivity = Column(Boolean, default=False)
    respiration_class = Column(String(30), default='None')
    vm_o2 = Column(Float, default=0.0)
    km_o2 = Column(Float, default=0.0)
    optimal_temp_min = Column(Float, default=0.0)
    optimal_temp_max = Column(Float, default=25.0)
    max_tolerable_o2_uptake = Column(Float, default=0.0)
