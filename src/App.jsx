import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import BottomDock from './components/BottomDock';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import GetRecommendation from './pages/GetRecommendation';
import MaterialDatabase from './pages/MaterialDatabase';
import ShelfLifePredictor from './pages/ShelfLifePredictor';
import MapAdvisor from './pages/MapAdvisor';
import SustainabilityAnalyzer from './pages/SustainabilityAnalyzer';
import QrTraceability from './pages/QrTraceability';
import ReportsHistory from './pages/ReportsHistory';
import KnowledgeBase from './pages/KnowledgeBase';
import UserAccount from './pages/UserAccount';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isAutoFlight, setIsAutoFlight] = useState(false);
  const [lang, setLang] = useState('mr'); // Default to Marathi (मराठी)

  return (
    <Router>
      <div className="relative min-h-screen bg-[#030a17] text-white selection:bg-amber-500 selection:text-black font-sans">
        
        {/* Top Glass Navigation Bar with Multi-Language Dropdown */}
        <TopNav
          isAutoFlight={isAutoFlight}
          setIsAutoFlight={setIsAutoFlight}
          lang={lang}
          setLang={setLang}
        />

        {/* Dynamic Route Content */}
        <Routes>
          <Route path="/" element={
            <Home 
              lang={lang} 
              currentFrameIndex={currentFrameIndex} 
              setCurrentFrameIndex={setCurrentFrameIndex}
              isAutoFlight={isAutoFlight}
            />
          } />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/recommendation" element={<GetRecommendation lang={lang} />} />
          <Route path="/database" element={<MaterialDatabase lang={lang} />} />
          <Route path="/shelf-life" element={<ShelfLifePredictor lang={lang} />} />
          <Route path="/map-advisor" element={<MapAdvisor lang={lang} />} />
          <Route path="/sustainability" element={<SustainabilityAnalyzer lang={lang} />} />
          <Route path="/qr-traceability" element={<QrTraceability lang={lang} />} />
          <Route path="/history" element={<ReportsHistory lang={lang} />} />
          <Route path="/knowledge-base" element={<KnowledgeBase lang={lang} />} />
          <Route path="/account" element={<UserAccount lang={lang} />} />
          <Route path="/admin" element={<AdminPanel lang={lang} />} />
        </Routes>

        {/* Translucent Futuristic Bottom Dock */}
        <BottomDock
          currentFrameIndex={currentFrameIndex}
          lang={lang}
        />
      </div>
    </Router>
  );
}
