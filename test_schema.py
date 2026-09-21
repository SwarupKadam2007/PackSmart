from backend.schemas import RecommendationResponse, RankedMaterial
from datetime import datetime
import json

demo_data={
    'commodity': 'Alphonso Mango', 
    'primary_material': 'Micro-Perforated BOPP', 
    'target_otr': '6,000 - 10,000', 
    'target_wvtr': '15 - 20', 
    'thickness': '30 - 45', 
    'sealability': 'Hermetic Heat Seal', 
    'map_required': 'Equilibrium MAP (3-5% O2, 5-8% CO2)', 
    'eco_alternative': 'PLA Micro-Perforated Bio-Film', 
    'shelf_life_days': 14.0, 
    'recommended_format': 'Micro-Perforated Produce Pouch', 
    'format_id': 'micro-perf-bag', 
    'explanation_text': 'Alphonso mangoes are highly respirative...', 
    'demo_scenario_comparison': 'Compared to standard...', 
    'short_shelf_life_note': 'For long-distance...', 
    'is_demo': True, 
    'recommendation_id': 'demo-1234', 
    'created_at': datetime.utcnow(), 
    'ranked_materials': [{
        'material_id': 'demo-mat-1', 
        'name': 'Micro-Perforated BOPP', 
        'material_type': 'Demo Material', 
        'rank': 1, 
        'confidence_score': 0.99, 
        'recommended_thickness': '30 - 45', 
        'recommended_otr': '6,000 - 10,000', 
        'recommended_wvtr': '15 - 20', 
        'sealability': 'Hermetic Heat Seal', 
        'map_required': 'Equilibrium MAP (3-5% O2, 5-8% CO2)', 
        'eco_alternative': 'PLA Micro-Perforated Bio-Film', 
        'explanation': 'Alphonso mangoes are highly respirative...', 
        'cost_index': 5.0, 
        'sustainability_score': 75.0, 
        'source_reference': 'Verified Demo Data', 
        'cost_estimate_local': None, 
        'supplier_channel_note': None
    }]
}

try:
    print(RecommendationResponse(**demo_data))
    print("VALID!")
except Exception as e:
    print(e)
