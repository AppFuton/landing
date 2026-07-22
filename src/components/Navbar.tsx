import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'FEATURES', href: '#features' },
  { label: 'SCREENSHOTS', href: '#screenshots' },
  { label: 'DOWNLOAD', href: '#download' },
  { label: 'SUPPORTERS', href: '#supporters' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline/30 font-terminal transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-b border-primary/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 group" 
            onClick={(e) => { 
              e.preventDefault(); 
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo(0, { duration: 1.2 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }
            }}
          >
            <div className="w-3.5 h-3.5 bg-primary rounded-sm shadow-[0_0_8px_rgba(255,107,53,0.5)] group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-xl font-bold text-on-surface tracking-tight uppercase font-terminal text-scanline">
              FUTON
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-bold text-on-surface-muted hover:text-primary transition-colors duration-200 group uppercase tracking-wider font-terminal"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left shadow-[0_0_8px_rgba(255,107,53,0.5)]" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 group"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-on-surface transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-on-surface transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-on-surface transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md border-t border-outline/20 ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block px-4 py-3 text-sm font-bold text-on-surface-muted hover:text-primary hover:bg-primary/5 border-l-4 border-transparent hover:border-primary transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
