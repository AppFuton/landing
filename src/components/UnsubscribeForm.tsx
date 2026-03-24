import React, { useState, useEffect } from 'react';

const terminalMessages = [
  '> Checking subscription status...',
  '> Removing from mailing list...',
  '> Clearing preferences...',
  '> Finalizing unsubscribe...'
];

interface UnsubscribeFormProps {
  isVisible: boolean;
}

export const UnsubscribeForm: React.FC<UnsubscribeFormProps> = ({ isVisible }) => {
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
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setStatus('success');
        setMessage('Successfully unsubscribed from newsletter.');
        setEmail('');
      } else {
        throw new Error('Unsubscribe failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to unsubscribe. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 tracking-tight font-terminal">
            <span className="text-primary">$ unsubscribe</span>
          </h1>
          <p className="text-on-surface-muted text-base">
            We'll remove your email from our newsletter mailing list.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="sr-only">Email address</label>
          <div 
            className={`flex flex-col gap-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border-2 border-primary/30 bg-surface-elevated text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary placeholder-on-surface-muted terminal-box"
              placeholder="user@domain.xyz"
              disabled={status === 'loading'}
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="px-6 py-2 bg-red-600 text-background font-medium font-terminal uppercase tracking-wider text-sm hover:bg-red-700 transition-colors disabled:opacity-50 terminal-box border-2 border-red-600"
            >
              {status === 'loading' ? '[...]' : '[ UNSUBSCRIBE ]'}
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

        <div className="mt-8 pt-8 border-t border-outline/30">
          <p className="text-on-surface-muted text-xs font-mono">
            <span className="text-primary">&gt;</span> Having issues? <a href="mailto:futon@waifu.club" className="text-primary hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};
