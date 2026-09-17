import React, { useState } from 'react';
import { BrainCircuit, Droplets, Wind, Thermometer, Box, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { ENGINE_TRANSLATIONS } from '../data/engineI18n';

export default function GetRecommendation({ lang }) {
  const t = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS.en;
  
  // Multi-step state
  const [step, setStep] = useState(1);

  // Input States
  const [inputs, setInputs] = useState({
    commodityType: 'freshProduce',
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

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setStep(4);
    
    setTimeout(() => {
      let otr = "", wvtr = "", thickness = "", material = "", map = "", sealability = "", eco = "";
      
      switch (inputs.commodityType) {
        case 'freshProduce':
          otr = "10,000 - 15,000"; wvtr = "15 - 20"; thickness = "25 - 40";
          material = t.logicResults.fp_mat; map = t.logicResults.fp_map;
          sealability = t.logicResults.fp_seal; eco = t.logicResults.fp_eco;
          break;
        case 'dryGoods':
          otr = "< 10"; wvtr = "< 5"; thickness = "50 - 70";
          material = t.logicResults.dg_mat; map = t.logicResults.dg_map;
          sealability = t.logicResults.dg_seal; eco = t.logicResults.dg_eco;
          break;
        case 'snacks':
          otr = "< 1"; wvtr = "< 1"; thickness = "60 - 80";
          material = t.logicResults.sn_mat; map = t.logicResults.sn_map;
          sealability = t.logicResults.sn_seal; eco = t.logicResults.sn_eco;
          break;
        case 'meatPoultry':
          otr = "< 5"; wvtr = "< 5"; thickness = "70 - 100";
          material = t.logicResults.mp_mat; map = t.logicResults.mp_map;
          sealability = t.logicResults.mp_seal; eco = t.logicResults.mp_eco;
          break;
        case 'dairy':
          otr = "< 2"; wvtr = "< 2"; thickness = "60 - 90";
          material = t.logicResults.da_mat; map = t.logicResults.da_map;
          sealability = t.logicResults.da_seal; eco = t.logicResults.da_eco;
          break;
        default:
          otr = "Standard"; wvtr = "Standard"; thickness = "50";
          material = t.logicResults.def_mat; map = t.logicResults.def_map;
          sealability = t.logicResults.def_seal; eco = t.logicResults.def_eco;
      }

      if (inputs.storageType === 'frozen') {
        material += t.logicResults.mod_frozen;
        thickness = parseInt(thickness.split(' ')[0]) + 20 + " - " + (parseInt(thickness.split(' - ')[1] || 20) + 20);
      }
      
      if (inputs.transportConditions === 'rough') {
        thickness = parseInt(thickness.split(' ')[0]) + 15 + " - " + (parseInt(thickness.split(' - ')[1] || 15) + 15);
        sealability = t.logicResults.mod_rough;
      }

      setResults({ otr, wvtr, thickness, material, map, sealability, eco });
      setIsAnalyzing(false);
    }, 1500);
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
    <div className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto flex flex-col">
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-serif flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-amber-400" />
            {t.title}
          </h1>
          <p className="text-slate-400 mt-2">{t.subtitle}</p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex gap-2">
          {[1,2,3,4].map(num => (
            <div key={num} className={`w-3 h-3 rounded-full transition-all ${step >= num ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'bg-slate-700'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        
        {/* LEFT/TOP: Inputs Form */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar border-r border-white/5 relative z-10">
          
          <h2 className="text-xl font-bold text-amber-300 mb-6 font-mono border-b border-white/5 pb-2">
            {getStepTitle()}
          </h2>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
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
                  <option value="dryGoods">{t.inputs.dryGoods}</option>
                  <option value="snacks">{t.inputs.snacks}</option>
                  <option value="meatPoultry">{t.inputs.meatPoultry}</option>
                  <option value="dairy">{t.inputs.dairy}</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" /> {t.fields.moistureContent}
                  </label>
                  <select 
                    value={inputs.moistureContent} 
                    onChange={(e) => handleInputChange('moistureContent', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-all"
                  >
                    <option value="low">{t.inputs.low}</option>
                    <option value="medium">{t.inputs.medium}</option>
                    <option value="high">{t.inputs.high}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Wind className="w-4 h-4 text-emerald-400" /> {t.fields.respirationRate}
                  </label>
                  <select 
                    value={inputs.respirationRate} 
                    onChange={(e) => handleInputChange('respirationRate', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all"
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
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.fields.desiredShelfLife}</label>
                  <input 
                    type="number" 
                    value={inputs.desiredShelfLife} 
                    onChange={(e) => handleInputChange('desiredShelfLife', e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
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
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in duration-500">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin"></div>
                  <p className="mt-4 text-amber-400 font-mono tracking-widest animate-pulse">{t.analyzing}</p>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  <div className="bg-emerald-950/30 border border-emerald-500/20 p-5 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <ShieldCheck className="w-24 h-24 text-emerald-400" />
                    </div>
                    <h4 className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">{t.primaryMaterial}</h4>
                    <p className="text-xl font-bold text-white relative z-10">{results.material}</p>
                  </div>
                  
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
                </div>
              ) : null}
            </div>
          )}

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
      </div>
    </div>
  );
}
