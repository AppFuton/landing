import React, { MutableRefObject, useState } from 'react';

interface DownloadSectionProps {
  heading: string;
  isHeadingComplete: boolean;
  isVisible: boolean;
  headingRef: MutableRefObject<HTMLDivElement | null>;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  heading, 
  isHeadingComplete, 
  isVisible,
  headingRef 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <section className="py-20 text-center px-4">
      <h2 ref={headingRef} className="text-2xl md:text-3xl font-bold mb-12 text-on-surface font-terminal min-h-[2.5rem]">
        {heading}
        {!isHeadingComplete && isVisible && <span className="animate-pulse">_</span>}
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a 
          href="https://f-droid.org/packages/io.github.landwarderer.futon/" 
          className={`px-8 py-3 bg-primary text-background font-semibold hover:bg-primary-hover transition-all duration-500 terminal-box border-2 border-primary font-terminal uppercase tracking-wider text-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          [ FDroid ]
        </a>
        <a 
          href="https://apt.izzysoft.de/fdroid/index/apk/io.github.landwarderer.futon" 
          className={`px-8 py-3 bg-primary text-background font-semibold hover:bg-primary-hover transition-all duration-500 terminal-box border-2 border-primary font-terminal uppercase tracking-wider text-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          [ IzzyOnDroid ]
        </a>
        <a 
          href="https://github.com/AppFuton/Futon/releases" 
          className={`relative px-8 py-3 bg-secondary-container text-on-surface font-semibold hover:bg-secondary transition-all duration-500 terminal-box border-2 border-secondary font-terminal uppercase tracking-wider text-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-primary text-background text-xs font-terminal whitespace-nowrap rounded border border-primary shadow-lg animate-fade-in pointer-events-none z-50">
              We recommend F-Droid/IzzyOnDroid for security & updates
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
            </div>
          )}
          [ DIRECT APK ]
        </a>
      </div>
    </section>
  );
};
