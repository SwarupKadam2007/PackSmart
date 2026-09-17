import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Thermometer, ArrowRight, Download, Sparkles, Sprout } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TRANSLATIONS } from '../data/i18n';

const CROPS = [
  { id: 'strawberry', normalDays: 5, aiDays: 24, temp: '4°C' },
  { id: 'mango', normalDays: 8, aiDays: 32, temp: '12°C' },
  { id: 'tomato', normalDays: 4, aiDays: 21, temp: '10°C' },
  { id: 'chips', normalDays: 15, aiDays: 180, temp: '25°C' },
  { id: 'grain', normalDays: 30, aiDays: 365, temp: '20°C' },
];

export default function ShelfLifeModal({ isOpen, onClose, lang, selectedPersona }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [isFarmerView, setIsFarmerView] = useState(selectedPersona === 'Farmer' || true);

  if (!isOpen) return null;

  const getCropName = (c) => {
    return t.crops[c.id]?.name || 'Unknown Crop';
  };

  // Helper to replace placeholders like {crop} and {days}
  const formatString = (template, cropName, days, temp) => {
    if (!template) return '';
    return template
      .replace('{crop}', cropName)
      .replace('{days}', days)
      .replace('{temp}', temp);
  };

  // Recharts numerical decay data
  const chartData = [];
  for (let day = 0; day <= 30; day += 5) {
    const unpackaged = Math.max(100 - (day * (100 / selectedCrop.normalDays)), 0);
    const protectedQuality = Math.max(100 - (day * (50 / selectedCrop.aiDays)), 20);
    chartData.push({
      day: `Day ${day}`,
      [t.normalBag]: parseFloat(unpackaged.toFixed(1)),
      [t.recommendedBag]: parseFloat(protectedQuality.toFixed(1)),
    });
  }

  const extraDays = selectedCrop.aiDays - selectedCrop.normalDays;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-400/50 rounded-2xl sm:rounded-3xl max-w-4xl w-[95vw] sm:w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-4 sm:my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Mode Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4 mt-8 md:mt-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xl shrink-0">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest">{t.farmerBadge}</span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white leading-tight">{t.simTitle}</h2>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex flex-wrap items-center p-1 rounded-xl bg-slate-950 border border-white/15 text-[10px] sm:text-xs font-sans w-full md:w-auto">
            <button
              onClick={() => setIsFarmerView(true)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg font-bold transition-all text-center ${
                isFarmerView ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.farmerModeBtn}
            </button>
            <button
              onClick={() => setIsFarmerView(false)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg font-bold transition-all text-center ${
                !isFarmerView ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.scientistModeBtn}
            </button>
          </div>
        </div>

        {/* Crop Selector Bar */}
        <div className="mb-6">
          <label className="text-[10px] sm:text-xs font-mono text-amber-300 uppercase mb-2 block font-bold">
            🌾 {t.cropSelect}:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {CROPS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCrop(c)}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  selectedCrop.id === c.id
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-100 lg:scale-105'
                    : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-amber-400/40'
                }`}
              >
                <span className="text-[11px] sm:text-sm">{getCropName(c)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FARMER SIMPLE VISUAL MODE */}
        {isFarmerView ? (
          <div className="space-y-6">
            {/* Side-by-Side Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Normal Bag Card */}
              <div className="bg-red-950/30 border border-red-500/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl relative">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] sm:text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t.normalBag}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-red-300 bg-red-500/20 px-2 py-0.5 rounded">
                    {t.riskOfRot}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {selectedCrop.normalDays} <span className="text-xs sm:text-sm font-normal text-red-300">{t.daysFresh}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  {formatString(t.spoilBasic, getCropName(selectedCrop), selectedCrop.normalDays, selectedCrop.temp)}
                </p>
              </div>

              {/* Special AI Packaging Bag Card */}
              <div className="bg-emerald-950/40 border border-emerald-400/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl relative shadow-xl shadow-emerald-900/20">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> {t.recommendedBag}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-emerald-950 font-bold bg-emerald-400 px-2 sm:px-2.5 py-0.5 rounded-full">
                    +{extraDays} {t.freshnessGain}!
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {selectedCrop.aiDays} <span className="text-xs sm:text-sm font-normal text-emerald-300">{t.daysFresh}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-100 leading-relaxed">
                  {formatString(t.spoilOptimal, getCropName(selectedCrop), selectedCrop.aiDays, selectedCrop.temp)}
                </p>
              </div>
            </div>

            {/* Visual Freshness Progress Gauge */}
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 text-xs font-bold text-slate-200">
                <span>📊 {t.gaugeTitle}</span>
                <span className="text-amber-300">+{Math.round((selectedCrop.aiDays / selectedCrop.normalDays) * 100)}% {t.longerLife}</span>
              </div>

              {/* Progress bar comparison */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-red-300 mb-1.5 font-mono">
                    <span>{t.normalBag}</span>
                    <span>{selectedCrop.normalDays} Days</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] sm:text-[11px] text-emerald-300 mb-1.5 font-mono">
                    <span>{t.recommendedBag}</span>
                    <span>{selectedCrop.aiDays} Days</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Action Advice Banner */}
            <div className="bg-amber-950/30 border border-amber-400/40 p-4 rounded-xl sm:rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Thermometer className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <div className="font-bold text-amber-300 uppercase">{t.storageTip}</div>
                  <div className="text-slate-200 mt-0.5">
                    {formatString(t.storeAt, '', '', selectedCrop.temp)}
                  </div>
                </div>
              </div>
              
              <button
                className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shrink-0 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadSpec}</span>
              </button>
            </div>
          </div>
        ) : (
          /* SCIENTIST TECHNICAL GRAPH MODE */
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 mb-6">
            <h4 className="text-[13px] sm:text-sm font-serif font-bold text-slate-200 mb-4">
              Euler Mass Balance Permeation Graph (30-Day Simulation)
            </h4>
            <div className="h-48 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ca8a04', borderRadius: '12px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey={t.normalBag} stroke="#ef4444" strokeWidth={2.5} />
                  <Line type="monotone" dataKey={t.recommendedBag} stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 mt-6 text-xs font-mono text-slate-400">
          <span className="text-center sm:text-left">{t.savingMoney}</span>
          <button onClick={onClose} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
