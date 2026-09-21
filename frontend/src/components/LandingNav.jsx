import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Sun, Moon, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { LANGUAGES } from '../data/i18n';

export default function LandingNav({ lang, setLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const activePath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/recommendation', label: 'Engine' },
    { path: '/database', label: 'Materials' },
    { path: '/shelf-life', label: 'Shelf-Life' },
    { path: '/launch-checklist', label: 'Checklist' },
    { path: '/knowledge-base', label: 'Library' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors duration-300">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="bg-brand-green/10 dark:bg-brand-green/20 p-2 rounded-xl group-hover:scale-105 transition-transform">
          <Package className="w-5 h-5 text-brand-green dark:text-emerald-400" />
        </div>
        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          pack-<span className="text-brand-green">smart</span>
        </span>
      </Link>

      {/* Center Nav Links (Desktop) */}
      <div className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => {
          const isActive = activePath === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-all relative py-1 ${
                isActive
                  ? 'text-brand-green dark:text-emerald-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green dark:bg-emerald-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right Actions (Desktop) */}
      <div className="hidden md:flex items-center gap-3">
        {/* Multi-Language Selector Dropdown */}
        {setLang && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-brand-green dark:text-amber-400" />
              <span>{currentLangObj.flag} {currentLangObj.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-500 dark:text-amber-400" />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-400/40 rounded-2xl shadow-2xl py-2 z-50"
                >
                  <div className="px-3 py-1 text-[10px] font-mono text-slate-400 dark:text-amber-400/80 uppercase border-b border-slate-100 dark:border-white/10 mb-1">
                    SELECT LANGUAGE / भाषा
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                      className={`w-full px-4 py-2 text-xs text-left font-sans flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        lang === l.code ? 'text-brand-green dark:text-amber-300 font-bold bg-brand-green/10 dark:bg-amber-400/10' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
                      </span>
                      {lang === l.code && <span className="text-brand-green dark:text-amber-400 font-bold">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => toggleTheme()}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Dark</span>
            </>
          )}
        </button>

        <Link 
          to="/recommendation" 
          className="bg-brand-green text-white px-6 py-2.5 rounded-full font-medium hover:bg-brand-green/90 transition-all flex items-center gap-2 shadow-md shadow-brand-green/20"
        >
          Get Started <span>&rarr;</span>
        </Link>
      </div>

      {/* Mobile Controls */}
      <div className="flex items-center gap-2 md:hidden">
        {/* Mobile Language Button */}
        {setLang && (
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-amber-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <span>{currentLangObj.flag}</span>
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
          }}
          title="Toggle Theme"
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-amber-400 border border-slate-200 dark:border-slate-700 cursor-pointer"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="absolute top-20 right-4 left-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden z-50">
          {setLang && (
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400">LANGUAGE</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => { setLang(l.code); }}
                    className={`px-2 py-1 rounded-full text-xs ${
                      lang === l.code ? 'bg-brand-green text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setMobileOpen(false)}
              className="text-slate-800 dark:text-slate-200 font-medium py-2 border-b border-slate-100 dark:border-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/recommendation" 
            onClick={() => setMobileOpen(false)}
            className="bg-brand-green text-white text-center py-3 rounded-xl font-bold mt-2 shadow-lg"
          >
            Get Started &rarr;
          </Link>
        </div>
      )}
    </nav>
  );
}
