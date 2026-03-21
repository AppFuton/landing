import React, { MutableRefObject } from 'react';

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
          href="https://github.com/AppFuton/Futon/" 
          className={`px-8 py-3 bg-surface-highest text-on-surface font-semibold hover:bg-outline transition-all duration-500 terminal-box border-2 border-outline font-terminal uppercase tracking-wider text-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          [ GITHUB ]
        </a>
        <a 
          href="https://github.com/AppFuton/Futon/releases" 
          className={`px-8 py-3 bg-secondary-container text-on-surface font-semibold hover:bg-secondary transition-all duration-500 terminal-box border-2 border-secondary font-terminal uppercase tracking-wider text-sm ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          [ DIRECT APK ]
        </a>
      </div>
    </section>
  );
};
