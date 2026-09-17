from .database import SessionLocal, engine, Base
from .models import User, Commodity, PackagingMaterial, MaterialSustainabilityData
from .services.auth import hash_password

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Seed Users if not exist
    if not db.query(User).filter(User.email == "admin@packsmart.io").first():
        admin = User(
            name="Chief Packaging Engineer",
            email="admin@packsmart.io",
            password_hash=hash_password("admin123"),
            role="admin",
            organization_name="PackSmart Food Institute"
        )
        researcher = User(
            name="Dr. Elena Vance (Food Scientist)",
            email="researcher@packsmart.io",
            password_hash=hash_password("research123"),
            role="researcher",
            organization_name="Agricultural Research Center"
        )
        guest = User(
            name="Guest Farmer / Entrepreneur",
            email="farmer@localagri.org",
            password_hash=hash_password("farmer123"),
            role="user",
            organization_name="Green Harvest Farms"
        )
        db.add_all([admin, researcher, guest])

    # 2. Seed Commodities
    if db.query(Commodity).count() == 0:
        commodities = [
            Commodity(
                name="Fresh Apples (Royal Gala)",
                category="fresh produce",
                default_moisture_content=85.0,
                default_oil_fat_content=0.2,
                default_ph=3.8,
                default_respiration_rate=8.5, # mL CO2/kg/hr
                product_form="solid"
            ),
            Commodity(
                name="Strawberries & Berries",
                category="fresh produce",
                default_moisture_content=91.0,
                default_oil_fat_content=0.3,
                default_ph=3.5,
                default_respiration_rate=45.0,
                product_form="solid"
            ),
            Commodity(
                name="Vine Tomatoes",
                category="fresh produce",
                default_moisture_content=94.0,
                default_oil_fat_content=0.2,
                default_ph=4.4,
                default_respiration_rate=18.0,
                product_form="solid"
            ),
            Commodity(
                name="Crisp Potato Chips",
                category="dry goods",
                default_moisture_content=2.0,
                default_oil_fat_content=35.0,
                default_ph=6.2,
                default_respiration_rate=0.0,
                product_form="solid"
            ),
            Commodity(
                name="Fresh Ground Beef & Poultry",
                category="meat & seafood",
                default_moisture_content=72.0,
                default_oil_fat_content=15.0,
                default_ph=5.6,
                default_respiration_rate=0.0,
                product_form="solid"
            ),
            Commodity(
                name="Aged Cheddar Cheese",
                category="dairy",
                default_moisture_content=37.0,
                default_oil_fat_content=33.0,
                default_ph=5.2,
                default_respiration_rate=0.0,
                product_form="solid"
            ),
            Commodity(
                name="Roasted Whole Coffee Beans",
                category="dry goods",
                default_moisture_content=3.5,
                default_oil_fat_content=14.0,
                default_ph=5.0,
                default_respiration_rate=0.0,
                product_form="solid"
            ),
            Commodity(
                name="Fresh Baby Spinach & Greens",
                category="fresh produce",
                default_moisture_content=92.0,
                default_oil_fat_content=0.4,
                default_ph=6.5,
                default_respiration_rate=55.0,
                product_form="solid"
            ),
        ]
        db.add_all(commodities)

    # 3. Seed Packaging Materials & Sustainability Data
    if db.query(PackagingMaterial).count() == 0:
        materials_data = [
            {
                "mat": PackagingMaterial(
                    name="Micro-Perforated BOPP Film",
                    material_type="breathable film",
                    otr_range="10,000 - 15,000 cc/m²/day",
                    wvtr_range="15 - 25 g/m²/day",
                    thickness_range_microns="25 - 35 μm",
                    mechanical_strength_index=7.5,
                    sealability_rating="high",
                    gas_permeability_notes="Equilibrium modified atmosphere micro-laser apertures tailored for respiring fruits and vegetables.",
                    map_compatible=True,
                    cost_index=4.2,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=72.0,
                    carbon_footprint_index=2.2,
                    recyclability_notes="Mono-material Polypropylene stream (SPI Code 5). Readily curbside recyclable."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="EVOH Multilayer Barrier Laminate (PA/EVOH/PE)",
                    material_type="laminate",
                    otr_range="0.5 - 2.5 cc/m²/day",
                    wvtr_range="1.5 - 3.0 g/m²/day",
                    thickness_range_microns="65 - 100 μm",
                    mechanical_strength_index=9.5,
                    sealability_rating="high",
                    gas_permeability_notes="Ultra-high gas barrier core preventing oxygen ingress for fresh meat, poultry, and dairy preservation.",
                    map_compatible=True,
                    cost_index=7.8,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=48.0,
                    carbon_footprint_index=3.8,
                    recyclability_notes="Complex multilayer structure; requires specialized compatibilizer recycling facilities."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Metallized BOPP / LLDPE Laminate",
                    material_type="laminate",
                    otr_range="0.5 - 1.2 cc/m²/day",
                    wvtr_range="0.3 - 0.8 g/m²/day",
                    thickness_range_microns="55 - 75 μm",
                    mechanical_strength_index=8.0,
                    sealability_rating="high",
                    gas_permeability_notes="High optical opacity and moisture barrier; ideal for fried snacks, chips, and oil-rich goods.",
                    map_compatible=True,
                    cost_index=5.5,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=52.0,
                    carbon_footprint_index=3.1,
                    recyclability_notes="Vapor-deposited aluminum layer limits conventional mechanical recycling."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Polylactic Acid (PLA) Bio-Film",
                    material_type="biodegradable",
                    otr_range="400 - 800 cc/m²/day",
                    wvtr_range="18 - 30 g/m²/day",
                    thickness_range_microns="30 - 50 μm",
                    mechanical_strength_index=6.2,
                    sealability_rating="medium",
                    gas_permeability_notes="Derived from renewable plant starch (corn/sugarcane); composts in industrial facilities within 90 days.",
                    map_compatible=True,
                    cost_index=6.9,
                    is_recyclable=False,
                    is_biodegradable=True
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=94.0,
                    carbon_footprint_index=0.85,
                    recyclability_notes="Certified EN 13432 & ASTM D6400 industrial compostable."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Linear Low-Density Polyethylene (LLDPE)",
                    material_type="plastic",
                    otr_range="3,000 - 5,000 cc/m²/day",
                    wvtr_range="10 - 15 g/m²/day",
                    thickness_range_microns="40 - 80 μm",
                    mechanical_strength_index=8.8,
                    sealability_rating="high",
                    gas_permeability_notes="Superior puncture resistance and broad sealing temperature window; workhorse for frozen food.",
                    map_compatible=False,
                    cost_index=3.2,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=68.0,
                    carbon_footprint_index=1.9,
                    recyclability_notes="Category 4 LDPE stream. Widely reprocessed into post-consumer resin."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Aluminum Foil Co-Laminate (PET/ALU/PE)",
                    material_type="foil",
                    otr_range="< 0.05 cc/m²/day",
                    wvtr_range="< 0.05 g/m²/day",
                    thickness_range_microns="75 - 120 μm",
                    mechanical_strength_index=9.8,
                    sealability_rating="high",
                    gas_permeability_notes="Absolute hermetic barrier to all gases, light, UV, and moisture for sensitive coffee and dehydrated rations.",
                    map_compatible=True,
                    cost_index=8.5,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=36.0,
                    carbon_footprint_index=6.4,
                    recyclability_notes="Energy-intensive virgin bauxite smelting. High protective life saves net food waste."
                )
            }
        ]

        for item in materials_data:
            mat = item["mat"]
            sust = item["sust"]
            mat.sustainability_data = sust
            db.add(mat)

    db.commit()
    db.close()
    print("PackSmart database seeded successfully!")

if __name__ == "__main__":
    seed_database()
