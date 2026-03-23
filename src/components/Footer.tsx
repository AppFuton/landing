import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-outline/30 text-on-surface py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="text-xl font-bold mb-6 tracking-tight text-on-surface">About Futon</h3>
          <p className="text-on-surface-muted leading-relaxed">
            A free, open-source manga reader for Android. 
            Read your favorite manga from a variety of sources in one convenient app.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 tracking-tight text-on-surface">Links</h3>
          <ul className="space-y-3 text-on-surface-muted">
            <li><a href="https://futonapp.pages.dev" className="hover:text-primary transition-colors">Documentation</a></li>
            <li><a href="https://github.com/AppFuton/Futon/" className="hover:text-primary transition-colors">Source Code</a></li>
            <li><a href="https://github.com/AppFuton/Futon/releases" className="hover:text-primary transition-colors">Releases</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 tracking-tight text-on-surface">Contact</h3>
          <ul className="space-y-3 text-on-surface-muted">
            <li><a href="https://discord.gg/9sqBHXhwzz" className="hover:text-primary transition-colors">Discord</a></li>
            <li><a href="mailto:futon@waifu.club" className="hover:text-primary transition-colors">Email Support</a></li>
            <li><a href="/logs">View Loading Logs</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-outline/30 text-center text-on-surface-muted/60">
        <p>&copy;2026 <a href="https://github.com/AppFuton/Futon/">Futon</a>. Open source under GPL-3.0.</p>
        <p>Made with ❤️</p>
      </div>
    </footer>
  );
};
