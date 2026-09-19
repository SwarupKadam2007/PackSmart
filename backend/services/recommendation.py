import numpy as np
from sqlalchemy.orm import Session
from ..models import PackagingMaterial, Commodity, Recommendation, RecommendationMaterial, MapAdvisory
from ..schemas import RecommendationInput
import uuid
from datetime import datetime

# NOTE: This registry must be kept in sync with the frontend copy in frontend/src/api/client.js
DEMO_SIMULATION_REGISTRY = {
    "mango": {
        "commodity": "Alphonso Mango",
        "primary_material": "Micro-Perforated BOPP",
        "target_otr": "6,000 - 10,000",
        "target_wvtr": "15 - 20",
        "thickness": "30 - 45",
        "sealability": "Hermetic Heat Seal",
        "map_required": "Equilibrium MAP (3-5% O2, 5-8% CO2)",
        "eco_alternative": "PLA Micro-Perforated Bio-Film",
        "shelf_life_days": 14.0,
        "recommended_format": "Micro-Perforated Produce Pouch",
        "format_id": "micro-perf-bag",
        "explanation_text": "Alphonso mangoes are highly respirative and susceptible to chilling injury. Micro-perforated BOPP creates an Equilibrium Modified Atmosphere (EMAP), preventing anaerobic fermentation and extending shelf life.",
        "demo_scenario_comparison": "Compared to standard airtight bags where mangoes would ferment in 3 days, this format safely supports 14 days export shelf life.",
        "short_shelf_life_note": "For long-distance sea freight, consider integrating ethylene absorbers.",
        "is_demo": True
    },
    "bread": {
        "commodity": "Sourdough Bread",
        "primary_material": "Breathable Kraft Laminate",
        "target_otr": "8,000 - 12,000",
        "target_wvtr": "25 - 35",
        "thickness": "40 - 60",
        "sealability": "Fin Seal with Micro-Vents",
        "map_required": "Optional: N2 flush for crust preservation",
        "eco_alternative": "Unbleached Perforated Kraft Paper",
        "shelf_life_days": 7.0,
        "recommended_format": "Flow Wrap / Pillow Pouch",
        "format_id": "flow-wrap",
        "explanation_text": "High moisture content in freshly baked bread causes condensation in impermeable plastic, accelerating mold sporulation. Breathable laminates release water vapor while maintaining a hygienic barrier.",
        "demo_scenario_comparison": "Without breathability, sourdough develops mold within 3 days. With this solution, crust remains crisp and mold is delayed up to 7 days.",
        "short_shelf_life_note": "Consider natural calcium propionate or cultured dextrose to extend mold-free shelf life. Check the Preservatives Guide.",
        "is_demo": True
    },
    "paneer": {
        "commodity": "Fresh Paneer",
        "primary_material": "Co-extruded EVOH / PA / PE",
        "target_otr": "< 2.0",
        "target_wvtr": "< 2.0",
        "thickness": "80 - 100",
        "sealability": "Critical Vacuum / Skin Pack Seal",
        "map_required": "Mandatory: 30% CO2 / 70% N2",
        "eco_alternative": "Recyclable Monomaterial PP High-Barrier",
        "shelf_life_days": 30.0,
        "recommended_format": "Vacuum Pack / Skin Pack",
        "format_id": "vacuum-pack",
        "explanation_text": "Paneer is highly prone to bacterial spoilage. A high-barrier EVOH structure combined with a CO2-enriched MAP effectively halts aerobic microbial growth and extends shelf life to 30 days.",
        "demo_scenario_comparison": "In a standard LDPE pouch, paneer spoils in 5 days. With high-barrier MAP, it lasts 30 days under refrigeration.",
        "short_shelf_life_note": None,
        "is_demo": True
    },
    "chips": {
        "commodity": "Potato Chips",
        "primary_material": "BOPP / Metallized CPP",
        "target_otr": "< 1.0",
        "target_wvtr": "< 0.5",
        "thickness": "60 - 80",
        "sealability": "Gas-Tight Barrier Fin Seal",
        "map_required": "Mandatory: 99.5% N2 Flush",
        "eco_alternative": "High-Barrier Cellulose Film",
        "shelf_life_days": 180.0,
        "recommended_format": "Flow Wrap / Pillow Pouch",
        "format_id": "flow-wrap",
        "explanation_text": "High fat content requires strict protection from light and oxygen to prevent lipid oxidation and rancidity. The metallized layer provides an excellent light and oxygen barrier.",
        "demo_scenario_comparison": "Without nitrogen flushing, chips go stale and rancid in weeks. This format secures 6 months ambient shelf life.",
        "short_shelf_life_note": None,
        "is_demo": True
    },
    "pickle": {
        "commodity": "Mango Pickle",
        "primary_material": "PET / Alu-Foil / CPP Laminate",
        "target_otr": "< 0.5",
        "target_wvtr": "< 0.5",
        "thickness": "100 - 120",
        "sealability": "Corrosion-Resistant Heat Seal",
        "map_required": "Not Required",
        "eco_alternative": "Glass Jar with Tinplate Lug Cap",
        "shelf_life_days": 365.0,
        "recommended_format": "Stand-up Pouch (Doypack)",
        "format_id": "stand-up-pouch",
        "explanation_text": "Highly acidic (pH < 4.0) and high oil/salt content makes pickle self-preserving but highly corrosive. An aluminum foil layer is crucial for a 1-year ambient shelf life, protecting against light and acid degradation.",
        "demo_scenario_comparison": "A standard plastic pouch would degrade and leak oil. The foil laminate ensures a leak-proof, 1-year shelf life.",
        "short_shelf_life_note": None,
        "is_demo": True
    }
}
# ML scoring weights for packaging selection
WEIGHT_BARRIER_OTR = 0.30
WEIGHT_BARRIER_WVTR = 0.25
WEIGHT_STRENGTH = 0.15
WEIGHT_MAP_COMPATIBILITY = 0.15
WEIGHT_COST_EFFICIENCY = 0.15

