import { useState } from 'react'
import { ParallaxBackground } from './components/ParallaxBackground'
import { Hero3D } from './components/Hero3D'
import { FeaturesGrid } from './components/FeaturesGrid'
import { ScreenshotCarousel } from './components/ScreenshotCarousel'
import { NewsletterSignup } from './components/NewsletterSignup'
import { DownloadSection } from './components/DownloadSection'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { useTypewriter, useInView } from './hooks/useAnimations'

const LOG_LINES = [
  '> Booting Futon v9.6.13...',
  '> Forked from KotatsuApp/Kotatsu — standing on shoulders of giants',
  '> Checking Android SDK (minSdk 23, compileSdk 36)...',
  '> Loading extensions...',
  '> Resolving futon-parsers repository...',
  '> Indexing manga sources... [1,200+ found]',
  '> WARNING: some sources are outdated. devs aware. they\'re on it (probably)',
  '> Connecting to sources...',
  '> Source check: MangaDex ✓  MangaSee ✓  Webtoons ✓',
  '> Source check: NHentai ... skipping (you know why)',
  '> Mounting CBZ archive support...',
  '> Initializing Material You theming engine...',
  '> Applying dynamic color palette — looking fresh ngl',
  '> Preparing reader UI...',
  '> Loading webtoon scroll mode... (for the manhwa enjoyers)',
  '> Calibrating gesture controls... tap, swipe, pinch-to-zoom ✓',
  '> Configuring tablet layout... optimized for big brain readers',
  '> Syncing reading history... "yes I totally read that for the plot"',
  '> Loading bookmarks and favorites...',
  '> Enabling incognito mode... 👀 your secret is safe with us',
  '> Connecting tracking services: AniList ✓  MyAnimeList ✓  Shikimori ✓  Kitsu ✓',
  '> MAL score: 10/10. (bias detected. proceeding anyway)',
  '> Checking for chapter updates...',
  '> New chapter detected: "One Piece Ch. 1142" — it\'s never ending and we love it',
  '> Downloading offline chapters... no wifi? no problem.',
  '> Waking up the devs...',
  '> ping dev... [timeout 30s] ... [timeout 60s] ... left on read 💀',
  '> Setting up fingerprint / password lock... hide it from mom',
  '> Enabling cross-device sync via account... Google is watching. hi Google.',
  '> Loading recommendations engine... "you liked Berserk? have you tried MORE pain?"',
  '> Manga recommendation: Oyasumi Punpun — not responsible for emotional damage',
  '> Checking GPL-3.0 license compliance... ✓ we\'re legal, mom',
  '> Joining Discord: discord.gg/9sqBHXhwzz ... server ping: 2ms',
  '> F-Droid package verified ✓  IzzyOnDroid verified ✓',
  '> Thanking Kotatsu contributors... 🙏 legends. absolute legends.',
  '> WARN: user has 847 unread chapters. seeking help.',
  '> "just one more chapter" protocol engaged...',
  '> it is 3am. we are not stopping.',
  '> All systems nominal. Futon is ready.',
  '> Ready!',
];

function LogsPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface p-8">
      <h1 className="text-4xl font-terminal font-bold mb-6">/logs</h1>
      <div className="rounded-xl border border-outline/50 bg-surface p-4 overflow-auto max-h-[80vh] space-y-1 font-mono text-sm">
        {LOG_LINES.map((line, index) => (
          <div key={index} className="text-on-surface-muted">
            <span className="text-primary">&gt;</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const path = window.location.pathname;

  if (path === '/logs') {
    return <LogsPage />;
  }
  if (path === '/discord') {
    return<meta http-equiv="refresh" content="0; url=https://discord.gg/9sqBHXhwzz" />
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return <MainContent />;
}

function MainContent() {
  const heroTitle = useTypewriter('> FUTON', 50, 0, true);
  const heroSubtitle = useTypewriter('[ MANGA_READER.APK ]', 60, 200, heroTitle.isComplete);
  
  const featuresHeading = useInView();
  const featuresHeadingText = useTypewriter('$ ls -la /features', 60, 0, featuresHeading.isInView);
  
  const screenshotsHeading = useInView();
  const screenshotsHeadingText = useTypewriter('$ cat screenshots.log', 60, 0, screenshotsHeading.isInView);
  
  const downloadHeading = useInView();
  const downloadHeadingText = useTypewriter('$ wget futon.apk', 60, 0, downloadHeading.isInView);
  
  const newsletterHeading = useInView();
  const newsletterHeadingText = useTypewriter('> ./subscribe --updates', 60, 0, newsletterHeading.isInView);

  return (
    <div className="relative">
      <ParallaxBackground />
      
      <section className="relative h-screen flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left px-8 md:px-16 z-10 pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-4 tracking-tight font-terminal text-scanline min-h-[4rem]">
            <span className="text-primary">{heroTitle.displayedText}</span>
            {!heroTitle.isComplete && <span className="animate-pulse">_</span>}
          </h1>
          <p className="text-xl md:text-2xl text-primary mb-6 font-medium font-terminal min-h-[2rem]">
            {heroSubtitle.displayedText}
            {!heroSubtitle.isComplete && heroTitle.isComplete && <span className="animate-pulse">_</span>}
          </p>
          <div
            className={`text-base md:text-lg text-on-surface-muted max-w-lg leading-relaxed border-l-2 border-primary/50 pl-4 transition-all duration-1000 ${
              heroSubtitle.isComplete ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            Open-source manga reader for Android.<br/>
            1000+ sources. Zero tracking. Built by readers.
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center">
          <Hero3D />
        </div>
      </section>
      
      <section className="py-24 px-4 bg-background border-t border-outline/30">
        <div className="max-w-7xl mx-auto">
          <h2 ref={featuresHeading.ref} className="text-3xl md:text-4xl font-bold text-center mb-16 text-on-surface tracking-tight font-terminal min-h-[3rem]">
            {featuresHeadingText.displayedText}
            {!featuresHeadingText.isComplete && featuresHeading.isInView && <span className="animate-pulse">_</span>}
          </h2>
          <FeaturesGrid isVisible={featuresHeading.isInView} />
        </div>
      </section>
      
      <section className="py-24 px-4 bg-surface border-t border-outline/30">
        <div className="max-w-7xl mx-auto">
          <h2 ref={screenshotsHeading.ref} className="text-3xl md:text-4xl font-bold text-center mb-16 text-on-surface tracking-tight font-terminal min-h-[3rem]">
            {screenshotsHeadingText.displayedText}
            {!screenshotsHeadingText.isComplete && screenshotsHeading.isInView && <span className="animate-pulse">_</span>}
          </h2>
          <div className={`transition-all duration-1000 ${screenshotsHeading.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ScreenshotCarousel />
          </div>
        </div>
      </section>
      
      <div className="bg-background border-t border-outline/30">
        <DownloadSection 
          heading={downloadHeadingText.displayedText}
          isHeadingComplete={downloadHeadingText.isComplete}
          isVisible={downloadHeading.isInView}
          headingRef={downloadHeading.ref}
        />
      </div>
      
      <section className="py-24 px-4 bg-surface-elevated border-t border-outline/30">
        <div className="max-w-2xl mx-auto">
          <h2 ref={newsletterHeading.ref} className="text-2xl md:text-3xl font-bold text-center mb-8 text-on-surface tracking-tight font-terminal min-h-[2.5rem]">
            {newsletterHeadingText.displayedText}
            {!newsletterHeadingText.isComplete && newsletterHeading.isInView && <span className="animate-pulse">_</span>}
          </h2>
          <NewsletterSignup isVisible={newsletterHeading.isInView} />
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
