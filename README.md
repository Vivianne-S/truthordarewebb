# Truth or Dare – Landing Page

A cinematic landing page for the Truth or Dare app, built with Next.js 16 and GSAP. Features a cosmic-themed hero, scroll-driven feature carousel, and animated call-to-action section.

![Truth or Dare](public/truthordare_logo.png)

## Features

- **Cosmic hero** – Animated title, tagline, and floating tags with staggered entrance animations
- **Scroll-pinned carousel** – App feature screenshots with spotlight effect and snap-to-card behavior
- **Background crossfade** – Layered cosmic backgrounds that transition as you scroll
- **Fixed header** – Logo stays visible across all sections
- **CTA section** – Download buttons with floating avatar animations

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) – scroll-driven animations, pinning, scrub
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
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/landing/
│   ├── Header.tsx           # Fixed header with logo
│   ├── Hero.tsx             # Hero section, title animations
│   ├── CosmicBackgroundStack.tsx  # Layered cosmic backgrounds
│   ├── FeaturesCarousel.tsx # Scroll-pinned feature cards
│   ├── FeatureCard.tsx      # Single feature card
│   ├── ProgressDots.tsx     # Carousel progress indicator
│   ├── CTASection.tsx       # Download CTA + floating avatars
│   └── LandingCinematic.tsx # Main landing layout
└── constants/
    └── landing.ts          # Feature list for carousel
```

## Animation Packages

- **GSAP** – Tweens, timelines, and animation control
- **GSAP ScrollTrigger** – Scroll-driven animations, pinning, scrub. Included in GSAP (`gsap/ScrollTrigger`), no extra package needed

## Fonts

Uses [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized loading:

- **Geist Sans** – Body text
- **Geist Mono** – Code/monospace
- **Bebas Neue** – Display headings

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Deploy on Vercel

The easiest way to deploy is with the [Vercel Platform](https://vercel.com/new). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
