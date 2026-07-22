import React, { useEffect, useRef } from 'react';

interface Shape {
  type: 'rect' | 'circle' | 'cross' | 'square' | 'line' | 'ring' | 'triangle';
  x: string;
  y: string;
  size: number;
  rotation: number;
  speed: number;
  color: string;
  opacity: number;
  borderWidth: number;
  filled?: boolean;
  layer: 'bg' | 'fg';
}

const SHAPES: Shape[] = [
  // Background shapes - large, slow, thin borders matching the terminal vibe
  { type: 'rect', x: '5%', y: '200px', size: 180, rotation: 12, speed: 0.15, color: '#FF6B35', opacity: 0.15, borderWidth: 1, layer: 'bg' },
  { type: 'circle', x: '80%', y: '350px', size: 220, rotation: 0, speed: 0.1, color: '#60A5FA', opacity: 0.14, borderWidth: 1, layer: 'bg' },
  { type: 'square', x: '70%', y: '800px', size: 120, rotation: 45, speed: 0.2, color: '#FFB26B', opacity: 0.15, borderWidth: 1, layer: 'bg' },
  { type: 'rect', x: '15%', y: '1200px', size: 250, rotation: -8, speed: 0.12, color: '#60A5FA', opacity: 0.12, borderWidth: 1, layer: 'bg' },
  { type: 'circle', x: '50%', y: '1800px', size: 160, rotation: 0, speed: 0.25, color: '#FFB26B', opacity: 0.14, borderWidth: 1, layer: 'bg' },
  { type: 'cross', x: '85%', y: '600px', size: 60, rotation: 15, speed: 0.18, color: '#FF6B35', opacity: 0.18, borderWidth: 0, filled: true, layer: 'bg' },
  { type: 'rect', x: '40%', y: '2400px', size: 200, rotation: 20, speed: 0.15, color: '#60A5FA', opacity: 0.12, borderWidth: 1, layer: 'bg' },
  { type: 'line', x: '25%', y: '1600px', size: 300, rotation: -30, speed: 0.1, color: '#FF6B35', opacity: 0.12, borderWidth: 1, filled: true, layer: 'bg' },
  { type: 'square', x: '90%', y: '2000px', size: 100, rotation: 30, speed: 0.2, color: '#FFB26B', opacity: 0.14, borderWidth: 1, layer: 'bg' },
  { type: 'ring', x: '10%', y: '2800px', size: 180, rotation: 0, speed: 0.15, color: '#60A5FA', opacity: 0.14, borderWidth: 1, layer: 'bg' },
  
  // Distributed background shapes
  { type: 'cross', x: '75%', y: '3200px', size: 70, rotation: 15, speed: 0.15, color: '#FF6B35', opacity: 0.14, borderWidth: 0, filled: true, layer: 'bg' },
  { type: 'circle', x: '12%', y: '3600px', size: 190, rotation: 0, speed: 0.12, color: '#60A5FA', opacity: 0.15, borderWidth: 1, layer: 'bg' },
  { type: 'rect', x: '65%', y: '4000px', size: 210, rotation: -12, speed: 0.2, color: '#FFB26B', opacity: 0.13, borderWidth: 1, layer: 'bg' },
  { type: 'square', x: '20%', y: '4400px', size: 140, rotation: 45, speed: 0.22, color: '#60A5FA', opacity: 0.14, borderWidth: 1, layer: 'bg' },
  { type: 'ring', x: '80%', y: '4800px', size: 160, rotation: 0, speed: 0.18, color: '#FF6B35', opacity: 0.15, borderWidth: 1, layer: 'bg' },
  { type: 'line', x: '45%', y: '5200px', size: 250, rotation: 30, speed: 0.1, color: '#FFB26B', opacity: 0.12, borderWidth: 1, filled: true, layer: 'bg' },

  // Foreground shapes - smaller, move FASTER than viewport (speed > 1.0) for depth
  { type: 'square', x: '92%', y: '150px', size: 30, rotation: 45, speed: 1.3, color: '#FF6B35', opacity: 0.38, borderWidth: 1.5, layer: 'fg' },
  { type: 'cross', x: '3%', y: '500px', size: 24, rotation: 0, speed: 1.45, color: '#60A5FA', opacity: 0.4, borderWidth: 0, filled: true, layer: 'fg' },
  { type: 'square', x: '95%', y: '1000px', size: 20, rotation: 20, speed: 1.35, color: '#FF6B35', opacity: 0.35, borderWidth: 1.5, layer: 'fg' },
  { type: 'line', x: '8%', y: '1400px', size: 60, rotation: 45, speed: 1.4, color: '#60A5FA', opacity: 0.38, borderWidth: 1.5, filled: true, layer: 'fg' },
  { type: 'cross', x: '88%', y: '1900px', size: 20, rotation: 15, speed: 1.5, color: '#FFB26B', opacity: 0.38, borderWidth: 0, filled: true, layer: 'fg' },
  { type: 'square', x: '5%', y: '2200px', size: 25, rotation: -10, speed: 1.3, color: '#FF6B35', opacity: 0.32, borderWidth: 1.5, layer: 'fg' },
  { type: 'line', x: '93%', y: '2600px', size: 50, rotation: -35, speed: 1.45, color: '#60A5FA', opacity: 0.35, borderWidth: 1.5, filled: true, layer: 'fg' },
  { type: 'triangle', x: '7%', y: '3000px', size: 35, rotation: 20, speed: 1.35, color: '#FF6B35', opacity: 0.32, borderWidth: 0, filled: true, layer: 'fg' },
  
  // Distributed foreground shapes
  { type: 'cross', x: '90%', y: '3300px', size: 22, rotation: 0, speed: 1.4, color: '#60A5FA', opacity: 0.38, borderWidth: 0, filled: true, layer: 'fg' },
  { type: 'square', x: '5%', y: '3750px', size: 28, rotation: 45, speed: 1.35, color: '#FF6B35', opacity: 0.35, borderWidth: 1.5, layer: 'fg' },
  { type: 'line', x: '88%', y: '4200px', size: 55, rotation: 15, speed: 1.5, color: '#FFB26B', opacity: 0.32, borderWidth: 1.5, filled: true, layer: 'fg' },
  { type: 'triangle', x: '10%', y: '4600px', size: 30, rotation: -10, speed: 1.45, color: '#60A5FA', opacity: 0.36, borderWidth: 0, filled: true, layer: 'fg' },
  { type: 'square', x: '92%', y: '5000px', size: 24, rotation: 30, speed: 1.3, color: '#FF6B35', opacity: 0.35, borderWidth: 1.5, layer: 'fg' },
  { type: 'cross', x: '6%', y: '5350px', size: 26, rotation: 45, speed: 1.4, color: '#FFB26B', opacity: 0.38, borderWidth: 0, filled: true, layer: 'fg' },
];

