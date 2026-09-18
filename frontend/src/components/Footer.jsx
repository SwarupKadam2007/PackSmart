import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand-green/10 dark:bg-brand-green/20 p-2 rounded-xl">
              <Package className="w-5 h-5 text-brand-green dark:text-emerald-400" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              pack-<span className="text-brand-green">smart</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            AI-powered logistics software and shelf-life optimization for a faster, leaner, and zero-waste food supply chain.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/recommendation" className="hover:text-brand-green transition-colors">Packaging Engine</Link></li>
            <li><Link to="/database" className="hover:text-brand-green transition-colors">Materials Database</Link></li>
            <li><Link to="/shelf-life" className="hover:text-brand-green transition-colors">Shelf-Life Predictor</Link></li>
            <li><Link to="/sustainability" className="hover:text-brand-green transition-colors">Eco Analyzer</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Resources</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/knowledge-base" className="hover:text-brand-green transition-colors">Knowledge Base</Link></li>
            <li><Link to="/qr-traceability" className="hover:text-brand-green transition-colors">QR Traceability</Link></li>
            <li><Link to="/map-advisor" className="hover:text-brand-green transition-colors">Map Advisor</Link></li>
            <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Sustainability Badge */}
        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-brand-green dark:text-emerald-400 font-bold text-xs">
            <Leaf className="w-4 h-4" />
            <span>Zero-Waste Commitment</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Empowering agricultural supply chains to reduce spoilage, save costs, and choose recyclable barrier structures.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© {new Date().getFullYear()} PackSmart Logistics AI. All rights reserved.</p>
        <p className="flex items-center gap-1">
          <span>Engineered for a sustainable future</span>
        </p>
      </div>
    </footer>
  );
}
