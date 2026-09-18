import React, { useState } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FLASHCARDS = [
  { term: "Moisture Content & WVTR", category: "Moisture & Water", meaning: "Water Vapor Transmission Rate (WVTR) is critical for preventing dehydration in fresh produce and sogginess in dry goods. A high WVTR lets moisture escape.", range: "15-30 g/m²/day for breathable films", param: "?commodityType=freshProduce" },
  { term: "Respiration Rate & OTR", category: "Gas & Respiration", meaning: "Oxygen Transmission Rate (OTR) balances the respiration of living tissues (like apples) to prevent anaerobic fermentation. High respiration requires high OTR.", range: "10,000+ cc/m²/day for fresh produce", param: "?commodityType=freshProduce" },
  { term: "pH Level", category: "Chemical Properties", meaning: "Acidity (low pH) slows bacterial growth but can corrode certain packaging (like metal). Neutral pH foods need higher barrier protection.", range: "Acidic (pH < 4.5) vs Neutral", param: "?commodityType=meatPoultry" },
  { term: "Oil/Fat Content", category: "Chemical Properties", meaning: "High oil content requires packaging that resists fat migration to prevent structural weakening or greasiness.", range: "High (>20%) vs Low", param: "?commodityType=snacks" },
  { term: "Shelf Life & Temperature", category: "Storage & Shelf Life", meaning: "The Q10 temperature coefficient dictates that every 10°C increase roughly halves shelf life. Chilled storage extends shelf life but requires anti-fog films.", range: "Chilled (4°C) vs Ambient (20°C)", param: "?commodityType=dairy" }
];

export default function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", ...new Set(FLASHCARDS.map(c => c.category))];
  
  const filtered = activeTab === "All" ? FLASHCARDS : FLASHCARDS.filter(c => c.category === activeTab);

  return (
    <div className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-5xl mx-auto">
      <div className="mb-8 border-b border-white/10 pb-6 text-center">
        <h1 className="text-3xl font-bold text-white font-serif flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-amber-400" />
          Packaging Science Learning Module
        </h1>
        <p className="text-slate-400 mt-2">Interactive flashcards for packaging science fundamentals</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar justify-center">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              activeTab === cat ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((card, i) => (
          <Flashcard key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div className="h-64 w-full" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setFlipped(!flipped)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-slate-900 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-xl" style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-bold">{card.category}</span>
          <h2 className="text-2xl font-bold text-amber-400">{card.term}</h2>
          <p className="text-sm text-slate-400 mt-4 opacity-75">(Tap to flip)</p>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full bg-slate-800 border border-amber-400/30 rounded-3xl p-6 flex flex-col shadow-xl overflow-y-auto custom-scrollbar" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <p className="text-sm text-slate-200 mb-4">{card.meaning}</p>
          <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 mb-4">
            <span className="block text-[10px] uppercase text-slate-400 font-bold mb-1">Typical Range</span>
            <span className="text-xs text-amber-300 font-mono">{card.range}</span>
          </div>
          
          <div className="mt-auto">
            <Link 
              to={`/recommendation${card.param}`} 
              onClick={(e) => e.stopPropagation()}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-xl text-xs font-bold transition-colors"
            >
              Where you'll see this <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
