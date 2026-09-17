import React, { useState } from 'react';
import { X, BrainCircuit, Droplets, Wind, Thermometer, Box, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { ENGINE_TRANSLATIONS } from '../data/engineI18n';

export default function RecommendationEngine({ isOpen, onClose, lang = 'en' }) {
  if (!isOpen) return null;

  const t = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS.en;
  
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

  // AI Logic Engine Simulator
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);
    
    setTimeout(() => {
      let otr, wvtr, thickness, material, map, sealability, eco;

      // Base logic mapping based on food science principles
      switch (inputs.commodityType) {
        case 'freshProduce':
          otr = "10,000 - 15,000";
          wvtr = "15 - 20";
          thickness = "25 - 40";
          material = t.logicResults.fp_mat;
          map = t.logicResults.fp_map;
          sealability = t.logicResults.fp_seal;
          eco = t.logicResults.fp_eco;
          break;
        case 'dryGoods':
          otr = "< 10";
          wvtr = "< 5";
          thickness = "50 - 70";
          material = t.logicResults.dg_mat;
          map = t.logicResults.dg_map;
          sealability = t.logicResults.dg_seal;
          eco = t.logicResults.dg_eco;
          break;
        case 'snacks':
          otr = "< 1";
          wvtr = "< 1";
          thickness = "60 - 80";
          material = t.logicResults.sn_mat;
          map = t.logicResults.sn_map;
          sealability = t.logicResults.sn_seal;
          eco = t.logicResults.sn_eco;
          break;
        case 'meatPoultry':
          otr = "< 5";
          wvtr = "< 5";
          thickness = "70 - 100";
          material = t.logicResults.mp_mat;
          map = t.logicResults.mp_map;
          sealability = t.logicResults.mp_seal;
          eco = t.logicResults.mp_eco;
          break;
        case 'dairy':
          otr = "< 2";
          wvtr = "< 2";
          thickness = "60 - 90";
          material = t.logicResults.da_mat;
          map = t.logicResults.da_map;
          sealability = t.logicResults.da_seal;
          eco = t.logicResults.da_eco;
          break;
        default:
          otr = "Standard";
          wvtr = "Standard";
          thickness = "50";
          material = t.logicResults.def_mat;
          map = t.logicResults.def_map;
          sealability = t.logicResults.def_seal;
          eco = t.logicResults.def_eco;
      }

      // Adjustments based on extreme variables
      if (inputs.storageType === 'frozen') {
        material += t.logicResults.mod_frozen;
        thickness = parseInt(thickness.split(' ')[0]) + 20 + " - " + (parseInt(thickness.split(' - ')[1]) + 20);
      }
      
      if (inputs.transportConditions === 'rough') {
        thickness = parseInt(thickness.split(' ')[0]) + 15 + " - " + (parseInt(thickness.split(' - ')[1]) + 15);
        sealability = t.logicResults.mod_rough;
      }

      setResults({ otr, wvtr, thickness, material, map, sealability, eco });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl sm:rounded-3xl w-[98vw] max-w-6xl h-[95vh] shadow-2xl relative flex flex-col text-white">
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <BrainCircuit className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-serif font-bold text-white leading-tight bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{t.title}</h2>
              <span className="text-[10px] sm:text-xs font-mono text-indigo-400 tracking-widest uppercase">{t.subtitle}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content area: scrollable form vs sticky results (on large screens side-by-side) */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT: Inputs Form */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar border-r border-white/5">
            
            {/* Background Educational Text */}
            <div className="mb-6 bg-indigo-950/40 border border-indigo-500/20 p-4 sm:p-5 rounded-2xl">
              <h3 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2 border-b border-indigo-500/20 pb-2 mb-3">
                 {t.backgroundTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                 {t.backgroundText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category: Product Definition */}
              <div className="col-span-1 md:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2 border-b border-white/10 pb-2">
                  <Box className="w-4 h-4" /> 1. Product Characteristics
                </h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.commodityType}</label>
                  <select 
                    value={inputs.commodityType}
                    onChange={(e) => handleInputChange('commodityType', e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="freshProduce">{t.inputs.freshProduce}</option>
                    <option value="dryGoods">{t.inputs.dryGoods}</option>
                    <option value="snacks">{t.inputs.snacks}</option>
                    <option value="meatPoultry">{t.inputs.meatPoultry}</option>
                    <option value="dairy">{t.inputs.dairy}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.moistureContent}</label>
                    <select value={inputs.moistureContent} onChange={(e) => handleInputChange('moistureContent', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                      <option value="low">{t.inputs.low}</option>
                      <option value="medium">{t.inputs.medium}</option>
                      <option value="high">{t.inputs.high}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.oilFatContent}</label>
                    <select value={inputs.oilFatContent} onChange={(e) => handleInputChange('oilFatContent', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                      <option value="low">{t.inputs.low}</option>
                      <option value="medium">{t.inputs.medium}</option>
                      <option value="high">{t.inputs.high}</option>
                    </select>
                  </div>
                </div>

                {inputs.commodityType === 'freshProduce' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.respirationRate}</label>
                    <select value={inputs.respirationRate} onChange={(e) => handleInputChange('respirationRate', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                      <option value="low">{t.inputs.low}</option>
                      <option value="medium">{t.inputs.medium}</option>
                      <option value="high">{t.inputs.high}</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Category: Storage & Logistics */}
              <div className="col-span-1 md:col-span-2 space-y-4 mt-4">
                <h3 className="text-sm font-bold text-indigo-300 font-mono flex items-center gap-2 border-b border-white/10 pb-2">
                  <Thermometer className="w-4 h-4" /> 2. Environmental & Logistics
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.storageType}</label>
                    <select value={inputs.storageType} onChange={(e) => handleInputChange('storageType', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                      <option value="ambient">{t.inputs.ambient}</option>
                      <option value="chilled">{t.inputs.chilled}</option>
                      <option value="frozen">{t.inputs.frozen}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">{t.inputs.transportConditions}</label>
                    <select value={inputs.transportConditions} onChange={(e) => handleInputChange('transportConditions', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none">
                      <option value="smooth">{t.inputs.smooth}</option>
                      <option value="rough">{t.inputs.rough}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-2 truncate">{t.inputs.desiredShelfLife}</label>
                    <input type="number" value={inputs.desiredShelfLife} onChange={(e) => handleInputChange('desiredShelfLife', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-2 truncate">{t.inputs.storageTemp}</label>
                    <input type="number" value={inputs.storageTemp} onChange={(e) => handleInputChange('storageTemp', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-300 mb-2 truncate">{t.inputs.relativeHumidity}</label>
                    <input type="number" value={inputs.relativeHumidity} onChange={(e) => handleInputChange('relativeHumidity', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-sm text-white focus:border-indigo-500 outline-none" />
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.outputs.calculating}
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" />
                  {t.outputs.generateBtn}
                </>
              )}
            </button>
          </div>

          {/* RIGHT: Results Dashboard */}
          <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
            {!results && !isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <BrainCircuit className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-sm max-w-sm">Enter the product characteristics and environmental parameters on the left, then click analyze to generate specific packaging barrier requirements.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-slate-950/80 backdrop-blur-sm z-10">
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
                <h3 className="text-indigo-400 font-mono font-bold animate-pulse">Computing Barrier Physics...</h3>
              </div>
            )}

            {results && !isAnalyzing && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-b border-indigo-500/30 pb-4">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-white">{t.outputs.title}</h2>
                </div>

                {/* Primary Recommendation */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/30 border border-indigo-500/40 p-5 rounded-2xl">
                  <div className="text-[10px] font-mono text-indigo-300 uppercase mb-1">{t.outputs.material}</div>
                  <div className="text-xl sm:text-2xl font-bold text-white leading-tight">{results.material}</div>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* OTR */}
                  <div className="bg-slate-900 border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform" />
                    <Wind className="w-5 h-5 text-blue-400 mb-2" />
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">{t.outputs.otr}</div>
                    <div className="text-lg font-bold text-white flex items-baseline gap-1">
                      {results.otr} <span className="text-[10px] text-blue-300 font-normal">{t.specs.otrUnit}</span>
                    </div>
                  </div>

                  {/* WVTR */}
                  <div className="bg-slate-900 border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/5 rounded-full group-hover:scale-150 transition-transform" />
                    <Droplets className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">{t.outputs.wvtr}</div>
                    <div className="text-lg font-bold text-white flex items-baseline gap-1">
                      {results.wvtr} <span className="text-[10px] text-cyan-300 font-normal">{t.specs.wvtrUnit}</span>
                    </div>
                  </div>

                  {/* Thickness */}
                  <div className="bg-slate-900 border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/5 rounded-full group-hover:scale-150 transition-transform" />
                    <Layers className="w-5 h-5 text-amber-400 mb-2" />
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">{t.outputs.thickness}</div>
                    <div className="text-lg font-bold text-white flex items-baseline gap-1">
                      {results.thickness} <span className="text-[10px] text-amber-300 font-normal">{t.specs.thicknessUnit}</span>
                    </div>
                  </div>

                  {/* MAP */}
                  <div className="bg-slate-900 border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/5 rounded-full group-hover:scale-150 transition-transform" />
                    <Box className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">{t.outputs.map}</div>
                    <div className="text-sm font-bold text-white leading-tight mt-1">{results.map}</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-white/5">
                    <span className="text-xs text-slate-400 font-mono">{t.outputs.sealability}</span>
                    <span className="text-xs font-bold text-white">{results.sealability}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-300/80 font-mono">{t.outputs.sustainability}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-300 text-right max-w-[50%]">{results.eco}</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
