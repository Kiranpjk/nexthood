'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const LoadingAnimation = ({ text = "Analyzing..." }: { text?: string }) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationRef.current) return;

    const animation = anime.timeline({
      loop: true,
      direction: 'alternate',
    }).add({
      targets: animationRef.current.querySelectorAll('.loading-bar'),
      scaleY: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 700,
      delay: anime.stagger(100, {grid: [5, 5], from: 'center'})
    });
    
    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div ref={animationRef} className="grid grid-cols-5 gap-1 h-24 w-24">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="loading-bar bg-primary rounded-sm" style={{ transformOrigin: 'bottom' }} />
        ))}
      </div>
      <p className="text-lg font-semibold text-primary animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingAnimation;
