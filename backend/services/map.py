from typing import Dict, Any
from ..schemas import MapAdvisorInput

def calculate_map_advisory(payload: MapAdvisorInput) -> Dict[str, Any]:
    comm = payload.commodity_name.lower()
    
    # Respiration categories
    resp = payload.respiration_rate_ml_co2_kg_hr or 20.0
    
    if "berry" in comm or "strawberry" in comm or "mushroom" in comm or resp > 40:
        target_o2 = 3.0
        target_co2 = 12.0
        target_n2 = 85.0
        micro_perf = "120 - 150 holes/m² (Laser micro-pores 40-50μm)"
        notes = "High-respiration produce requiring elevated CO₂ to suppress Botrytis cinerea (grey mold) while preventing anaerobic fermentation."
    elif "apple" in comm or "pear" in comm or resp < 10:
        target_o2 = 2.0
        target_co2 = 2.0
        target_n2 = 96.0
        micro_perf = "50 - 70 holes/m² (50μm diameter)"
        notes = "Low-respiration fruit sensitive to CO₂ injury. Low O₂ slows ethylene synthesis."
    elif "meat" in comm or "beef" in comm:
        target_o2 = 75.0
        target_co2 = 25.0
        target_n2 = 0.0
        micro_perf = "None (Impermeable Gas-Barrier Laminate)"
        notes = "High O₂ concentration binds to myoglobin maintaining cherry-red oxymyoglobin; 25% CO₂ inhibits aerobic psychrotrophic bacteria."
    elif "snack" in comm or "chip" in comm or "nut" in comm:
        target_o2 = 0.2
        target_co2 = 0.0
        target_n2 = 99.8
        micro_perf = "None (Hermetic Barrier Film)"
        notes = "Ultra-pure nitrogen purge to drive residual O₂ below 0.5% and prevent auto-oxidation of unsaturated fatty acids."
    else: # leafy greens / broccoli / standard produce
        target_o2 = 4.0
        target_co2 = 6.0
        target_n2 = 90.0
        micro_perf = "80 - 100 holes/m² (60μm laser vents)"
        notes = "Balanced equilibrium modified atmosphere packaging (EMAP) matching respiration rate to film transmission rate."

    gas_flush_liters = round((payload.packaging_volume_ml * 2.2) / 1000.0, 2)
    condensation_risk = "High" if (payload.storage_temp_c > 10 or "leafy" in comm) else "Moderate"

    return {
        "commodity": payload.commodity_name,
        "target_o2_percent": target_o2,
        "target_co2_percent": target_co2,
        "target_n2_percent": target_n2,
        "micro_perforation_density": micro_perf,
        "gas_flush_volume_liters": gas_flush_liters,
        "condensation_risk": condensation_risk,
        "advisory_notes": notes
    }
