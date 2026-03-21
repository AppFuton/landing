import React, { useEffect, useState } from 'react';

export const ParallaxBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      data-testid="parallax-bg"
      className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-surface to-background"
    >
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96, 165, 250, 0.1) 2px, rgba(96, 165, 250, 0.1) 4px)',
        }}
      />
      
      <div 
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary opacity-5 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div 
        className="absolute top-1/2 right-20 w-48 h-96 rounded-lg bg-primary opacity-[0.03] blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-20 left-1/3 w-32 h-32 rounded-full bg-primary opacity-5 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.8}px)` }}
      />
    </div>
  );
};
