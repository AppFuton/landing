import React from 'react';
import { useTypewriter } from '../hooks/useAnimations';

const features = [
  { icon: 'browse', title: '1000+ SOURCES', details: 'Access manga from over a thousand sources in multiple languages.' },
  { icon: 'instant_mix', title: 'CUSTOMIZABLE', details: 'Personalize your reading experience with advanced settings.' },
  { icon: 'sync', title: 'TRACK PROGRESS', details: 'Sync with MyAnimeList, AniList, Kitsu, and more.' },
  { icon: 'search', title: 'SMART SEARCH', details: 'Find manga quickly with global search across all extensions.' },
  { icon: 'download', title: 'OFFLINE MODE', details: 'Download chapters for offline reading anywhere, anytime.' },
  { icon: 'security', title: 'PRIVACY FIRST', details: 'Your data stays yours. Open source and tracker-free.' }
];

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
  isVisible: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, isVisible }) => {
  const titleText = useTypewriter(feature.title, 30, 300 + index * 200, isVisible);

  return (
    <div 
      className={`bg-surface-elevated border-2 border-primary/20 terminal-box hover:border-primary/40 hover:-translate-y-1 p-6 transition-all duration-500 group relative overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-2 right-2 text-primary/30 text-xs font-terminal">
        [{String(index + 1).padStart(2, '0')}]
      </div>
      <div className="material-symbols-outlined text-5xl mb-4 text-primary font-bold transform group-hover:scale-110 transition-transform duration-300 origin-left">{feature.icon}</div>
      <h3 className="text-lg font-bold mb-3 text-on-surface tracking-tight font-terminal uppercase min-h-[1.75rem]">
        {titleText.displayedText}
        {!titleText.isComplete && isVisible && <span className="animate-pulse">_</span>}
      </h3>
      <p className="text-sm text-on-surface-muted leading-relaxed">{feature.details}</p>
    </div>
  );
};

export const FeaturesGrid: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto" data-testid="features-grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
};
