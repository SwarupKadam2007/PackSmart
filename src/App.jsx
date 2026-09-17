import React, { useState } from 'react';
import CanvasScroll from './components/CanvasScroll';
import TopNav from './components/TopNav';
import HeroOverlay from './components/HeroOverlay';
import Hotspots from './components/Hotspots';
import BottomDock from './components/BottomDock';
import RightDotNav from './components/RightDotNav';
import ShelfLifeModal from './components/ShelfLifeModal';
import LaminateVisualizerModal from './components/LaminateVisualizerModal';
import PersonaSelectorModal from './components/PersonaSelectorModal';
import RecommendationEngine from './components/RecommendationEngine';
import { FRAME_METADATA } from './data/framesData';

export default function App() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoFlight, setIsAutoFlight] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('Farmer');
  const [lang, setLang] = useState('mr'); // Default to Marathi (मराठी) for local farmers!

  // Modal open states
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [isLaminateOpen, setIsLaminateOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isEngineOpen, setIsEngineOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030a17] text-white selection:bg-amber-500 selection:text-black">
      {/* HTML5 Canvas Frame Scroll Engine with smooth parallax & particles */}
      <CanvasScroll 
        onFrameChange={setCurrentFrameIndex}
        currentFrameIndex={currentFrameIndex}
        isAutoFlight={isAutoFlight}
      />

      {/* Top Glass Navigation Bar with Multi-Language Dropdown */}
      <TopNav
        isAutoFlight={isAutoFlight}
        setIsAutoFlight={setIsAutoFlight}
        onOpenSim={() => setIsSimOpen(true)}
        onOpenEngine={() => setIsEngineOpen(true)}
        onOpenLaminate={() => setIsLaminateOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Center Hero Typography Overlay */}
      <HeroOverlay
        currentFrameIndex={currentFrameIndex}
        onOpenSim={() => setIsSimOpen(true)}
        onOpenEngine={() => setIsEngineOpen(true)}
        onOpenLaminate={() => setIsLaminateOpen(true)}
        lang={lang}
      />

      {/* Pinned 3D-positioned Canvas Hotspots */}
      <Hotspots currentFrameIndex={currentFrameIndex} lang={lang} />

      {/* Right Side Vertical Progress Dot Column */}
      <RightDotNav currentFrameIndex={currentFrameIndex} lang={lang} />

      {/* Translucent Futuristic Bottom Dock (Matching User Reference Image) */}
      <BottomDock
        onOpenSim={() => setIsSimOpen(true)}
        onOpenEngine={() => setIsEngineOpen(true)}
        onOpenLaminate={() => setIsLaminateOpen(true)}
        onOpenPersona={() => setIsPersonaOpen(true)}
        selectedPersona={selectedPersona}
        currentFrameIndex={currentFrameIndex}
        lang={lang}
      />

      {/* Invisible Tall Scroll Container to Drive Canvas Scroll Physics */}
      <div 
        className="relative z-0 pointer-events-none" 
        style={{ height: `${FRAME_METADATA.length * 100}vh` }}
      />

      {/* Interactive Feature Modals */}
      <ShelfLifeModal 
        isOpen={isSimOpen} 
        onClose={() => setIsSimOpen(false)} 
        lang={lang}
        selectedPersona={selectedPersona}
      />

      <LaminateVisualizerModal 
        isOpen={isLaminateOpen} 
        onClose={() => setIsLaminateOpen(false)} 
        lang={lang}
      />

      <RecommendationEngine 
        isOpen={isEngineOpen} 
        onClose={() => setIsEngineOpen(false)} 
        lang={lang}
      />

      <PersonaSelectorModal 
        isOpen={isPersonaOpen} 
        onClose={() => setIsPersonaOpen(false)} 
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        lang={lang}
      />
    </div>
  );
}
