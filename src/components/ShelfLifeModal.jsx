import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, Thermometer, ArrowRight, Download, Sparkles, Sprout } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TRANSLATIONS } from '../data/i18n';

const CROPS = [
  { id: 'strawberry', nameEn: 'Fresh Strawberries', nameMr: 'ताजी स्ट्रॉबेरी', nameHi: 'ताजा स्ट्रॉबेरी', namePa: 'ਤਾਜ਼ੀ ਸਟ੍ਰਾਬੇਰੀ', nameGu: 'તાજી સ્ટ્રોબેરી', normalDays: 5, aiDays: 24, temp: '4°C' },
  { id: 'mango', nameEn: 'Alphonso Mangoes', nameMr: 'हापूस आंबे', nameHi: 'अल्फांसो आम', namePa: 'ਅਲਫਾਂਸੋ ਅੰਬ', nameGu: 'અલ્ફોન્સો કેરી', normalDays: 8, aiDays: 32, temp: '12°C' },
  { id: 'tomato', nameEn: 'Fresh Tomatoes', nameMr: 'ताजे टोमॅटो', nameHi: 'ताजा टमाटर', namePa: 'ਤਾਜ਼ੇ ਟਮਾਟਰ', nameGu: 'તાજા ટામેટાં', normalDays: 4, aiDays: 21, temp: '10°C' },
  { id: 'chips', nameEn: 'Crispy Snack Foods', nameMr: 'कुरकुरीत फराळ / वेफर्स', nameHi: 'नमकीन / वेफर्स', namePa: 'ਸਨੈਕਸ / ਵੇਫਰ', nameGu: 'નાસ્તો / વેફર્સ', normalDays: 15, aiDays: 180, temp: '25°C' },
  { id: 'grain', nameEn: 'Pulses & Grains', nameMr: 'धान्य व डाळी', nameHi: 'अनाज और दालें', namePa: 'ਅਨਾਜ ਅਤੇ ਦਾਲਾਂ', nameGu: 'અનાજ અને દાળ', normalDays: 30, aiDays: 365, temp: '20°C' },
];

export default function ShelfLifeModal({ isOpen, onClose, lang, selectedPersona }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [isFarmerView, setIsFarmerView] = useState(selectedPersona === 'Farmer' || true);
  const [temp, setTemp] = useState(4);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const getCropName = (c) => {
    if (lang === 'mr') return c.nameMr;
    if (lang === 'hi') return c.nameHi;
    if (lang === 'pa') return c.namePa;
    if (lang === 'gu') return c.nameGu;
    return c.nameEn;
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-400/50 rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl relative my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xl">
              <Sprout className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">{t.farmerBadge}</span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white">{t.simTitle}</h2>
            </div>
          </div>

          {/* Farmer View vs Technical View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-white/15 text-xs font-sans">
            <button
              onClick={() => setIsFarmerView(true)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                isFarmerView ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.farmerModeBtn || '🌱 Farmer Simple Mode'}
            </button>
            <button
              onClick={() => setIsFarmerView(false)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                !isFarmerView ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.scientistModeBtn || '🔬 Technical Graph (Scientist)'}
            </button>
          </div>
        </div>

        {/* Crop Selector Bar */}
        <div className="mb-6">
          <label className="text-xs font-mono text-amber-300 uppercase mb-2 block font-bold">
            🌾 {t.cropSelect}:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {CROPS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCrop(c)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  selectedCrop.id === c.id
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-amber-400/40'
                }`}
              >
                <span className="text-sm">{getCropName(c)}</span>
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
              <div className="bg-red-950/30 border border-red-500/30 p-5 rounded-2xl relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-red-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> {t.normalBag}
                  </span>
                  <span className="text-[10px] font-mono text-red-300 bg-red-500/20 px-2 py-0.5 rounded">
                    {t.riskOfRot || 'High Risk of Rot'}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">
                  {selectedCrop.normalDays} <span className="text-sm font-normal text-red-300">{t.daysFresh}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'mr' 
                    ? `साध्या पिशवीत ${getCropName(selectedCrop)} फक्त ${selectedCrop.normalDays} दिवसांत सुकतात व सडू लागतात.`
                    : (lang === 'hi' 
                        ? `साधारण बोरी में ${getCropName(selectedCrop)} केवल ${selectedCrop.normalDays} दिनों में खराब होने लगता है।`
                        : `In normal sacks, ${getCropName(selectedCrop)} spoils quickly in just ${selectedCrop.normalDays} days due to open moisture.`)}
                </p>
              </div>

              {/* Special AI Packaging Bag Card */}
              <div className="bg-emerald-950/40 border border-emerald-400/50 p-5 rounded-2xl relative shadow-xl shadow-emerald-900/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.recommendedBag}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-950 font-bold bg-emerald-400 px-2.5 py-0.5 rounded-full">
                    +{extraDays} {t.freshnessGain}!
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">
                  {selectedCrop.aiDays} <span className="text-sm font-normal text-emerald-300">{t.daysFresh}</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {lang === 'mr'
                    ? `खास ३ पदरी AI पिशवीत ${getCropName(selectedCrop)} तब्बल ${selectedCrop.aiDays} दिवस ताजे राहतात!`
                    : (lang === 'hi'
                        ? `हमारे विशेष ३-परत वाले AI बैग में ${getCropName(selectedCrop)} पूरे ${selectedCrop.aiDays} दिनों तक सुरक्षित रहता है!`
                        : `In our special 3-layer AI bag, ${getCropName(selectedCrop)} stays 100% fresh for ${selectedCrop.aiDays} days!`)}
                </p>
              </div>
            </div>

            {/* Visual Freshness Progress Gauge */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-200">
                <span>📊 {t.gaugeTitle || 'Freshness Meter Comparison'}</span>
                <span className="text-amber-300">+{Math.round((selectedCrop.aiDays / selectedCrop.normalDays) * 100)}% {t.longerLife || 'Longer Life'}</span>
              </div>

              {/* Progress bar comparison */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[11px] text-red-300 mb-1 font-mono">
                    <span>{t.normalBag}</span>
                    <span>{selectedCrop.normalDays} Days</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-emerald-300 mb-1 font-mono">
                    <span>{t.recommendedBag}</span>
                    <span>{selectedCrop.aiDays} Days</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer Action Advice Banner */}
            <div className="bg-amber-950/30 border border-amber-400/40 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Thermometer className="w-6 h-6 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-amber-300 uppercase">{t.storageTip}</div>
                  <div className="text-slate-200">
                    {lang === 'mr' 
                      ? `माल साठवताना तापमान ${selectedCrop.temp} वर ठेवा.` 
                      : (lang === 'hi' 
                          ? `भंडारण करते समय तापमान ${selectedCrop.temp} पर रखें।` 
                          : `Store bag in cool shade at ${selectedCrop.temp}.`)}
                  </div>
                </div>
              </div>
              
              <button
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadSpec}</span>
              </button>
            </div>
          </div>
        ) : (
          /* SCIENTIST TECHNICAL GRAPH MODE */
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 mb-6">
            <h4 className="text-sm font-serif font-bold text-slate-200 mb-4">
              Euler Mass Balance Permeation Graph (30-Day Simulation)
            </h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ca8a04', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey={t.normalBag} stroke="#ef4444" strokeWidth={2.5} />
                  <Line type="monotone" dataKey={t.recommendedBag} stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6 text-xs font-mono text-slate-400">
          <span>{t.savingMoney}</span>
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700">
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
