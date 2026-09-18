import React from 'react';
import LandingNav from '../components/LandingNav';
import { Leaf, Zap, ShieldCheck, Box, Truck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../data/i18n';

export default function Home({ lang, setLang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden font-sans pt-6 pb-12 transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 sm:mb-24 pt-6">
        {/* Text Content */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-brand-green/20 text-brand-green dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
            <Leaf className="w-4 h-4" />
            {t.homeTag || "Smarter Packing. Smoother Logistics."}
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900 dark:text-white">
            <span className="text-brand-green">{t.homeTitle1 || "Pack-Smart"}</span><br />
            {t.homeTitle2 || "Logistics Software for a Faster, Leaner Supply Chain."}
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 leading-relaxed">
            {t.homeDesc || "Optimize your packing process, reduce material waste, track orders in real-time and keep your supply chain running smarter — all in one place."}
          </p>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 sm:mb-14">
            <Link to="/recommendation" className="bg-brand-green text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-brand-green/90 transition-all flex items-center gap-2 shadow-lg shadow-brand-green/30 hover:-translate-y-0.5 text-sm sm:text-base">
              {t.homeStartTrial || "Start Free Trial"} <span>&rarr;</span>
            </Link>
            <button type="button" className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm hover:-translate-y-0.5 text-sm sm:text-base">
              <svg className="w-5 h-5 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              {t.homeWatchDemo || "Watch Demo"}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm font-medium border-t border-slate-200 dark:border-slate-800 pt-6 sm:pt-8 text-left">
            <div className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-900 dark:text-white font-bold">{t.homeWasteTitle || "Less Packaging Waste"}</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal text-xs sm:text-sm">{t.homeWasteSub || "More sustainability"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-900 dark:text-white font-bold">{t.homeSpeedTitle || "Faster Operations"}</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal text-xs sm:text-sm">{t.homeSpeedSub || "Save time & cost"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <span className="block text-slate-900 dark:text-white font-bold">{t.homeTrackTitle || "Real-time Tracking"}</span>
                <span className="text-slate-500 dark:text-slate-400 font-normal text-xs sm:text-sm">{t.homeTrackSub || "Total visibility"}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Content */}
        <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[550px] flex justify-center items-center">
          <div className="absolute inset-0 bg-brand-green/10 dark:bg-brand-green/5 rounded-full blur-3xl scale-90 -z-10"></div>
          <img 
            src="/hero_robot_isometric.jpg" 
            alt="Robotic arm packing box on conveyor belt" 
            className="w-full max-w-sm sm:max-w-lg object-contain drop-shadow-2xl rounded-3xl dark:opacity-90"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-100 dark:bg-slate-900/60 py-16 sm:py-24 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            
            {/* Header Column */}
            <div className="lg:col-span-1 pt-4 text-center lg:text-left">
              <h3 className="text-brand-orange font-bold text-xs uppercase tracking-widest mb-4">{t.homeFeaturesTag || "Key Features"}</h3>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {t.homeFeaturesTitle || "Everything you need to pack and ship smarter."}
              </h2>
            </div>
            
            {/* Cards Grid */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md transition-all">
                <div className="bg-brand-green/10 dark:bg-brand-green/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Box className="w-6 h-6 text-brand-green dark:text-emerald-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.homeF1Title || "Smart Packing Rules"}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeF1Desc || "Automate box selection, reduce void space."}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md transition-all">
                <div className="bg-brand-orange/10 dark:bg-brand-orange/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.homeF2Title || "Real-Time Shipment Tracking"}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeF2Desc || "Know where every order is, all the time."}
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md transition-all">
                <div className="bg-brand-green/10 dark:bg-brand-green/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6 text-brand-green dark:text-emerald-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.homeF3Title || "Inventory & Stock Alerts"}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeF3Desc || "Never run out, never overstock."}
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md transition-all">
                <div className="bg-slate-100 dark:bg-slate-700/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.homeF4Title || "Powerful Analytics"}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.homeF4Desc || "Make data-driven decisions and scale faster."}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
