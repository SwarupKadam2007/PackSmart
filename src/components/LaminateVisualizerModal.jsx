import React, { useState } from 'react';
import { X, Layers, ShieldAlert, CheckCircle2, Zap, Award, Sparkles } from 'lucide-react';

const LAMINATE_STACKS = [
  {
    name: "Met-PET / Cellulose / LDPE (TOPSIS Rank #1)",
    topsisScore: 0.7627,
    otr: "0.45 cm³/m²/day",
    wvtr: "0.08 g/m²/day",
    layers: [
      { name: "Outer Printing Layer", film: "BOPP / Cellulose Film", thickness: "15 µm", role: "Gloss printing, mechanical puncture resistance" },
      { name: "High Barrier Core Layer", film: "Met-PET (Metallized Polyester)", thickness: "12 µm", role: "Pin-hole free oxygen & UV light barrier" },
      { name: "Interior Sealant Layer", film: "Food-Grade LDPE", thickness: "35 µm", role: "Hermetic heat sealing & food contact safety" }
    ],
    biodegradable: "85% Recyclable / Bio-based core",
    recyclabilityClass: "Class A"
  },
  {
    name: "Al Foil / PET / LLDPE (Extreme Barrier)",
    topsisScore: 0.7210,
    otr: "0.01 cm³/m²/day",
    wvtr: "0.005 g/m²/day",
    layers: [
      { name: "Outer Structural Layer", film: "PET Film", thickness: "12 µm", role: "Tensile strength & heat resistance" },
      { name: "Ultra-Barrier Core", film: "Aluminum Foil", thickness: "7 µm", role: "Zero light, zero oxygen, zero moisture transfer" },
      { name: "Sealant Layer", film: "LLDPE Film", thickness: "40 µm", role: "Puncture resistant seal" }
    ],
    biodegradable: "Non-biodegradable (High Energy Recycling)",
    recyclabilityClass: "Class B"
  }
];

export default function LaminateVisualizerModal({ isOpen, onClose }) {
  const [selectedStack, setSelectedStack] = useState(LAMINATE_STACKS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-400/40 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">POLYMER MICRO-EXTRUSION ARCHITECTURE</span>
            <h2 className="text-2xl font-serif font-bold text-white">Multi-Layer Laminate Breakdown</h2>
          </div>
        </div>

        {/* Stack Selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {LAMINATE_STACKS.map((stack, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStack(stack)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all ${
                selectedStack.name === stack.name
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
                  : 'bg-slate-950 border border-white/10 text-slate-300 hover:border-amber-400/50'
              }`}
            >
              {stack.name.split(' ')[0]} (Score: {stack.topsisScore})
            </button>
          ))}
        </div>

        {/* Selected Stack Details */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase">SELECTED STRUCTURE</span>
              <h3 className="text-lg font-serif font-bold text-white">{selectedStack.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">TOPSIS CLOSE CONCEPT SCORE</span>
              <div className="text-2xl font-mono font-bold text-amber-300">{selectedStack.topsisScore}</div>
            </div>
          </div>

          {/* 3D Visual Film Layer Stack Representation */}
          <div className="space-y-3 mb-6">
            {selectedStack.layers.map((layer, lIdx) => (
              <div
                key={lIdx}
                className="p-4 rounded-xl border border-amber-400/20 bg-gradient-to-r from-slate-900 to-slate-950 hover:border-amber-400/60 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-400/30">
                    L{lIdx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 uppercase">{layer.name}</div>
                    <div className="text-sm font-bold text-white">{layer.film}</div>
                    <div className="text-[11px] text-slate-300">{layer.role}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs text-amber-300 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/30">
                    {layer.thickness}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Footer */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono border-t border-white/10 pt-4">
            <div className="bg-slate-900 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px]">OXYGEN TRANSMISSION (OTR)</span>
              <span className="text-amber-300 font-bold">{selectedStack.otr}</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 block text-[10px]">WATER VAPOR TRANSMISSION (WVTR)</span>
              <span className="text-amber-300 font-bold">{selectedStack.wvtr}</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px]">RECYCLABILITY CLASS</span>
              <span className="text-emerald-400 font-bold">{selectedStack.recyclabilityClass}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            Close Spec View
          </button>
        </div>
      </div>
    </div>
  );
}
