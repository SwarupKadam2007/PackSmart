import React from 'react';
import { Play, ChevronDown, ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function HeroOverlay({ currentFrameIndex, onOpenSim, onOpenLaminate, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const frameInfo = t.frames[currentFrameIndex] || t.frames[0];

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between px-8 py-20 md:px-16 lg:px-24">
      {/* Center Hero Typography Container */}
      <div className="mt-16 md:mt-24 max-w-4xl transition-all duration-700">
        {/* Top Tagline Line */}
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-amber-400/60"></span>
          <span className="text-[11px] font-mono tracking-[0.2em] text-amber-200 uppercase font-semibold drop-shadow-md">
            {t.tagline}
          </span>
        </div>

        {/* Main Giant Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-extrabold text-white tracking-tight leading-tight md:leading-none title-glow drop-shadow-2xl break-words whitespace-normal max-w-full">
          {currentFrameIndex === 0 ? t.title : frameInfo.title}
        </h1>

        {/* Subtitle in elegant italic script */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-script text-amber-300/90 italic tracking-wide mt-2 mb-8 drop-shadow-lg font-serif break-words whitespace-normal max-w-full leading-snug">
          {currentFrameIndex === 0 ? t.subTitle : frameInfo.subtitle}
        </div>

        {/* Description summary */}
        <p className="text-sm md:text-base text-slate-200/90 font-sans max-w-xl leading-relaxed mb-8 drop-shadow-md bg-slate-950/50 backdrop-blur-md p-4 rounded-xl border border-white/10">
          {currentFrameIndex === 0 ? t.desc : frameInfo.desc}
        </p>

        {/* Primary Call to Action Button */}
        <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
          <button
            onClick={onOpenSim}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-sans font-bold text-xs tracking-widest uppercase flex items-center gap-3 shadow-2xl shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span>{t.ctaExperience}</span>
          </button>

          <button
            onClick={onOpenLaminate}
            className="px-6 py-3.5 rounded-full bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 border border-white/20 text-slate-200 font-sans font-semibold text-xs tracking-widest uppercase flex items-center gap-2 transition-all hover:border-amber-400/60"
          >
            <span>{t.ctaInspect}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Bottom Scroll Prompt Indicator */}
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300/90 uppercase tracking-widest bg-slate-950/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>SCROLL FRAME ({currentFrameIndex + 1} / 9)</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-slate-300/80 bg-slate-950/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
          <span>LAT: 27.9881° N</span>
          <span>•</span>
          <span>OTR &lt; 0.5</span>
          <span>•</span>
          <span>FSSAI & FDA VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
