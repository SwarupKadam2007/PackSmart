import React from 'react';
import { Package, ShieldCheck, Leaf, Users, Award, Target } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function About({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="pt-24 pb-16 min-h-screen px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            <Leaf className="w-4 h-4" /> About PackSmart AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            Revolutionizing Food Preservation & Supply Chain Logistics
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            PackSmart combines material physics, artificial intelligence, and logistics analytics to reduce food spoilage and optimize packaging selection worldwide.
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-brand-green/5 rounded-full blur-3xl scale-90 -z-10"></div>
          <img src="/hero_about.jpg" alt="About PackSmart AI" className="w-full max-w-md object-contain rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800" />
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="bg-brand-green/10 dark:bg-brand-green/20 w-12 h-12 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-brand-green dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Eliminate crop waste by giving farmers, suppliers, and entrepreneurs data-backed packaging recommendations.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="bg-brand-orange/10 dark:bg-brand-orange/20 w-12 h-12 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-brand-orange" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Physics-Driven AI</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Engineered with thermodynamic respiration equations, oxygen transmission rates (OTR), and moisture kinetics.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 w-12 h-12 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Eco & Recyclable</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Promoting eco-friendly polymer films and sustainable multi-layer laminates to reduce environmental footprint.
          </p>
        </div>
      </div>
    </div>
  );
}

