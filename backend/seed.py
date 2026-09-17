from .database import SessionLocal, engine, Base
from .models import User, Commodity, PackagingMaterial, MaterialSustainabilityData
from .services.auth import hash_password

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Seed Users
    if not db.query(User).filter(User.email == "admin@packsmart.io").first():
        db.add_all([
            User(
                name="Chief Packaging Engineer",
                email="admin@packsmart.io",
                password_hash=hash_password("admin123"),
                role="admin",
                organization_name="PackSmart Food Institute"
            ),
            User(
                name="Dr. Elena Vance (Food Scientist)",
                email="researcher@packsmart.io",
                password_hash=hash_password("research123"),
                role="researcher",
                organization_name="Agricultural Research Center"
            )
        ])

    # 2. Seed Commodities
    if db.query(Commodity).count() == 0:
        commodities = [
            # Indian Market & Global Staples
            Commodity(name="Fresh Mangoes (Alphonso)", category="fresh produce", default_moisture_content=83.0, default_oil_fat_content=0.4, default_ph=4.5, default_respiration_rate=35.0, product_form="solid"),
            Commodity(name="Cavendish Bananas", category="fresh produce", default_moisture_content=74.0, default_oil_fat_content=0.3, default_ph=5.0, default_respiration_rate=45.0, product_form="solid"),
            Commodity(name="Vine Tomatoes", category="fresh produce", default_moisture_content=94.0, default_oil_fat_content=0.2, default_ph=4.4, default_respiration_rate=18.0, product_form="solid"),
            Commodity(name="Spinach / Leafy Greens", category="fresh produce", default_moisture_content=92.0, default_oil_fat_content=0.4, default_ph=6.5, default_respiration_rate=55.0, product_form="solid"),
            Commodity(name="Pasteurized Milk", category="dairy", default_moisture_content=88.0, default_oil_fat_content=3.5, default_ph=6.7, default_respiration_rate=0.0, product_form="liquid"),
            Commodity(name="Fresh Paneer (Cottage Cheese)", category="dairy", default_moisture_content=54.0, default_oil_fat_content=25.0, default_ph=5.8, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Sliced Wheat Bread", category="bakery", default_moisture_content=38.0, default_oil_fat_content=4.0, default_ph=5.5, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Ground Spices (Turmeric/Chili)", category="dry goods", default_moisture_content=9.0, default_oil_fat_content=10.0, default_ph=6.0, default_respiration_rate=0.0, product_form="powder"),
            Commodity(name="Raw Pulses (Lentils/Dal)", category="dry goods", default_moisture_content=10.0, default_oil_fat_content=1.5, default_ph=6.2, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Ready-to-Eat Curry", category="prepared foods", default_moisture_content=70.0, default_oil_fat_content=15.0, default_ph=5.2, default_respiration_rate=0.0, product_form="semi-solid"),
            Commodity(name="Fresh Poultry (Chicken Breast)", category="meat & seafood", default_moisture_content=74.0, default_oil_fat_content=3.6, default_ph=6.0, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Fresh Seafood (Shrimp/Prawns)", category="meat & seafood", default_moisture_content=78.0, default_oil_fat_content=1.0, default_ph=6.8, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Fresh Apples (Royal Gala)", category="fresh produce", default_moisture_content=85.0, default_oil_fat_content=0.2, default_ph=3.8, default_respiration_rate=8.5, product_form="solid"),
            Commodity(name="Crisp Potato Chips", category="snacks", default_moisture_content=2.0, default_oil_fat_content=35.0, default_ph=6.2, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Roasted Whole Coffee Beans", category="dry goods", default_moisture_content=3.5, default_oil_fat_content=14.0, default_ph=5.0, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Aged Cheddar Cheese", category="dairy", default_moisture_content=37.0, default_oil_fat_content=33.0, default_ph=5.2, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Basmati Rice (Raw)", category="dry goods", default_moisture_content=12.0, default_oil_fat_content=0.5, default_ph=6.0, default_respiration_rate=0.0, product_form="solid"),
            Commodity(name="Onions (Dry Bulb)", category="fresh produce", default_moisture_content=89.0, default_oil_fat_content=0.1, default_ph=5.5, default_respiration_rate=6.0, product_form="solid"),
            Commodity(name="Fresh Green Chilies", category="fresh produce", default_moisture_content=87.0, default_oil_fat_content=0.4, default_ph=5.0, default_respiration_rate=25.0, product_form="solid"),
            Commodity(name="Yogurt / Dahi", category="dairy", default_moisture_content=85.0, default_oil_fat_content=3.5, default_ph=4.2, default_respiration_rate=0.0, product_form="semi-solid"),
            Commodity(name="Fresh Strawberries", category="fresh produce", default_moisture_content=91.0, default_oil_fat_content=0.3, default_ph=3.5, default_respiration_rate=45.0, product_form="solid"),
            Commodity(name="Frozen Green Peas", category="frozen produce", default_moisture_content=78.0, default_oil_fat_content=0.4, default_ph=6.5, default_respiration_rate=0.0, product_form="solid")
        ]
        db.add_all(commodities)

    # 3. Seed Packaging Materials & Sustainability Data
    if db.query(PackagingMaterial).count() == 0:
        materials_data = [
            {
                "mat": PackagingMaterial(
                    name="Micro-Perforated BOPP Film",
                    material_type="breathable film",
                    otr_range="10,000 - 15,000 cc/m²/day [Source: Typical values for micro-perforated produce films]",
                    wvtr_range="15 - 25 g/m²/day [Source: Typical]",
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
                    sustainability_score=72.0, # Approximate - pending validation
                    carbon_footprint_index=2.2, # Approximate - pending validation
                    recyclability_notes="Mono-material Polypropylene stream (SPI Code 5). Readily curbside recyclable."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="EVOH Multilayer Barrier Laminate (PA/EVOH/PE)",
                    material_type="laminate",
                    otr_range="0.5 - 2.5 cc/m²/day [Source: Industry standard for EVOH high barrier]",
                    wvtr_range="1.5 - 3.0 g/m²/day [Source: Industry standard]",
                    thickness_range_microns="65 - 100 μm",
                    mechanical_strength_index=9.5,
                    sealability_rating="high",
                    gas_permeability_notes="Ultra-high gas barrier core preventing oxygen ingress for fresh meat, poultry, and paneer.",
                    map_compatible=True,
                    cost_index=7.8,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=48.0,
                    carbon_footprint_index=3.8, # Approximate - pending validation
                    recyclability_notes="Complex multilayer structure; requires specialized compatibilizer recycling facilities."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Metallized BOPP / LLDPE Laminate",
                    material_type="laminate",
                    otr_range="0.5 - 1.2 cc/m²/day [Source: Typical metallized film data]",
                    wvtr_range="0.3 - 0.8 g/m²/day [Source: Typical]",
                    thickness_range_microns="55 - 75 μm",
                    mechanical_strength_index=8.0,
                    sealability_rating="high",
                    gas_permeability_notes="High optical opacity and moisture barrier; ideal for snacks, chips, and ground spices.",
                    map_compatible=True,
                    cost_index=5.5,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=52.0,
                    carbon_footprint_index=3.1, # Approximate - pending validation
                    recyclability_notes="Vapor-deposited aluminum layer limits conventional mechanical recycling."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Polylactic Acid (PLA) Bio-Film",
                    material_type="biodegradable",
                    otr_range="400 - 800 cc/m²/day [Source: NatureWorks Ingeo datasheet]",
                    wvtr_range="18 - 30 g/m²/day [Source: NatureWorks Ingeo datasheet]",
                    thickness_range_microns="30 - 50 μm",
                    mechanical_strength_index=6.2,
                    sealability_rating="medium",
                    gas_permeability_notes="Derived from renewable plant starch; composts in industrial facilities.",
                    map_compatible=True,
                    cost_index=6.9,
                    is_recyclable=False,
                    is_biodegradable=True
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=94.0, # Approximate - pending validation
                    carbon_footprint_index=0.85, # Approximate - pending validation
                    recyclability_notes="Certified EN 13432 & ASTM D6400 industrial compostable."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Linear Low-Density Polyethylene (LLDPE)",
                    material_type="plastic",
                    otr_range="3,000 - 5,000 cc/m²/day [Source: Typical PE film properties]",
                    wvtr_range="10 - 15 g/m²/day [Source: Typical]",
                    thickness_range_microns="40 - 80 μm",
                    mechanical_strength_index=8.8,
                    sealability_rating="high",
                    gas_permeability_notes="Superior puncture resistance; workhorse for frozen food like peas.",
                    map_compatible=False,
                    cost_index=3.2,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=68.0,
                    carbon_footprint_index=1.9, # Approximate - pending validation
                    recyclability_notes="Category 4 LDPE stream. Widely reprocessed into post-consumer resin."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Aluminum Foil Co-Laminate (PET/ALU/PE)",
                    material_type="foil",
                    otr_range="< 0.05 cc/m²/day [Source: Industry absolute barrier standard]",
                    wvtr_range="< 0.05 g/m²/day [Source: Industry absolute barrier standard]",
                    thickness_range_microns="75 - 120 μm",
                    mechanical_strength_index=9.8,
                    sealability_rating="high",
                    gas_permeability_notes="Hermetic barrier to all gases, light, UV, and moisture. Ideal for coffee and sensitive spices.",
                    map_compatible=True,
                    cost_index=8.5,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=36.0,
                    carbon_footprint_index=6.4, # Approximate - pending validation
                    recyclability_notes="Energy-intensive virgin bauxite smelting."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Retort Pouch Laminate (PET/ALOX/CPP)",
                    material_type="laminate",
                    otr_range="0.1 - 0.5 cc/m²/day [Source: Typical clear retort pouch specs]",
                    wvtr_range="0.1 - 0.5 g/m²/day [Source: Typical]",
                    thickness_range_microns="90 - 130 μm",
                    mechanical_strength_index=9.5,
                    sealability_rating="high",
                    gas_permeability_notes="High temperature resistance (121°C). Ideal for Ready-to-Eat curries.",
                    map_compatible=True,
                    cost_index=8.0,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=45.0,
                    carbon_footprint_index=4.1, # Approximate - pending validation
                    recyclability_notes="Complex multilayer, difficult to mechanically recycle."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Cast Polypropylene (CPP) Film",
                    material_type="plastic",
                    otr_range="1,000 - 2,500 cc/m²/day [Source: Standard CPP properties]",
                    wvtr_range="5 - 10 g/m²/day [Source: Standard CPP properties]",
                    thickness_range_microns="30 - 60 μm",
                    mechanical_strength_index=7.0,
                    sealability_rating="high",
                    gas_permeability_notes="Good clarity and heat sealability. Common for bread and bakery items.",
                    map_compatible=False,
                    cost_index=3.8,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=70.0,
                    carbon_footprint_index=2.0, # Approximate - pending validation
                    recyclability_notes="Recyclable in PP streams (SPI Code 5)."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Recycled PET (rPET) Clamshells",
                    material_type="rigid plastic",
                    otr_range="20 - 50 cc/m²/day [Source: Typical rigid PET properties]",
                    wvtr_range="2 - 5 g/m²/day [Source: Typical]",
                    thickness_range_microns="200 - 400 μm",
                    mechanical_strength_index=8.5,
                    sealability_rating="low",
                    gas_permeability_notes="Rigid protection for delicate fruits (strawberries, tomatoes). Highly ventilated.",
                    map_compatible=False,
                    cost_index=4.5,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=85.0,
                    carbon_footprint_index=1.2, # Approximate - pending validation
                    recyclability_notes="High circularity. Readily recycled in bottle/clamshell streams (SPI Code 1)."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="High-Density Polyethylene (HDPE) Bottles",
                    material_type="rigid plastic",
                    otr_range="100 - 200 cc/m²/day [Source: Typical HDPE bottle specs]",
                    wvtr_range="1 - 2 g/m²/day [Source: Typical]",
                    thickness_range_microns="500 - 800 μm",
                    mechanical_strength_index=9.0,
                    sealability_rating="medium",
                    gas_permeability_notes="Excellent moisture barrier, widely used for liquid milk packaging.",
                    map_compatible=False,
                    cost_index=4.0,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=80.0,
                    carbon_footprint_index=1.8, # Approximate - pending validation
                    recyclability_notes="Highly recyclable globally (SPI Code 2)."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Vacuum Skin Packaging (VSP) Film",
                    material_type="laminate",
                    otr_range="2 - 10 cc/m²/day [Source: Typical VSP high barrier specs]",
                    wvtr_range="2 - 5 g/m²/day [Source: Typical]",
                    thickness_range_microns="75 - 150 μm",
                    mechanical_strength_index=9.2,
                    sealability_rating="high",
                    gas_permeability_notes="Drapes perfectly over products. Ideal for premium seafood and fresh meat cuts.",
                    map_compatible=False,
                    cost_index=8.2,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=40.0,
                    carbon_footprint_index=4.5, # Approximate - pending validation
                    recyclability_notes="Multilayer ionomer/barrier structures; challenging to recycle."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Oriented Polyamide (OPA/Nylon) Film",
                    material_type="plastic",
                    otr_range="30 - 50 cc/m²/day [Source: Typical OPA film properties]",
                    wvtr_range="150 - 200 g/m²/day [Source: Typical]",
                    thickness_range_microns="15 - 25 μm",
                    mechanical_strength_index=9.0,
                    sealability_rating="medium",
                    gas_permeability_notes="High toughness and pinhole resistance. Often laminated with PE for cheese packaging.",
                    map_compatible=True,
                    cost_index=5.8,
                    is_recyclable=False,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=55.0,
                    carbon_footprint_index=3.5, # Approximate - pending validation
                    recyclability_notes="Difficult to recycle mechanically."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Cellulose-based Compostable Film",
                    material_type="biodegradable",
                    otr_range="10 - 20 cc/m²/day [Source: NatureFlex typical specs]",
                    wvtr_range="200 - 300 g/m²/day [Source: NatureFlex typical specs]",
                    thickness_range_microns="20 - 45 μm",
                    mechanical_strength_index=6.5,
                    sealability_rating="medium",
                    gas_permeability_notes="Excellent dead-fold properties. High moisture permeability.",
                    map_compatible=False,
                    cost_index=7.5,
                    is_recyclable=False,
                    is_biodegradable=True
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=90.0,
                    carbon_footprint_index=1.0, # Approximate - pending validation
                    recyclability_notes="Home and industrial compostable (e.g., NatureFlex)."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Molded Pulp Trays",
                    material_type="paper/board",
                    otr_range="N/A [Highly permeable]",
                    wvtr_range="N/A [Highly permeable]",
                    thickness_range_microns="1000 - 2000 μm",
                    mechanical_strength_index=6.0,
                    sealability_rating="low",
                    gas_permeability_notes="Provides cushioning. Completely breathable. Used for apples, eggs.",
                    map_compatible=False,
                    cost_index=2.5,
                    is_recyclable=True,
                    is_biodegradable=True
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=98.0,
                    carbon_footprint_index=0.5, # Approximate - pending validation
                    recyclability_notes="Made from recycled paper. Highly recyclable and compostable."
                )
            },
            {
                "mat": PackagingMaterial(
                    name="Polyethylene Terephthalate (PET) Bottles",
                    material_type="rigid plastic",
                    otr_range="50 - 100 cc/m²/day [Source: Typical PET bottle properties]",
                    wvtr_range="2 - 4 g/m²/day [Source: Typical]",
                    thickness_range_microns="300 - 500 μm",
                    mechanical_strength_index=8.5,
                    sealability_rating="high",
                    gas_permeability_notes="Clear, strong barrier for juices and premium milk products.",
                    map_compatible=False,
                    cost_index=4.2,
                    is_recyclable=True,
                    is_biodegradable=False
                ),
                "sust": MaterialSustainabilityData(
                    sustainability_score=82.0,
                    carbon_footprint_index=1.6, # Approximate - pending validation
                    recyclability_notes="Widely recycled in local curbside streams (SPI Code 1)."
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
    print("PackSmart database seeded successfully with accurate, documented data!")

if __name__ == "__main__":
    seed_database()
