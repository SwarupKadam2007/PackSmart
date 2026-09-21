import React from 'react';

/**
 * Consistent SVG Illustration Library
 * Style Guide:
 * - Outline-based with soft colored filled accents
 * - Responsive sizing (w-full, h-full by default)
 * - Support for Tailwind color classes via currentColor and specific overrides
 * - Uses brand theme colors (theme-accent, theme-success, etc.)
 */

export const EngineIllustration = ({ className = "w-full h-full text-amber-400" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="20" width="60" height="60" rx="12" stroke="currentColor" strokeWidth="4" />
    <path d="M40 50 L60 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 40 L50 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
    <circle cx="80" cy="80" r="4" fill="currentColor" />
    <circle cx="80" cy="20" r="4" fill="currentColor" />
    <circle cx="20" cy="80" r="4" fill="currentColor" />
    <rect x="35" y="35" width="30" height="30" rx="6" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const MaterialsIllustration = ({ className = "w-full h-full text-emerald-400" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M25 75 L50 25 L75 75 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 45 L50 65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <rect x="25" y="55" width="50" height="20" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const ShelfLifeIllustration = ({ className = "w-full h-full text-blue-400" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" />
    <path d="M50 35 L50 50 L60 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="50" r="30" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

export const ChecklistIllustration = ({ className = "w-full h-full text-teal-400" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="25" y="20" width="50" height="60" rx="6" stroke="currentColor" strokeWidth="4" />
    <path d="M45 40 L70 40 M45 55 L60 55 M45 70 L65 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <rect x="32" y="38" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="32" y="53" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="32" y="68" width="6" height="6" rx="1" fill="currentColor" />
  </svg>
);
