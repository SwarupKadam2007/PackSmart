import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Droplets, 
  Wind, 
  Thermometer, 
  Box, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Star, 
  Layers, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ENGINE_TRANSLATIONS } from '../data/engineI18n';
import { api } from '../api/client';
import { useSearchParams, Link } from 'react-router-dom';

export default function GetRecommendation({ lang }) {
  const t = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS.en;
  const [searchParams] = useSearchParams();
  
  // Multi-step state
  const [step, setStep] = useState(1);
  const [demoBanner, setDemoBanner] = useState(null);

  // Input States
  const [inputs, setInputs] = useState({
    commodityType: searchParams.get('commodityType') || 'freshProduce',
    moistureContent: 'high',
    oilFatContent: 'low',
    pHLevel: 'neutral',
    respirationRate: 'high',
    desiredShelfLife: 14,
    storageTemp: 4,
    relativeHumidity: 85,
    storageType: 'chilled',
    transportConditions: 'smooth'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [rating, setRating] = useState(0);

  // Auto-fill and execute on guided demo preset
  useEffect(() => {
    const demo = searchParams.get('demo');
    const demoMode = searchParams.get('demo_mode') === 'true';

    if (demo === 'mango') {
      const mangoInputs = {
        commodityType: 'freshProduce',
        moistureContent: 'high',
        oilFatContent: 'low',
        pHLevel: 'neutral',
        respirationRate: 'high',
        desiredShelfLife: 14,
        storageTemp: 12,
        relativeHumidity: 85,
        storageType: 'chilled',
        transportConditions: 'smooth'
      };
      setInputs(mangoInputs);
      setDemoBanner({
        title: "Demo Simulation Active: Fresh Alphonso Mango Export (14 Days)",
        desc: "Demonstrating Equilibrium MAP with Micro-Perforated BOPP to prevent anaerobic fermentation."
      });
      if (demoMode) {
        executeSimulation(mangoInputs);
      }
    } else if (demo === 'bread') {
      const breadInputs = {
        commodityType: 'bakery',
        moistureContent: 'high',
        oilFatContent: 'low',
        pHLevel: 'neutral',
        respirationRate: 'low',
        desiredShelfLife: 7,
        storageTemp: 22,
        relativeHumidity: 65,
        storageType: 'ambient',
        transportConditions: 'smooth'
      };
      setInputs(breadInputs);
      setDemoBanner({
        title: "Demo Simulation Active: Artisan Sourdough Bread (Condensation & Mold Control)",
        desc: "Demonstrating how breathable micro-perforations release bread moisture while halting mold growth."
      });
      if (demoMode) {
        executeSimulation(breadInputs);
      }
    }
  }, [searchParams]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const executeSimulation = async (inputData) => {
    setIsAnalyzing(true);
    setStep(4);
    
    try {
      const payload = {
        commodity_name: inputData.commodityType,
        storage_type: inputData.storageType,
        transport_conditions: inputData.transportConditions,
        desired_shelf_life: parseInt(inputData.desiredShelfLife) || 14,
        moisture_content: inputData.moistureContent === 'high' ? 85.0 : inputData.moistureContent === 'medium' ? 50.0 : 15.0,
        oil_fat_content: inputData.oilFatContent === 'high' ? 30.0 : 5.0,
        ph_level: inputData.pHLevel === 'acidic' ? 4.0 : 7.0,
        respiration_rate: inputData.respirationRate === 'high' ? 30.0 : 5.0,
        demo_mode: searchParams.get('demo_mode') === 'true'
      };

      const res = await api.generateRecommendation(payload);
      const topMat = res.ranked_materials?.[0];
      
      setResults({
        otr: res.target_otr,
        wvtr: res.target_wvtr,
        thickness: res.thickness,
        material: res.primary_material,
        map: res.map_required,
        sealability: res.sealability,
        eco: res.eco_alternative,
        confidence_score: topMat?.confidence_score,
        cost_estimate_local: topMat?.cost_estimate_local,
        supplier_channel_note: topMat?.supplier_channel_note,
        source_reference: topMat?.source_reference,
        recommendation_id: res.recommendation_id,
        recommended_format: res.recommended_format,
        format_id: res.format_id,
        short_shelf_life_note: res.short_shelf_life_note,
        commodity: res.commodity,
        is_bakery: inputData.commodityType === 'bakery' || res.commodity?.toLowerCase().includes('bakery')
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runAnalysis = () => {
    executeSimulation(inputs);
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return "Step 1: Commodity Selection";
      case 2: return "Step 2: Input Parameters";
      case 3: return "Step 3: Storage & Transport";
      case 4: return "Step 4: Recommendation Results";
      default: return "";
    }
  };

  return (
    <div className="pt-20 pb-28 min-h-screen px-4 md:px-8 max-w-5xl mx-auto font-sans flex flex-col justify-center">
      
      {/* Guided Demo Banner */}
      {demoBanner && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-amber-300">{demoBanner.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{demoBanner.desc}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDemoBanner(null)}
            className="text-xs text-slate-400 hover:text-white underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Area */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-amber-400" />
            {t.title}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">{t.subtitle}</p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex gap-2">
          {[1,2,3,4].map(num => (
            <div key={num} className={`w-3 h-3 rounded-full transition-all ${step >= num ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'bg-slate-700'}`}></div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="flex-1 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
      >
        
        {/* LEFT/TOP: Inputs Form */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar border-r border-white/5 relative z-10">
          
          <h2 className="text-xl font-bold text-amber-300 mb-6 font-mono border-b border-white/5 pb-2">
            {getStepTitle()}
          </h2>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }} 
                className="space-y-6"
              >
                {/* Background Educational Text */}
                <div className="bg-indigo-950/40 border border-indigo-500/20 p-5 rounded-2xl">
                  <h3 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2 border-b border-indigo-500/20 pb-2 mb-3">
                     {t.backgroundTitle}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                     {t.backgroundText}
                  </p>
                </div>

                <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-400" /> {t.fields.commodityType}
                </label>
                <select 
                  value={inputs.commodityType} 
                  onChange={(e) => handleInputChange('commodityType', e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
                >
                  <option value="freshProduce">{t.inputs.freshProduce}</option>
                  <option value="bakery">Bakery & Bread (Artisan Loaves, Buns, Cakes)</option>
                  <option value="dryGoods">{t.inputs.dryGoods}</option>
                  <option value="snacks">{t.inputs.snacks}</option>
                  <option value="meatPoultry">{t.inputs.meatPoultry}</option>
                  <option value="dairy">{t.inputs.dairy}</option>
                </select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" /> {t.fields.moistureContent}
                  </label>
                  <select 
                    value={inputs.moistureContent} 
                    onChange={(e) => handleInputChange('moistureContent', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  >
                    <option value="low">{t.inputs.low}</option>
                    <option value="medium">{t.inputs.medium}</option>
                    <option value="high">{t.inputs.high}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.fields.oilFatContent}</label>
                  <select 
                    value={inputs.oilFatContent} 
                    onChange={(e) => handleInputChange('oilFatContent', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  >
                    <option value="low">{t.inputs.low}</option>
                    <option value="high">{t.inputs.high}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.fields.pHLevel}</label>
                  <select 
                    value={inputs.pHLevel} 
                    onChange={(e) => handleInputChange('pHLevel', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  >
                    <option value="neutral">{t.inputs.neutral}</option>
                    <option value="acidic">{t.inputs.acidic}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-400" /> {t.fields.respirationRate}
                  </label>
                  <select 
                    value={inputs.respirationRate} 
                    onChange={(e) => handleInputChange('respirationRate', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  >
                    <option value="low">{t.inputs.low}</option>
                    <option value="high">{t.inputs.high}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }} 
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.fields.desiredShelfLife}</label>
                <input 
                  type="number" 
                  value={inputs.desiredShelfLife} 
                  onChange={(e) => handleInputChange('desiredShelfLife', e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all font-mono"
                  min="1" 
                  max="365"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-red-400" /> {t.fields.storageType}
                  </label>
                  <select 
                    value={inputs.storageType} 
                    onChange={(e) => handleInputChange('storageType', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400 transition-all"
                  >
                    <option value="ambient">{t.inputs.ambient}</option>
                    <option value="chilled">{t.inputs.chilled}</option>
                    <option value="frozen">{t.inputs.frozen}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.fields.transportConditions}</label>
                  <select 
                    value={inputs.transportConditions} 
                    onChange={(e) => handleInputChange('transportConditions', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  >
                    <option value="smooth">{t.inputs.smooth}</option>
                    <option value="rough">{t.inputs.rough}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></div>
                  <p className="mt-4 text-amber-400 font-mono tracking-widest animate-pulse">{t.analyzing}</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  
                  {/* Primary Material */}
                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-5 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <ShieldCheck className="w-24 h-24 text-emerald-400" />
                    </div>
                    <h4 className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">{t.primaryMaterial}</h4>
                    <p className="text-xl font-bold text-white relative z-10">{results.material}</p>
                  </div>

                  {/* Recommended Packaging Format Card */}
                  {results.recommended_format && (
                    <div className="bg-amber-500/10 border-2 border-amber-400/40 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                          Recommended Format
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {results.recommended_format}
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Engineered for optimal headspace gas stability and product protection.
                        </p>
                      </div>
                      <Link
                        to={`/knowledge-base?tab=library&format=${results.format_id || 'stand-up-pouch'}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl transition-all shadow-md shrink-0"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>View Vector Schematic &rarr;</span>
                      </Link>
                    </div>
                  )}

                  {/* Bakery Intelligence Note */}
                  {results.is_bakery && (
                    <div className="bg-blue-950/30 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
                      <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <span className="font-bold text-blue-300 block mb-0.5">Bakery Moisture & Condensation Advisory:</span>
                        High moisture in freshly baked loaves can condense on the interior surface of non-breathable plastic film, pooling water droplets and creating an ideal environment for rapid mold spoilage within 3-4 days. Micro-perforated breathable packaging allows water vapor transmission while safeguarding against airborne contaminants.
                      </div>
                    </div>
                  )}

                  {/* Short Shelf-Life / Preservatives Notice */}
                  {results.short_shelf_life_note && (
                    <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200/90 leading-relaxed">
                          {results.short_shelf_life_note}
                        </p>
                      </div>
                      <Link
                        to="/knowledge-base?tab=preservatives"
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline shrink-0"
                      >
                        <span>Preservatives Guide</span> &rarr;
                      </Link>
                    </div>
                  )}
                  
                  {/* Barrier Specifications Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                      <h4 className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">{t.targetOtr}</h4>
                      <p className="text-lg font-mono text-blue-300">{results.otr}</p>
                      <p className="text-[10px] text-slate-500 mt-1">cc/m²/day</p>
                    </div>
                    <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                      <h4 className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">{t.targetWvtr}</h4>
                      <p className="text-lg font-mono text-blue-300">{results.wvtr}</p>
                      <p className="text-[10px] text-slate-500 mt-1">g/m²/day</p>
                    </div>
                    <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                      <h4 className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">{t.thickness}</h4>
                      <p className="text-lg font-mono text-amber-300">{results.thickness}</p>
                      <p className="text-[10px] text-slate-500 mt-1">microns (μm)</p>
                    </div>
                    <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl">
                      <h4 className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">{t.sealability}</h4>
                      <p className="text-sm font-semibold text-white">{results.sealability}</p>
                    </div>
                  </div>

                  <div className="bg-indigo-950/30 border border-indigo-500/20 p-5 rounded-2xl">
                    <h4 className="text-indigo-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
                      <Wind className="w-4 h-4" /> {t.mapRequired}
                    </h4>
                    <p className="text-sm font-medium text-slate-200 mt-1">{results.map}</p>
                  </div>

                  <div className="bg-green-950/30 border border-green-500/20 p-5 rounded-2xl">
                    <h4 className="text-green-400 text-xs font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
                      <Leaf className="w-4 h-4" /> {t.ecoAlternative}
                    </h4>
                    <p className="text-sm font-medium text-slate-200 mt-1">{results.eco}</p>
                  </div>

                  {/* Metadata block for Realism Pass */}
                  <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl text-sm">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                      <span className="text-slate-400">Confidence Level</span>
                      <span className="text-amber-400 font-bold">{(results.confidence_score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                      <span className="text-slate-400">Local Cost Est.</span>
                      <span className="text-emerald-400 font-mono">₹{results.cost_estimate_local || 'N/A'} / kg</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                      <span className="text-slate-400">Supplier Note</span>
                      <span className="text-slate-200 text-right max-w-[60%]">{results.supplier_channel_note || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-400">Source Reference</span>
                      <span className="text-blue-300 text-xs italic text-right max-w-[60%]">{results.source_reference || 'Estimated'}</span>
                    </div>
                  </div>

                  {/* Launch Readiness Checklist Prompt */}
                  <div className="bg-teal-950/20 border border-teal-500/30 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                        ✓
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">Planning Commercial Retail Launch?</h5>
                        <p className="text-[11px] text-slate-400">Audit your FSSAI registration, 14-digit labeling, and migration tests.</p>
                      </div>
                    </div>
                    <Link
                      to="/launch-checklist"
                      className="text-xs font-bold text-teal-400 hover:underline shrink-0"
                    >
                      Audit Checklist &rarr;
                    </Link>
                  </div>

                  {/* 1-5 Star User Feedback Rating Block */}
                  <div className="mt-8 border-t border-white/10 pt-6 flex flex-col items-center">
                    <p className="text-slate-400 text-sm font-medium mb-3">Rate this recommendation</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={async () => {
                            setRating(star);
                            try {
                              if (results.recommendation_id) {
                                await api.submitFeedback({ rating: star, recommendation_id: results.recommendation_id, comments: "" });
                              }
                            } catch (e) {
                              console.error("Feedback error", e);
                            }
                          }}
                          className={`p-1 transition-all ${
                            rating >= star ? "text-amber-400" : "text-slate-600 hover:text-amber-400/50"
                          }`}
                        >
                          <Star className={`w-8 h-8 ${rating >= star ? "fill-amber-400" : ""}`} />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && <p className="text-amber-400 text-xs mt-2 font-medium">Thank you for your feedback!</p>}
                  </div>

                </div>
              ) : null}
            </motion.div>
          )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
            {step > 1 && step < 4 ? (
              <button 
                onClick={handlePrevStep}
                className="px-6 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button 
                onClick={handleNextStep}
                className="px-8 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)]"
              >
                Next Step
              </button>
            ) : step === 3 ? (
              <button 
                onClick={runAnalysis}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold hover:brightness-110 flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              >
                {t.btnAnalyze} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-2 rounded-xl border border-amber-400/50 text-amber-400 font-semibold hover:bg-amber-400 hover:text-slate-950 transition-colors"
              >
                Start Over
              </button>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
