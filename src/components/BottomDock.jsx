import React, { useState } from 'react';
import { Layers, Activity, Award, User, Clock, ChevronRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function BottomDock({ 
  onOpenSim, 
  onOpenLaminate, 
  onOpenPersona, 
  selectedPersona,
  lang 
}) {
  const [activeTab, setActiveTab] = useState('persona');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
      {/* Translucent Futuristic Glassmorphic Container (Matching user screenshot) */}
      <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#091124]/40 backdrop-blur-2xl border border-amber-400/30 shadow-[0_0_35px_rgba(0,0,0,0.7)] hover:border-amber-400/60 transition-all max-w-full overflow-x-auto ring-1 ring-white/10">
        
        {/* FP. Brand Logo Icon */}
        <div 
          onClick={onOpenPersona}
          title="Switch User Persona"
          className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/20 flex items-center justify-center text-white font-serif font-bold text-sm cursor-pointer hover:bg-slate-800 hover:border-amber-400 transition-all shadow-md"
        >
          FP.
        </div>

        <div className="h-6 w-px bg-white/15 mx-1"></div>

        {/* Persona (Scientist/Farmer) Tab - Matching exact styling from reference screenshot */}
        <button
          onClick={() => { setActiveTab('persona'); onOpenPersona(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'persona'
              ? 'bg-slate-900/90 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60 border border-transparent'
          }`}
        >
          <User className="w-4 h-4 text-amber-400" />
          <span>{t.persona} ({selectedPersona})</span>
        </button>

        {/* Film Materials Tab */}
        <button
          onClick={() => { setActiveTab('materials'); onOpenLaminate(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'materials'
              ? 'bg-slate-900/90 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60 border border-transparent'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>{t.filmMaterials}</span>
        </button>

        {/* Shelf-Life Sim Tab */}
        <button
          onClick={() => { setActiveTab('sim'); onOpenSim(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'sim'
              ? 'bg-slate-900/90 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60 border border-transparent'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{t.shelfLifeSim}</span>
        </button>

        {/* Barrier Physics Tab */}
        <button
          onClick={() => { setActiveTab('physics'); onOpenLaminate(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'physics'
              ? 'bg-slate-900/90 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60 border border-transparent'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{t.barrierPhysics}</span>
        </button>

        {/* TOPSIS Score Tab */}
        <button
          onClick={() => { setActiveTab('topsis'); onOpenSim(); }}
          className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'topsis'
              ? 'bg-slate-900/90 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'text-slate-200 hover:text-amber-300 hover:bg-slate-900/60 border border-transparent'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>{t.topsisScore}</span>
        </button>

        {/* Launch Engine Yellow Glowing Pill */}
        <button
          onClick={onOpenSim}
          className="ml-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-sans font-bold text-xs tracking-wide flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(250,204,21,0.4)] active:scale-95 hover:scale-105"
        >
          <span>{t.launchEngine}</span>
          <ChevronRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
}