function renderShape(shape: Shape) {
  const common: React.CSSProperties = {
    position: 'absolute' as const,
    left: shape.x,
    top: shape.y,
    opacity: shape.opacity,
    transform: `translate3d(
      calc(var(--mouse-x, 0) * ${shape.speed * 40}px),
      calc(var(--scroll-y, 0) * ${-shape.speed}px + var(--mouse-y, 0) * ${shape.speed * 40}px),
      0px
    ) rotate(${shape.rotation}deg)`,
    willChange: 'transform',
    pointerEvents: 'none' as const,
    filter: shape.color === '#60A5FA'
      ? 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.6))'
      : 'drop-shadow(0 0 5px rgba(255, 107, 53, 0.6))',
  };

  switch (shape.type) {
    case 'rect':
      return (
        <div style={{
          ...common,
          width: `${shape.size}px`,
          height: `${shape.size * 0.6}px`,
          border: `${shape.borderWidth}px solid ${shape.color}`,
          background: shape.filled ? shape.color : 'transparent',
        }} />
      );
    case 'circle':
      return (
        <div style={{
          ...common,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          borderRadius: '50%',
          border: `${shape.borderWidth}px solid ${shape.color}`,
          background: shape.filled ? shape.color : 'transparent',
        }} />
      );
    case 'ring':
      return (
        <div style={{
          ...common,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          borderRadius: '50%',
          border: `${shape.borderWidth}px dashed ${shape.color}`,
          background: 'transparent',
        }} />
      );
    case 'square':
      return (
        <div style={{
          ...common,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
          border: `${shape.borderWidth}px solid ${shape.color}`,
          background: shape.filled ? shape.color : 'transparent',
        }} />
      );
    case 'cross': {
      const arm = shape.size;
      const thickness = Math.max(shape.size * 0.15, 2);
      return (
        <div style={{ ...common, width: `${arm}px`, height: `${arm}px` }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: `${thickness}px`,
            marginTop: `-${thickness / 2}px`,
            background: shape.color,
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            height: '100%',
            width: `${thickness}px`,
            marginLeft: `-${thickness / 2}px`,
            background: shape.color,
          }} />
        </div>
      );
    }
    case 'line':
      return (
        <div style={{
          ...common,
          width: `${shape.size}px`,
          height: `${shape.borderWidth}px`,
          background: shape.color,
        }} />
      );
    case 'triangle':
      return (
        <div style={{
          ...common,
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
        }} />
      );
    default:
      return null;
  }
}

