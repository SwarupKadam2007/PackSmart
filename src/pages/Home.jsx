import React from 'react';
import CanvasScroll from '../components/CanvasScroll';
import HeroOverlay from '../components/HeroOverlay';
import Hotspots from '../components/Hotspots';
import RightDotNav from '../components/RightDotNav';
import { FRAME_METADATA } from '../data/framesData';

export default function Home({ lang, currentFrameIndex, setCurrentFrameIndex, isAutoFlight, onOpenSim, onOpenEngine, onOpenLaminate }) {
  return (
    <>
      <CanvasScroll 
        onFrameChange={setCurrentFrameIndex}
        currentFrameIndex={currentFrameIndex}
        isAutoFlight={isAutoFlight}
      />

      <HeroOverlay
        currentFrameIndex={currentFrameIndex}
        onOpenSim={onOpenSim}
        onOpenEngine={onOpenEngine}
        onOpenLaminate={onOpenLaminate}
        lang={lang}
      />

      <Hotspots currentFrameIndex={currentFrameIndex} lang={lang} />
      <RightDotNav currentFrameIndex={currentFrameIndex} lang={lang} />

      {/* Invisible Tall Scroll Container to Drive Canvas Scroll Physics */}
      <div 
        className="relative z-0 pointer-events-none" 
        style={{ height: `${FRAME_METADATA.length * 100}vh` }}
      />
    </>
  );
}
