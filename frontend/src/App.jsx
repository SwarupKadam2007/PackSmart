import React, { useState, useEffect } from 'react';
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
import LaunchChecklist from './pages/LaunchChecklist';
import UserAccount from './pages/UserAccount';
import AdminPanel from './pages/AdminPanel';

function AppContent() {
  const [lang, setLang] = useState('en'); // Default to English

  useEffect(() => {
    document.documentElement.lang = lang;

    const fontLinks = {
      mr: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700;800&display=swap',
      hi: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700;800&display=swap',
      pa: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@400;500;700;800&display=swap',
      gu: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Gujarati:wght@400;500;700;800&display=swap'
    };

    if (fontLinks[lang]) {
      let link = document.getElementById('dynamic-lang-font');
      if (!link) {
        link = document.createElement('link');
        link.id = 'dynamic-lang-font';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      if (link.href !== fontLinks[lang]) {
        link.href = fontLinks[lang];
      }
    }
  }, [lang]);

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text selection:bg-theme-accent selection:text-black font-sans transition-colors duration-300 flex flex-col justify-between">
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
          <Route path="/launch-checklist" element={<LaunchChecklist lang={lang} />} />
          <Route path="/account" element={<UserAccount lang={lang} />} />
          <Route path="/admin" element={<AdminPanel lang={lang} />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer lang={lang} />
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
