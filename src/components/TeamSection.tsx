import React from 'react';
import { useInView, useTypewriter } from '../hooks/useAnimations';

const teamMembers = [
  {
    name: 'land_lmao',
    role: 'Owner',
    github: 'https://github.com/LandWarderer2772',
    avatar: 'https://github.com/LandWarderer2772.png',
  },
  {
    name: 'onlyashd',
    role: 'Developer',
    github: 'https://github.com/onlyashd',
    avatar: '/ash.png',
  },
];

export const TeamSection: React.FC = () => {
  const teamHeading = useInView();
  const teamHeadingText = useTypewriter('$ cat /team', 50, 0, teamHeading.isInView);

  return (
    <section className="relative py-24 px-4 bg-surface border-t border-outline/30">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 right-10 w-64 h-64 rounded-full bg-primary opacity-[0.05] blur-3xl" />
        <div className="absolute -bottom-10 left-8 w-48 h-48 rounded-full bg-secondary opacity-[0.08] blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={teamHeading.ref}
            className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight font-terminal min-h-[3rem]"
          >
            {teamHeadingText.displayedText}
            {!teamHeadingText.isComplete && teamHeading.isInView && <span className="animate-pulse">_</span>}
          </h2>
          <p className="mt-4 text-sm md:text-base text-on-surface-muted max-w-xl mx-auto">
            The humans keeping Futon fast, clean, and reader-first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.github}
              className={`group relative overflow-hidden bg-surface-elevated border-2 border-primary/20 terminal-box px-6 pt-10 pb-6 flex flex-col items-center text-center transition-all duration-700 ${
                teamHeading.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute top-3 right-4 text-primary/30 text-xs font-terminal">
                [{String(index + 1).padStart(2, '0')}]
              </div>
              <img
                src={member.avatar}
                alt={`${member.name} profile`}
                loading="lazy"
                className="w-24 h-24 rounded-full border-2 border-primary/40 shadow-[0_0_24px_rgba(255,107,53,0.2)]"
              />
              <h3 className="mt-5 text-lg font-bold text-on-surface tracking-tight font-terminal">
                {member.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-on-surface-muted">
                {member.role}
              </p>
              <a
                href={member.github}
                aria-label={`${member.name} on GitHub`}
                className="mt-6 inline-flex items-center justify-center w-10 h-10 rounded-full border border-primary/40 text-primary hover:text-background hover:bg-primary transition-colors duration-300 terminal-box"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.19-1.12-1.5-1.12-1.5-.92-.65.07-.64.07-.64 1.02.07 1.56 1.08 1.56 1.08.9 1.6 2.37 1.14 2.95.87.09-.68.35-1.14.64-1.4-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.2 9.2 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.46.1 2.72.64.72 1.02 1.64 1.02 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.6.69.48A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
