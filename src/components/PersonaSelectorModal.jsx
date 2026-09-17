import React from 'react';
import { X, UserCheck, Microscope, Shield, Check } from 'lucide-react';

const PERSONAS = [
  {
    id: 'Farmer',
    title: 'Farmer / Quick Mode',
    badge: 'FARMER_USER',
    desc: 'Simplified crop selection without complex packaging jargon. Instant storage temperature & plain language advice.',
    icon: UserCheck,
    color: 'emerald'
  },
  {
    id: 'Scientist',
    title: 'Scientist / Analyst Mode',
    badge: 'ANALYST',
    desc: 'Full thermodynamic parameter control (OTR/WVTR, gas selectivity, TOPSIS matrix weights, Recharts mass curves).',
    icon: Microscope,
    color: 'amber'
  },
  {
    id: 'Admin',
    title: 'System Administrator',
    badge: 'ADMIN',
    desc: 'Manage 85+ commodity respiration models, 27 barrier polymer films, user RBAC permissions, and system seeds.',
    icon: Shield,
    color: 'sky'
  }
];

export default function PersonaSelectorModal({ isOpen, onClose, selectedPersona, setSelectedPersona }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-400/40 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative text-white">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">ROLE-BASED ACCESS CONTROL (RBAC)</span>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">Select Active Engine Persona Mode</h2>
        </div>

        <div className="space-y-4 mb-6">
          {PERSONAS.map((p) => {
            const IconComponent = p.icon;
            const isSelected = selectedPersona === p.id;

            return (
              <div
                key={p.id}
                onClick={() => { setSelectedPersona(p.id); onClose(); }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 shadow-xl shadow-amber-400/10'
                    : 'bg-slate-950/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className={`p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif font-bold text-white text-base">{p.title}</h3>
                    {isSelected && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs"
          >
            Confirm Persona Selection
          </button>
        </div>
      </div>
    </div>
  );
}