def run_recommendation_engine(db: Session, payload: RecommendationInput, user_id: str = None):
    # 1. Normalize/validate input
    commodity_query = None
    if payload.commodity_id:
        commodity_query = db.query(Commodity).filter(Commodity.commodity_id == payload.commodity_id).first()
    
    if not commodity_query and payload.commodity_name:
        commodity_query = db.query(Commodity).filter(Commodity.name.ilike(f"%{payload.commodity_name}%")).first()

    # Determine commodity profile
    comm_name = commodity_query.name if commodity_query else (payload.commodity_name or "Fresh Produce")
    comm_cat = commodity_query.category.lower() if commodity_query else payload.commodity_name.lower()

    # Graceful fallback for missing parameters using DB defaults or category estimates
    final_moisture = payload.moisture_content if payload.moisture_content is not None else (commodity_query.default_moisture_content if commodity_query else 50.0)
    final_oil_fat = payload.oil_fat_content if payload.oil_fat_content is not None else (commodity_query.default_oil_fat_content if commodity_query else 5.0)
    final_ph = payload.ph_level if payload.ph_level is not None else (commodity_query.default_ph if commodity_query else 6.0)
    final_respiration = payload.respiration_rate if payload.respiration_rate is not None else (commodity_query.default_respiration_rate if commodity_query and commodity_query.default_respiration_rate else 15.0)

    # Demo mode handling
    if getattr(payload, 'demo_mode', False) and getattr(payload, 'demo_commodity', None) in DEMO_SIMULATION_REGISTRY:
        demo_data = dict(DEMO_SIMULATION_REGISTRY[payload.demo_commodity])
        demo_data["recommendation_id"] = f"demo-{uuid.uuid4().hex[:8]}"
        demo_data["ranked_materials"] = [{
            "material_id": "demo-mat-1",
            "name": demo_data["primary_material"],
            "material_type": "Demo Material",
            "rank": 1,
            "confidence_score": 0.99,
            "recommended_thickness": demo_data["thickness"],
            "recommended_otr": demo_data["target_otr"],
            "recommended_wvtr": demo_data["target_wvtr"],
            "sealability": demo_data["sealability"],
            "map_required": demo_data["map_required"],
            "eco_alternative": demo_data["eco_alternative"],
            "explanation": demo_data["explanation_text"],
            "cost_index": 5.0,
            "sustainability_score": 75.0,
            "source_reference": "Verified Demo Data",
            "cost_estimate_local": None,
            "supplier_channel_note": None
        }]
        demo_data["created_at"] = datetime.utcnow()
        return demo_data

    is_fresh = "produce" in comm_cat or "fresh" in comm_cat or "fruit" in comm_cat or "vegetable" in comm_cat or payload.commodity_name == "freshProduce"
    is_dry = "dry" in comm_cat or "powder" in comm_cat or "grain" in comm_cat or payload.commodity_name == "dryGoods"
    is_snack = "snack" in comm_cat or "fried" in comm_cat or "chip" in comm_cat or payload.commodity_name == "snacks"
    is_meat = "meat" in comm_cat or "seafood" in comm_cat or "poultry" in comm_cat or payload.commodity_name == "meatPoultry"
    is_dairy = "dairy" in comm_cat or "cheese" in comm_cat or payload.commodity_name == "dairy"
    is_bakery = "bakery" in comm_cat or "bread" in comm_cat or "sourdough" in comm_cat or "pastry" in comm_cat or payload.commodity_name == "bakery"
    is_rte = "curry" in comm_cat or "ready-to-eat" in comm_cat or "prepared" in comm_cat

    # Target barrier metrics & packaging formats based on commodity science
    if is_bakery:
        # Teaching rationale: For bread (e.g. 35% moisture), fully sealed impermeable plastic causes condensation and rapid mold sporulation!
        target_otr_num = 8000.0
        target_wvtr_num = 20.0
        base_thickness = 35.0
        sealability = "Breathable Pouch / Heat Seal with Micro-Vents"
        map_required = "Recommended: Micro-perforated breathable pouch for crusty bread, or 70% CO₂ / 30% N₂ in barrier pouches with oxygen absorber for sandwich bread"
        eco_alt = "Unbleached Micro-Perforated Kraft Paper with Clear PLA Window"
        primary_material = "Micro-Perforated BOPP / Breathable Kraft Film"
        target_otr_str = "6,000 - 10,000"
        target_wvtr_str = "15 - 25"
        thickness_str = "30 - 45"
        rec_format = "Micro-Perforated Produce & Bakery Bag"
        rec_format_id = "micro-perf-bag"
    elif is_fresh:
        target_otr_num = 12000.0  # Needs gas exchange to prevent anaerobic fermentation
        target_wvtr_num = 18.0
        base_thickness = 30.0
        sealability = "High (Hermetic Heat Seal)"
        map_required = "Recommended: 3-5% O₂, 5-8% CO₂, Bal N₂ to prevent browning and slow senescence"
        eco_alt = "PLA Micro-Perforated Bio-Film (EN 13432 Certified Compostable)"
        primary_material = "Micro-Perforated Biaxially-Oriented Polypropylene (BOPP / LDPE)"
        target_otr_str = "10,000 - 15,000"
        target_wvtr_str = "15 - 20"
        thickness_str = "25 - 40"
        rec_format = "Micro-Perforated Produce Bag / Clamshell"
        rec_format_id = "micro-perf-bag"
    elif is_dry:
        target_otr_num = 5.0
        target_wvtr_num = 1.0
        base_thickness = 60.0
        sealability = "Medium (Acoustic or Ultrasonic Seal)"
        map_required = "Optional: Nitrogen flushing recommended to prevent lipid oxidation"
        eco_alt = "Water-barrier Coated Kraft Paper Laminate"
        primary_material = "Metallized Polyester / Linear Low-Density Polyethylene (MET-PET / LLDPE)"
        target_otr_str = "< 10"
        target_wvtr_str = "< 1.5"
        thickness_str = "50 - 70"
        rec_format = "Stand-up Pouch (Doypack)"
        rec_format_id = "stand-up-pouch"
    elif is_snack:
        target_otr_num = 1.0
        target_wvtr_num = 0.5
        base_thickness = 70.0
        sealability = "High (Gas-Tight Barrier Fin Seal)"
        map_required = "Mandatory: 99.5% N₂ flush to protect crispness and curb rancidity"
        eco_alt = "Alu-free High-Barrier Cellulose Film"
        primary_material = "BOPP / Metallized Cast Polypropylene (BOPP/M-CPP)"
        target_otr_str = "< 1.0"
        target_wvtr_str = "< 0.8"
        thickness_str = "60 - 80"
        rec_format = "Flow Wrap / Pillow Pouch"
        rec_format_id = "flow-wrap"
    elif is_meat:
        target_otr_num = 2.0
        target_wvtr_num = 2.0
        base_thickness = 85.0
        sealability = "Critical (Vacuum & Cryovac Hermetic Seal)"
        map_required = "Mandatory: High O₂ MAP (70-80% O₂ / 20-30% CO₂) to sustain red myoglobin color"
        eco_alt = "Bio-based Polyamide Co-extruded Multilayer"
        primary_material = "Co-extruded EVOH / Polyamide / Polyethylene (PA/EVOH/PE)"
        target_otr_str = "< 3.0"
        target_wvtr_str = "< 3.0"
        thickness_str = "70 - 100"
        rec_format = "Vacuum Pack / Skin Pack"
        rec_format_id = "vacuum-pack"
    elif is_rte:
        target_otr_num = 0.5
        target_wvtr_num = 0.5
        base_thickness = 100.0
        sealability = "Hermetic Retort Heat Seal (>121°C Autoclave Stable)"
        map_required = "Hermetic vacuum thermal processing (Retort sterilization)"
        eco_alt = "High-Barrier Polyolefin Recyclable Retort Pouch"
        primary_material = "PET / Al-Foil / BOPA / Cast Polypropylene Retort Laminate"
        target_otr_str = "< 0.5"
        target_wvtr_str = "< 0.5"
        thickness_str = "90 - 120"
        rec_format = "Retort Pouch"
        rec_format_id = "retort-pouch"
    else: # dairy / default
        target_otr_num = 2.0
        target_wvtr_num = 2.0
        base_thickness = 70.0
        sealability = "High (Peelable Hermetic Seal)"
        map_required = "Recommended: 30% CO₂ / 70% N₂ for mold prevention"
        eco_alt = "Recyclable Monomaterial PP High-Barrier Pouch"
        primary_material = "PVDC-coated PET / LLDPE Co-polymer"
        target_otr_str = "< 2.0"
        target_wvtr_str = "< 2.0"
        thickness_str = "60 - 90"
        rec_format = "Tray + Lidding Film"
        rec_format_id = "tray-lidding"

    # Adjust for storage conditions
    if payload.storage_type == "frozen":
        base_thickness += 20.0
        thickness_str = f"{int(base_thickness - 10)} - {int(base_thickness + 15)}"
        primary_material += " [Cold-Fracture Resistant Modifiers]"
    if payload.transport_conditions == "rough":
        base_thickness += 15.0
        sealability += " with Reinforced Gusset Corners"

    # 3. Fetch candidate materials from DB
    candidates = db.query(PackagingMaterial).all()
    
    # 4. ML / Multi-Criteria Scoring Model
    scored_materials = []
    for mat in candidates:
        # Rule-based filter
        if payload.storage_type == "frozen" and mat.mechanical_strength_index < 6.0:
            continue
        if is_fresh and not mat.map_compatible:
            continue

        # Score computation based on feature vectors
        score = 0.50 # base
        
        # Match type
        if is_fresh and ("breathable" in mat.material_type.lower() or "bopp" in mat.name.lower() or "ldpe" in mat.name.lower()):
            score += 0.35
        elif (is_snack or is_dry) and ("laminate" in mat.material_type.lower() or "metal" in mat.name.lower() or "foil" in mat.material_type.lower()):
            score += 0.35
        elif is_meat and ("evoh" in mat.name.lower() or "polyamide" in mat.name.lower() or "barrier" in mat.name.lower()):
            score += 0.38
        else:
            score += 0.15

        # Strength contribution
        score += (mat.mechanical_strength_index / 10.0) * 0.10
        # Cost factor: lower cost index gives slight boost
        score += ((10.0 - mat.cost_index) / 10.0) * 0.05

        confidence = round(min(0.98, max(0.65, score)), 2)
        
        s_score = 65.0
        if mat.sustainability_data:
            s_score = mat.sustainability_data.sustainability_score

        scored_materials.append({
            "material_id": mat.material_id,
            "name": mat.name,
            "material_type": mat.material_type,
            "confidence_score": confidence,
            "recommended_thickness": thickness_str,
            "recommended_otr": target_otr_str,
            "recommended_wvtr": target_wvtr_str,
            "sealability": sealability,
            "map_required": map_required,
            "eco_alternative": eco_alt,
            "cost_index": mat.cost_index,
            "cost_estimate_local": mat.cost_estimate_local,
            "supplier_channel_note": mat.supplier_channel_note,
            "sustainability_score": s_score,
            "source_reference": mat.source_reference,
            "explanation": f"Validated for {comm_name} with {target_otr_str} OTR barrier and {sealability}."
        })

    # Sort and rank materials by confidence score
    scored_materials.sort(key=lambda x: x["confidence_score"], reverse=True)
    for idx, item in enumerate(scored_materials):
        item["rank"] = idx + 1

    # 5. Persist recommendation in DB
    rec_obj = Recommendation(
        user_id=user_id,
        commodity_id=commodity_query.commodity_id if commodity_query else None,
        commodity_name=comm_name,
        input_moisture_content=final_moisture,
        input_oil_fat_content=final_oil_fat,
        input_ph=final_ph,
        input_respiration_rate=final_respiration,
        desired_shelf_life_days=payload.desired_shelf_life or 14,
        storage_type=payload.storage_type or "chilled",
        storage_temperature=payload.storage_temp or 4.0,
        relative_humidity=payload.relative_humidity or 85.0,
        transport_mode=payload.transport_conditions or "smooth"
    )
    db.add(rec_obj)
    db.flush()

    # Link top candidate materials
    for item in scored_materials[:5]:
        rec_mat = RecommendationMaterial(
            recommendation_id=rec_obj.recommendation_id,
            material_id=item["material_id"],
            rank=item["rank"],
            confidence_score=item["confidence_score"],
            recommended_thickness_microns=base_thickness,
            recommended_otr=target_otr_num,
            recommended_wvtr=target_wvtr_num,
            explanation_text=item["explanation"],
            source_reference=item["source_reference"]
        )
        db.add(rec_mat)

    # 6. If fresh commodity, trigger MAP Advisory sub-routine
    map_details = None
    if is_fresh:
        map_advisory = MapAdvisory(
            recommendation_id=rec_obj.recommendation_id,
            recommended_o2_percent=4.0,
            recommended_co2_percent=6.0,
            recommended_n2_percent=90.0,
            micro_perforation_density="85 holes/m² (60μm laser micro-vents)"
        )
        db.add(map_advisory)
        map_details = {
            "o2_percent": 4.0,
            "co2_percent": 6.0,
            "n2_percent": 90.0,
            "micro_perforations": "85 holes/m² (60μm laser micro-vents)"
        }

    db.commit()

    short_shelf_life_note = None
    desired_days = payload.desired_shelf_life or 14
    if desired_days <= 7 or (is_bakery and payload.storage_type == "ambient"):
        short_shelf_life_note = (
            f"Target shelf-life is {desired_days} days. "
            "For ambient bakery and short-cycle goods, consider exploring natural antimicrobials "
            "(e.g. cultured dextrose, rosemary extract, potassium sorbate) in the Preservatives & Additives Guide "
            "to inhibit mold and extend stability safely."
        )

    return {
        "recommendation_id": rec_obj.recommendation_id,
        "commodity": comm_name,
        "primary_material": scored_materials[0]["name"] if scored_materials else primary_material,
        "target_otr": target_otr_str,
        "target_wvtr": target_wvtr_str,
        "thickness": thickness_str,
        "sealability": sealability,
        "map_required": map_required,
        "eco_alternative": eco_alt,
        "shelf_life_days": float(desired_days),
        "ranked_materials": scored_materials[:5],
        "map_advisory": map_details,
        "recommended_format": rec_format,
        "format_id": rec_format_id,
        "short_shelf_life_note": short_shelf_life_note,
        "created_at": rec_obj.created_at,
        "is_demo": False
    }
