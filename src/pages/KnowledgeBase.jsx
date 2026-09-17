import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FLASHCARDS = [
  {
    id: 1,
    category: "Barrier Properties",
    term: "OTR (Oxygen Transmission Rate)",
    definition: "The steady state rate at which oxygen gas permeates through a film at specified conditions. Crucial for determining how fast food oxidizes or respires.",
    impact: "High OTR is needed for fresh produce to breathe. Low OTR (< 2 cc/m²/day) is needed for meat and snacks to prevent spoilage and rancidity.",
    link_param: "?commodityType=meatPoultry"
  },
  {
    id: 2,
    category: "Barrier Properties",
    term: "WVTR (Water Vapor Transmission Rate)",
    definition: "The steady state rate at which water vapor permeates through a packaging film. Key to maintaining moisture content.",
    impact: "High WVTR prevents condensation (fogging) in fresh produce. Low WVTR (< 1 g/m²/day) keeps dry goods like chips crisp.",
    link_param: "?commodityType=snacks"
  },
  {
    id: 3,
    category: "Atmosphere Control",
    term: "MAP (Modified Atmosphere Packaging)",
    definition: "The practice of modifying the composition of the internal atmosphere of a package (usually lowering O2 and increasing CO2) to improve shelf life.",
    impact: "Extends shelf life of fresh produce and meats by drastically slowing respiration and microbial growth without freezing.",
    link_param: "?commodityType=freshProduce"
  },
  {
    id: 4,
    category: "Sustainability",
    term: "PLA (Polylactic Acid)",
    definition: "A biodegradable and bioactive thermoplastic aliphatic polyester derived from renewable resources like corn starch or sugarcane.",
    impact: "Used as an eco-alternative to PET for fresh produce. Fully compostable in industrial facilities.",
    link_param: "?commodityType=freshProduce"
  }
];

export default function KnowledgeBase({ lang }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [flippedCards, setFlippedCards] = useState({});

  const categories = ["All", ...new Set(FLASHCARDS.map(c => c.category))];
  
  const filteredCards = activeCategory === "All" 
    ? FLASHCARDS 
    : FLASHCARDS.filter(c => c.category === activeCategory);

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeepLink = (param) => {
    navigate(`/recommend${param}`);
  };

  return (
    <div className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-serif flex items-center justify-center gap-4 mb-4">
          <BookOpen className="w-10 h-10 text-blue-400" />
          Packaging Science 101
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Master the fundamentals of food packaging science with interactive flashcards. Learn how barrier properties affect shelf life.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
        <AnimatePresence>
          {filteredCards.map(card => {
            const isFlipped = flippedCards[card.id];
            
            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative h-80 w-full cursor-pointer group"
                onClick={() => toggleFlip(card.id)}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d transition-all duration-500"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* FRONT */}
                  <div className="absolute w-full h-full backface-hidden bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl group-hover:border-blue-500/50 transition-colors">
                    <span className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4 px-3 py-1 bg-blue-950/50 rounded-full">
                      {card.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{card.term}</h3>
                    <p className="text-slate-500 text-sm mt-4 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" /> Tap to flip
                    </p>
                  </div>

                  {/* BACK */}
                  <div 
                    className="absolute w-full h-full backface-hidden bg-blue-950/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 flex flex-col shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                      <p className="text-slate-200 text-sm leading-relaxed mb-4">
                        <strong className="text-white">Definition:</strong><br />
                        {card.definition}
                      </p>
                      <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5">
                        <h4 className="text-amber-400 text-xs font-bold flex items-center gap-2 mb-1">
                          <Lightbulb className="w-3 h-3" /> Real-World Impact
                        </h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {card.impact}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeepLink(card.link_param);
                      }}
                      className="mt-4 w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                    >
                      Try it in Engine <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
