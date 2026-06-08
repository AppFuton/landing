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

export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const accept = context.request.headers.get("Accept");
  if (accept && accept.includes("text/markdown")) {
    const url = new URL(context.request.url);
    let markdown = "";
    let title = "";

    if (url.pathname === "/") {
      title = "Futon - Manga Reader for Android";
      markdown = `# Futon - Manga Reader for Android

Open-source manga reader for Android. 1000+ sources. Zero tracking. Built by readers.

## Features
- **1000+ manga sources**: Access a vast library of manga from popular and niche sources.
- **Open-source**: Licensed under GPL-3.0. Standing on the shoulders of giants (forked from Kotatsu).
- **Material You Design**: Modern, dynamic theming that looks great on any Android device.
- **High-performance Reader**: Optimized for speed, with support for webtoon scroll mode and CBZ archives.
- **No Tracking**: Your privacy is respected. Zero tracking, zero telemetry.
- **Tracking Integration**: Sync with AniList, MyAnimeList, Shikimori, and Kitsu.
- **Offline Reading**: Download chapters and read anytime, anywhere.

## Download
- [GitHub Releases](https://github.com/AppFuton/Futon/releases)
- [F-Droid](https://f-droid.org/packages/io.github.landwarderer.futon/)
- [IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/io.github.landwarderer.futon)

## Community
Join our Discord: [discord.gg/9sqBHXhwzz](https://discord.gg/9sqBHXhwzz)`;
    } else if (url.pathname === "/logs") {
      title = "Futon System Logs";
      markdown = `# Futon System Logs

\`\`\`text
${LOG_LINES.join('\n')}
\`\`\``;
    } else if (url.pathname === "/unsubscribe") {
      title = "Unsubscribe from Futon Newsletter";
      markdown = `# Unsubscribe

We'll remove your email from our newsletter mailing list. 

*Note: To submit your unsubscription request, please visit the HTML version of this page in a browser.*`;
    }

    if (markdown) {
      const fullMarkdown = `---
title: ${title}
description: Open-source manga reader for Android
---

${markdown}`;

      return new Response(fullMarkdown, {
        headers: {
          "Content-Type": "text/markdown; charset=UTF-8",
          "x-markdown-tokens": fullMarkdown.split(/\s+/).length.toString(),
          "Vary": "Accept",
          "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
        },
      });
    }
  }

  const response = await context.next();
  response.headers.append("Vary", "Accept");
  response.headers.append("Link", '</.well-known/api-catalog>; rel="api-catalog"');
  response.headers.append("Link", '</.well-known/agent-skills/index.json>; rel="agent-skills"');
  response.headers.append("Link", '</auth.md>; rel="service-doc"');
  return response;
};
