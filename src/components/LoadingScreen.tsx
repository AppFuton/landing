import React, { useEffect, useState, useRef, useMemo } from 'react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [version, setVersion] = useState('v9.6.14');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedPointsRef = useRef<Set<number>>(new Set());

  // Fetch latest release version from GitHub
  useEffect(() => {
    fetch('https://api.github.com/repos/AppFuton/Futon/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data.tag_name) {
          setVersion(data.tag_name);
        }
      })
      .catch(err => console.error('Failed to fetch Futon version:', err));
  }, []);

  const LOG_LINES = useMemo(() => [
    { pct: 2,  text: `> Booting Futon ${version}...` },
    { pct: 5,  text: '> Forked from KotatsuApp/Kotatsu — standing on shoulders of giants' },
    { pct: 8,  text: '> Checking Android SDK (minSdk 23, compileSdk 36)...' },
    { pct: 11, text: '> Loading extensions...' },
    { pct: 14, text: '> Resolving futon-parsers repository...' },
    { pct: 17, text: '> Indexing manga sources... [1,200+ found]' },
    { pct: 20, text: '> WARNING: some sources are outdated. devs aware. they\'re on it (probably)' },
    { pct: 23, text: '> Connecting to sources...' },
    { pct: 26, text: '> Source check: MangaDex ✓  MangaSee ✓  Webtoons ✓' },
    { pct: 29, text: '> Source check: NHentai ... skipping (you know why)' },
    { pct: 32, text: '> Mounting CBZ archive support...' },
    { pct: 35, text: '> Initializing Material You theming engine...' },
    { pct: 37, text: '> Applying dynamic color palette — looking fresh ngl' },
    { pct: 40, text: '> Preparing reader UI...' },
    { pct: 42, text: '> Loading webtoon scroll mode... (for the manhwa enjoyers)' },
    { pct: 45, text: '> Calibrating gesture controls... tap, swipe, pinch-to-zoom ✓' },
    { pct: 47, text: '> Configuring tablet layout... optimized for big brain readers' },
    { pct: 50, text: '> Syncing reading history... "yes I totally read that for the plot"' },
    { pct: 53, text: '> Loading bookmarks and favorites...' },
    { pct: 55, text: '> Enabling incognito mode... 👀 your secret is safe with us' },
    { pct: 58, text: '> Connecting tracking services: AniList ✓  MyAnimeList ✓  Shikimori ✓  Kitsu ✓' },
    { pct: 61, text: '> MAL score: 10/10. (bias detected. proceeding anyway)' },
    { pct: 63, text: '> Checking for chapter updates...' },
    { pct: 66, text: '> New chapter detected: "One Piece Ch. 1142" — it\'s never ending and we love it' },
    { pct: 68, text: '> Downloading offline chapters... no wifi? no problem.' },
    { pct: 71, text: '> Waking up the devs...' },
    { pct: 73, text: '> ping dev... [timeout 30s] ... [timeout 60s] ... left on read 💀' },
    { pct: 75, text: '> Setting up fingerprint / password lock... hide it from mom' },
    { pct: 77, text: '> Enabling cross-device sync via account... Google is watching. hi Google.' },
    { pct: 79, text: '> Loading recommendations engine... "you liked Berserk? have you tried MORE pain?"' },
    { pct: 81, text: '> Manga recommendation: Oyasumi Punpun — not responsible for emotional damage' },
    { pct: 83, text: '> Checking GPL-3.0 license compliance... ✓ we\'re legal, mom' },
    { pct: 85, text: '> Joining Discord: discord.gg/9sqBHXhwzz ... server ping: 2ms' },
    { pct: 87, text: '> F-Droid package verified ✓  IzzyOnDroid verified ✓' },
    { pct: 89, text: '> Thanking Kotatsu contributors... 🙏 legends. absolute legends.' },
    { pct: 91, text: '> WARN: user has 847 unread chapters. seeking help.' },
    { pct: 93, text: '> "just one more chapter" protocol engaged...' },
    { pct: 95, text: '> it is 3am. we are not stopping.' },
    { pct: 97, text: '> All systems nominal. Futon is ready.' },
    { pct: 100, text: '> Ready!' },
  ], [version]);

  useEffect(() => {
    const LOADING_DURATION_MS = 3000;
    const UPDATE_INTERVAL_MS = 50;
    var steps = LOADING_DURATION_MS / UPDATE_INTERVAL_MS;
    var increment = 100 / steps;
    const waitTime = 2000;

    // Reset pause tracking for this animation
    pausedPointsRef.current.clear();

    const startProgressTimer = () => {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(onComplete, waitTime);
            return 100;
          }
          // Pause at 30%
          if (Math.floor(next) === 30 && !pausedPointsRef.current.has(30)) {
            pausedPointsRef.current.add(30);
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(startProgressTimer, 500);
            steps-=20; 
            return 30;
          }
          // Pause at 80%
          if (Math.floor(next) === 80 && !pausedPointsRef.current.has(80)) {
            pausedPointsRef.current.add(80);
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(startProgressTimer, 1000);
            steps+=40;
            return 80;
          }
          return next;
        });
      }, UPDATE_INTERVAL_MS);
    };

    startProgressTimer();

    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearInterval(dotsTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const count = LOG_LINES.filter((l) => progress >= l.pct).length;
    setVisibleLines(count);
  }, [progress]);

  const progressInt = Math.floor(progress);
  const ASCII_BAR_WIDTH = 40;
  const filledChars = Math.floor((progressInt / 100) * ASCII_BAR_WIDTH);
  const emptyChars = ASCII_BAR_WIDTH - filledChars;

  const shownLines = LOG_LINES.slice(0, visibleLines);
  // show last 7 lines in the scrolling window
  const displayLines = shownLines.slice(-7);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center font-mono">
      <div className="text-center space-y-6 px-4 w-full max-w-2xl">
        <pre className="text-primary text-xs sm:text-sm md:text-base leading-tight select-none">
{`
███████╗██╗   ██╗████████╗ ██████╗ ███╗   ██╗
██╔════╝██║   ██║╚══██╔══╝██╔═══██╗████╗  ██║
█████╗  ██║   ██║   ██║   ██║   ██║██╔██╗ ██║
██╔══╝  ██║   ██║   ██║   ██║   ██║██║╚██╗██║
██║     ╚██████╔╝   ██║   ╚██████╔╝██║ ╚████║
╚═╝      ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
`}
        </pre>

        <div className="text-on-surface text-sm md:text-base">
          <span className="text-primary">&gt;</span> INITIALIZING MANGA READER{dots}
        </div>

        {/* Scrolling log window */}
        <div className="text-left text-xs md:text-sm space-y-0.5 max-w-2xl mx-auto min-h-[8rem] flex flex-col justify-end">
          {displayLines.map((line, i) => {
            const isLast = i === displayLines.length - 1;
            const isReady = line.pct >= 100;
            return (
              <div
                key={line.pct}
                className={`transition-opacity duration-200 ${
                  isLast
                    ? isReady
                      ? 'text-primary animate-pulse opacity-100'
                      : 'text-on-surface opacity-100'
                    : 'text-on-surface-muted opacity-60'
                }`}
              >
                {line.text}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="text-on-surface-muted text-xs md:text-sm">
            <span className="text-primary">[</span>
            <span className="text-primary">{'█'.repeat(filledChars)}</span>
            <span className="text-outline">{'░'.repeat(emptyChars)}</span>
            <span className="text-primary">]</span>
          </div>
          <div className="text-primary text-sm md:text-base tabular-nums">
            {progressInt}%
          </div>
        </div>
      </div>
    </div>
  );
};