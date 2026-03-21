# landing

Main landing webpage for Futon manga reader.

## Overview

This repository contains a modern responsive landing page built with:

- React + TypeScript
- Vite
- Tailwind CSS
- Three.js with @react-three/fiber and @react-three/drei
- Cloudflare Pages-friendly setup (wrangler.toml present)

## Features

- 3D hero canvas (`Hero3D` component)
- Newsletter signup UI with animated terminal-style status
- Theme and interaction animations

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Build production bundle:

   ```bash
   npm run build
   ```

4. Preview production build:

   ```bash
   npm run preview
   ```

## Webhook / API integration

- The signup form currently posts to `/api/newsletter` (client-side). 
- Add server-side handling via Cloudflare Functions / other backend to send Discord webhook or persist emails.

## License

MIT

## Acknowledgements
Thanks to [artofaria](https://sketchfab.com/artofaria) for the cat 3d model.