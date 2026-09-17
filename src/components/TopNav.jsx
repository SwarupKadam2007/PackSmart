import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Compass, Play, Sparkles, Sliders, Globe, Bookmark, Share2, ChevronDown } from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../data/i18n';

export default function TopNav({ 
  isAutoFlight, 
  setIsAutoFlight,
  onOpenSim,
  onOpenEngine,
  onOpenLaminate, 
  lang, 
  setLang 
}) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainRef = useRef(null);

  // Web Audio API Ambient Synthesizer
  const toggleSound = () => {
    if (!isSoundOn) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(220, ctx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(330, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainRef.current = gain;

        setIsSoundOn(true);
      } catch (e) {
        console.error("Audio Context initialization failed:", e);
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          if (osc1Ref.current) osc1Ref.current.stop();
          if (osc2Ref.current) osc2Ref.current.stop();
          if (audioCtxRef.current) audioCtxRef.current.close();
          setIsSoundOn(false);
        }, 1000);
      } else {
        setIsSoundOn(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
      {/* Left Creator Branding */}
      <div className="flex items-center gap-3 pointer-events-auto bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-300 shadow-xl">
        <span className="font-serif font-semibold text-white tracking-wide">{t.title} · The Ascent</span>
        <span className="text-slate-500">by</span>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 font-bold text-[10px] flex items-center justify-center">
            FP
          </div>
          <span className="font-medium text-amber-300 underline decoration-amber-400/40 hover:text-white transition-colors cursor-pointer">
            Packaging AI
          </span>
        </div>
      </div>

      {/* Top Right Controls & Language Switcher */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        
        {/* Vernacular Multi-Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="px-3.5 py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-amber-400/40 text-amber-300 font-sans text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-all shadow-lg"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLangObj.flag} {currentLangObj.name}</span>
            <ChevronDown className="w-3 h-3 text-amber-400" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-900/95 backdrop-blur-xl border border-amber-400/40 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-150">
              <div className="px-3 py-1 text-[10px] font-mono text-amber-400/80 uppercase border-b border-white/10 mb-1">
                SELECT LANGUAGE / भाषा
              </div>
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                  className={`w-full px-4 py-2 text-xs text-left font-sans flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    lang === l.code ? 'text-amber-300 font-bold bg-amber-400/10' : 'text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </span>
                  {lang === l.code && <span className="text-amber-400 font-bold">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FREE FLIGHT Mode Pill */}
        <button
          onClick={() => setIsAutoFlight(!isAutoFlight)}
          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 transition-all ${
            isAutoFlight
              ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
              : 'bg-slate-900/60 backdrop-blur-md border border-white/15 text-slate-200 hover:border-amber-400/50'
          }`}
        >
          <Compass className={`w-3.5 h-3.5 ${isAutoFlight ? 'animate-spin' : ''}`} />
          <span>{t.freeFlight}</span>
          <span className="px-1.5 py-0.5 rounded bg-black/20 text-[10px] font-mono">E</span>
        </button>

        {/* SOUND Mode Pill */}
        <button
          onClick={toggleSound}
          className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 transition-all ${
            isSoundOn
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30'
              : 'bg-slate-900/60 backdrop-blur-md border border-white/15 text-slate-200 hover:border-emerald-400/50'
          }`}
        >
          {isSoundOn ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-slate-950" />
              <span>{t.sound}</span>
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-slate-950 animate-equalizer" style={{ animationDelay: '0s' }}></span>
                <span className="w-0.5 bg-slate-950 animate-equalizer" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-0.5 bg-slate-950 animate-equalizer" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>{t.sound}</span>
              <span className="px-1.5 py-0.5 rounded bg-black/20 text-[10px] font-mono">M</span>
            </>
          )}
        </button>

        {/* EXPERIENCE Primary Action Button */}
        <button
          onClick={onOpenEngine}
          className="px-5 py-2 rounded-full text-xs font-mono font-bold tracking-widest text-white bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 group"
        >
          <Play className="w-3 h-3 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
          <span>{t.experience}</span>
          <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenLaminate}
          title="Laminate Stack Visualizer"
          className="p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/15 text-amber-400 hover:bg-amber-400 hover:text-slate-950 transition-all"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
