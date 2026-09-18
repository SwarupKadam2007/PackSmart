import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingNav from './components/LandingNav';
import Footer from './components/Footer';

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

function AppContent() {
  const [lang, setLang] = useState('en'); // Default to English

  return (
    <div className="relative min-h-screen bg-brand-bg dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-amber-500 selection:text-black font-sans transition-colors duration-300 flex flex-col justify-between">
      {/* Global Header Navigation */}
      <LandingNav lang={lang} setLang={setLang} />

      {/* Main Dynamic Route Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
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
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
