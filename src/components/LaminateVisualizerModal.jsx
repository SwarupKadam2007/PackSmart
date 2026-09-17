import React, { useState } from 'react';
import { X, Layers, CheckCircle2, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function LaminateVisualizerModal({ isOpen, onClose, lang = 'mr' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const mm = t.materialsModal || TRANSLATIONS.en.materialsModal;

  const stacks = [
    {
      id: 'eco',
      name: mm.layerName,
      score: 0.7627,
      ratingBadge: mm.ratingBadge,
      layers: [
        {
          num: 'L1',
          name: mm.layer1Title,
          film: 'Cellulose / Tough Film (15 µm)',
          role: mm.layer1Role,
          color: 'from-amber-500/20 to-amber-600/10'
        },
        {
          num: 'L2',
          name: mm.layer2Title,
          film: 'Met-PET Barrier Film (12 µm)',
          role: mm.layer2Role,
          color: 'from-blue-500/20 to-blue-600/10'
        },
        {
          num: 'L3',
          name: mm.layer3Title,
          film: 'Food-Grade Pure Sealant (35 µm)',
          role: mm.layer3Role,
          color: 'from-emerald-500/20 to-emerald-600/10'
        }
      ],
      eco: mm.ecoBadge
    }
  ];

  const [selectedStack] = useState(stacks[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-400/40 rounded-2xl sm:rounded-3xl max-w-3xl w-[95vw] sm:w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-4 sm:my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pr-10 sm:pr-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-xl shrink-0">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest">{mm.badge}</span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">{mm.title}</h2>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 mb-6 leading-relaxed">
          {mm.subtitle}
        </p>

        {/* Selected Stack Details */}
        <div className="bg-slate-950/80 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono text-amber-400 uppercase">{selectedStack.ratingBadge}</span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">{selectedStack.name}</h3>
            </div>
            <div className="sm:text-right">
              <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 uppercase">{mm.score}</span>
              <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300">98 / 100 ★</div>
            </div>
          </div>

          {/* 3D Visual Film Layer Stack Representation */}
          <div className="space-y-3 mb-6">
            {selectedStack.layers.map((layer, lIdx) => (
              <div
                key={lIdx}
                className="p-3 sm:p-4 rounded-xl border border-amber-400/20 bg-gradient-to-r from-slate-900 to-slate-950 hover:border-amber-400/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-400/10 text-amber-400 font-mono font-bold text-[10px] sm:text-xs flex items-center justify-center border border-amber-400/30 shrink-0 mt-0.5">
                    {layer.num}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] sm:text-sm font-bold text-amber-300 leading-snug">{layer.name}</div>
                    <div className="text-[11px] sm:text-xs text-slate-200 mt-1 leading-relaxed font-sans">{layer.role}</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-1.5">{layer.film}</div>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto text-left sm:text-right font-mono mt-1 sm:mt-0 pl-11 sm:pl-0">
                  <span className="text-[9px] sm:text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                    ✓ Protected
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Eco Friendly Callout Banner */}
          <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <div className="text-[11px] sm:text-xs text-emerald-200 font-sans leading-relaxed">
              <span className="font-bold block sm:inline">{mm.ecoBadge}</span> <span className="hidden sm:inline">—</span> 100% Recyclable.
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
