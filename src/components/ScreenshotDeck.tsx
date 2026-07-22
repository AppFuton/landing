import React, { useState, useEffect, useRef } from 'react';

const SCREENSHOTS = [
  '/screenshots/1.png',
  '/screenshots/2.png',
  '/screenshots/3.png',
  '/screenshots/4.png',
  '/screenshots/5.png',
];

// Fanned deck positions (from back to front)
const DECK_POSITIONS = [
  { rotation: -8, x: -25, y: 20 },
  { rotation: -4, x: -10, y: -5 },
  { rotation: 2, x: 5, y: 10 },
  { rotation: 6, x: 20, y: -10 },
  { rotation: -1, x: 0, y: 0 }, // Top-most card is centered
];

export const ScreenshotDeck: React.FC = () => {
  // deck stores the indices of screenshots in order from back to front (highest index is top card)
  const [deck, setDeck] = useState<number[]>([0, 1, 2, 3, 4]);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Don't auto-rotate if the user is hovering over any card
      if (isHoveredRef.current) return;

      // Card currently on top is the last element in the deck array
      const topCardIndex = deck[deck.length - 1];
      
      // Start slide out animation
      setAnimatingIndex(topCardIndex);

      // After 600ms (slide-out complete), move top card to the back
      setTimeout(() => {
        setDeck((prevDeck) => {
          const newDeck = [...prevDeck];
          const topCard = newDeck.pop();
          if (topCard !== undefined) {
            newDeck.unshift(topCard); // Insert at the beginning (back)
          }
          return newDeck;
        });
        setAnimatingIndex(null);
      }, 600);

    }, 3500); // Trigger every 3.5 seconds

    return () => clearInterval(interval);
  }, [deck]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative" 
        style={{ width: '280px', height: '500px' }}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {SCREENSHOTS.map((src, imgIndex) => {
          // Find the current position of this card in the deck
          const deckPosIndex = deck.indexOf(imgIndex);
          const isTop = deckPosIndex === deck.length - 1;
          const isAnimating = animatingIndex === imgIndex;
          const isCardHovered = hoveredIndex === imgIndex;
          
          // Base fanned coordinates
          const pos = DECK_POSITIONS[deckPosIndex] || DECK_POSITIONS[0];

          // Compute transform properties
          let tx = pos.x;
          let ty = pos.y;
          let rot = pos.rotation;
          let scale = 1;
          
          // zIndex logic: 
          // If animating (sliding left), it must stay on top of everything (zIndex 60)
          // If hovered, zIndex 50
          // Otherwise, indexed base zIndex (1 to 5)
          let zIndex = deckPosIndex + 1;
          if (isAnimating) {
            zIndex = 60;
            tx = -280; // Slide far to the left
            rot = -15;  // Tilt outward
          } else if (isCardHovered) {
            zIndex = 50;
            scale = 1.12;
          }

          return (
            <div
              key={src}
              className="absolute top-1/2 left-1/2 cursor-pointer select-none"
              style={{
                width: '220px',
                zIndex: zIndex,
                borderRadius: '0.75rem',
                overflow: 'hidden',
                transform: `
                  translate(-50%, -50%)
                  translateX(${tx}px)
                  translateY(${ty}px)
                  rotate(${rot}deg)
                  scale(${scale})
                `,
                transition: isAnimating 
                  ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease'
                  : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
                border: isCardHovered || (isTop && !isAnimating)
                  ? '1px solid rgba(255, 107, 53, 0.5)' 
                  : '1px solid rgba(255, 107, 53, 0.15)',
                boxShadow: isCardHovered || (isTop && !isAnimating)
                  ? '0 0 25px rgba(255, 107, 53, 0.35), 0 10px 30px rgba(0, 0, 0, 0.5)'
                  : '0 4px 20px rgba(0, 0, 0, 0.6)',
                background: '#0A0A0A',
              }}
              onMouseEnter={() => setHoveredIndex(imgIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={src}
                alt={`Futon app screenshot ${imgIndex + 1}`}
                className="w-full h-auto block"
                loading="lazy"
                draggable={false}
              />
              {/* Corner label */}
              <div
                className="absolute top-0 right-0 bg-primary/95 text-background text-xs font-bold font-terminal px-2 py-1 rounded-bl-lg shadow-sm"
                style={{ lineHeight: 1 }}
              >
                {String(imgIndex + 1).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
