# Truth or Dare – Landing Page

A cinematic landing page for the Truth or Dare app, built with Next.js 16, GSAP, and Three.js. Features a cosmic-themed hero with WebGL particles, scroll-driven feature gallery, and animated call-to-action section.

![Truth or Dare](public/truthordare_logo.png)

## Features

- **Cosmic hero** – Animated title, tagline, and floating tags with staggered entrance animations
- **WebGL starfield** – Three.js particle field with mouse parallax and cosmic colors (purple, pink, blue, white)
- **Layered backgrounds** – Cosmic images that crossfade on scroll
- **Scroll-pinned gallery** – Four sections (Introduction, Local game, Create Game, Join Game) with spotlight effect and per-section Three.js particle backgrounds
- **CTA section** – Download buttons with floating avatars and particle effects

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) – scroll-driven animations, pinning, scrub
- [Three.js](https://threejs.org) – WebGL particles (hero starfield, gallery background, CTA)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, fonts, metadata
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/landing/
│   ├── LandingCinematic.tsx      # Main landing layout
│   ├── CosmicBackgroundStack.tsx # Layered cosmic backgrounds (crossfade on scroll)
│   ├── StarfieldParticles.tsx   # Hero WebGL particle field (Three.js)
│   ├── Hero.tsx                 # Hero section, title animations
│   ├── GallerySectioned.tsx     # Scroll-pinned gallery (4 sections)
│   ├── GallerySectionTitle.tsx  # Animated section titles
│   ├── GalleryThreeBackground.tsx # Three.js particles per gallery section
│   ├── FeatureCard.tsx          # Feature card with image + label
│   ├── ProgressDots.tsx         # Gallery progress indicator
│   ├── CTASection.tsx           # Download CTA + floating avatars
│   └── CTAParticles.tsx         # CTA section Three.js particles
└── constants/
    └── landing.ts               # Gallery sections and feature data
```

## Gallery Sections

| Section       | Content                                                                 |
|---------------|--------------------------------------------------------------------------|
| Introduction  | Truth or Dare, How to Play, Choose Game Mode                             |
| Local game    | Add Players, Categories, Shop, Gameplay, Questions, Buy More, Game Over |
| Create Game   | Create Game, Game Lobby, Categories, Shop, Questions, Buy More, Game Over |
| Join Game     | Join Game, Game Lobby, Gameplay, Game Over                              |

## Animation Packages

- **GSAP** – Tweens, timelines, and animation control
- **GSAP ScrollTrigger** – Scroll-driven animations, pinning, scrub. Included in GSAP (`gsap/ScrollTrigger`)
- **Three.js** – WebGL particle systems for depth and atmosphere

## Fonts

Uses [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized loading:

- **Geist Sans** – Body text
- **Geist Mono** – Code/monospace
- **Bebas Neue** – Display headings (Truth or Dare title)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Three.js Documentation](https://threejs.org/docs/)

## Deploy on Vercel

The easiest way to deploy is with the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
