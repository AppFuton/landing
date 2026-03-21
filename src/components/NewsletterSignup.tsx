import React, { useState, useEffect } from 'react';

const terminalMessages = [
  '> Brainstorming changelogs...',
  '> Collecting emails...',
  '> Packaging newsletter...',
  '> Sending emails...'
];

interface NewsletterSignupProps {
  isVisible: boolean;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ isVisible }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (status === 'loading') {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % terminalMessages.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setCurrentMessageIndex(0);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('success');
        setMessage('Successfully subscribed!');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="sr-only">Email address</label>
        <div 
          className={`flex gap-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 border-2 border-primary/30 bg-surface-elevated text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary placeholder-on-surface-muted terminal-box"
            placeholder="user@domain.xyz"
            disabled={status === 'loading'}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="px-6 py-2 bg-primary text-background font-medium font-terminal uppercase tracking-wider text-sm hover:bg-primary-hover transition-colors disabled:opacity-50 terminal-box border-2 border-primary"
          >
            {status === 'loading' ? '[...]' : '[ SEND ]'}
          </button>
        </div>
        
        {status === 'loading' && (
          <div className="text-primary text-sm font-mono animate-pulse">
            <span className="text-primary">&gt;</span> {terminalMessages[currentMessageIndex]}
          </div>
        )}
        
        {status === 'success' && (
          <p className="text-primary text-sm font-mono">
            <span className="text-primary">&gt;</span> {message}
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-red-500 text-sm font-mono">
            <span className="text-red-500">!</span> {message}
          </p>
        )}
      </form>
    </div>
  );
};