export const ParallaxBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    // Linear interpolation (lerp) state to smooth scroll and mouse moves
    const state = {
      targetScrollY: window.scrollY,
      currentScrollY: window.scrollY,
      targetMouseX: 0,
      currentMouseX: 0,
      targetMouseY: 0,
      currentMouseY: 0,
    };

    const handleScroll = () => {
      state.targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor coordinate to [-0.5, 0.5] range
      state.targetMouseX = (e.clientX / window.innerWidth) - 0.5;
      state.targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const tick = () => {
      if (!active) return;

      // 0.1 scroll damping, 0.08 mouse damping for soft, spring-like lag
      state.currentScrollY += (state.targetScrollY - state.currentScrollY) * 0.1;
      state.currentMouseX += (state.targetMouseX - state.currentMouseX) * 0.08;
      state.currentMouseY += (state.targetMouseY - state.currentMouseY) * 0.08;

      // Update global document custom properties
      document.documentElement.style.setProperty('--scroll-y', state.currentScrollY.toFixed(2));
      document.documentElement.style.setProperty('--mouse-x', state.currentMouseX.toFixed(4));
      document.documentElement.style.setProperty('--mouse-y', state.currentMouseY.toFixed(4));

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup custom properties when components are removed
      document.documentElement.style.removeProperty('--scroll-y');
      document.documentElement.style.removeProperty('--mouse-x');
      document.documentElement.style.removeProperty('--mouse-y');
    };
  }, []);

  const bgShapes = SHAPES.filter(s => s.layer === 'bg');
  const fgShapes = SHAPES.filter(s => s.layer === 'fg');

  return (
    <>
      {/* Background layer */}
      <div
        ref={containerRef}
        data-testid="parallax-bg"
        className="fixed inset-0 overflow-hidden bg-gradient-to-b from-surface to-background"
        style={{ zIndex: -1 }}
      >
        {/* Blue Scanline overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96, 165, 250, 0.1) 2px, rgba(96, 165, 250, 0.1) 4px)',
          }}
        />

        {/* Soft glowing blurs from original theme */}
        <div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary opacity-5 blur-3xl"
          style={{ 
            transform: 'translateY(calc(var(--scroll-y, 0) * 0.2 * 1px))',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute top-1/2 right-20 w-48 h-96 rounded-lg bg-primary opacity-[0.03] blur-3xl"
          style={{ 
            transform: 'translateY(calc(var(--scroll-y, 0) * 0.5 * 1px))',
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-32 h-32 rounded-full bg-primary opacity-5 blur-3xl"
          style={{ 
            transform: 'translateY(calc(var(--scroll-y, 0) * 0.8 * 1px))',
            willChange: 'transform'
          }}
        />

        {bgShapes.map((shape, i) => (
          <React.Fragment key={`bg-${i}`}>
            {renderShape(shape)}
          </React.Fragment>
        ))}
      </div>

      {/* Foreground layer */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 10 }}
      >
        {fgShapes.map((shape, i) => (
          <React.Fragment key={`fg-${i}`}>
            {renderShape(shape)}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
