# Truth or Dare – Landing Page

A cinematic, multilingual landing page for the Truth or Dare mobile app. Built with Next.js 16, GSAP, and Three.js. Features a cosmic-themed hero, scroll-driven feature gallery, and animated call-to-action section.

![Truth or Dare](public/truthordare_logo.png)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Internationalization (i18n)](#internationalization-i18n)
- [Gallery Sections](#gallery-sections)
- [Animation & Visual Effects](#animation--visual-effects)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Documentation](#documentation)

---

## Features

| Feature | Description |
|---------|-------------|
| **Cosmic Hero** | Animated title, tagline, and floating tags with staggered entrance animations |
| **WebGL Starfield** | Three.js particle field with mouse parallax and cosmic colors (purple, pink, blue, white) |
| **Layered Backgrounds** | Cosmic images that crossfade on scroll when reaching the CTA section |
| **Scroll-Pinned Gallery** | Four sections with spotlight effect, per-section Three.js particle backgrounds, and smooth carousel |
| **CTA Section** | Download buttons (App Store, Google Play), floating avatars with neon glow, particle effects |
| **Internationalization** | English and Swedish with EN/SV language switcher |
| **Responsive Design** | Optimized for desktop and mobile viewports |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org) | App Router, React Server Components |
| [React 19](https://react.dev) | UI framework |
| [GSAP](https://gsap.com) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Scroll-driven animations, pinning, scrub |
| [Three.js](https://threejs.org) | WebGL particle systems |
| [next-intl](https://next-intl.dev) | Internationalization (i18n) |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| TypeScript | Type safety |

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm**, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd truthordarewebb

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/en` (English) by default.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
truthordarewebb/
├── messages/                    # i18n translation files
│   ├── en.json                  # English strings
│   └── sv.json                  # Swedish strings
├── public/                      # Static assets (images, avatars)
├── src/
│   ├── app/
│   │   ├── [locale]/            # Locale-based routing
│   │   │   ├── layout.tsx       # Locale layout
│   │   │   └── page.tsx         # Home page
│   │   ├── layout.tsx           # Root layout, fonts, NextIntlClientProvider
│   │   └── globals.css          # Global styles
│   ├── components/landing/
│   │   ├── LandingCinematic.tsx # Main landing composition
│   │   ├── CosmicBackgroundStack.tsx  # Layered cosmic backgrounds
│   │   ├── StarfieldParticles.tsx     # Hero WebGL particles
│   │   ├── Hero.tsx             # Hero section
│   │   ├── GallerySectioned.tsx # Scroll-pinned gallery
│   │   ├── GallerySectionTitle.tsx     # Animated section titles
│   │   ├── GalleryThreeBackground.tsx  # Gallery Three.js particles
│   │   ├── FeatureCard.tsx       # Feature card component
│   │   ├── ProgressDots.tsx     # Gallery progress indicator
│   │   ├── CTASection.tsx       # Download CTA + avatars
│   │   ├── CTAParticles.tsx     # CTA Three.js particles
│   │   ├── LanguageSwitcher.tsx # EN/SV language switcher
│   │   └── FeaturesCarousel.tsx # Alternative carousel (legacy)
│   ├── i18n/
│   │   ├── routing.ts           # Locale routing config
│   │   ├── request.ts           # Request-scoped i18n config
│   │   └── navigation.ts        # Locale-aware navigation
│   ├── constants/
│   │   └── landing.ts           # Gallery sections, i18n keys
│   └── middleware.ts            # Next-intl locale middleware
├── next.config.ts
├── package.json
└── README.md
```

---

## Internationalization (i18n)

The project uses [next-intl](https://next-intl.dev) for internationalization.

### Supported Locales

| Locale | URL | Default |
|--------|-----|---------|
| English | `/en` | Yes |
| Swedish | `/sv` | No |

### Adding Translations

1. Edit `messages/en.json` for English
2. Edit `messages/sv.json` for Swedish
3. Use the same keys in both files

### Using Translations in Components

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("hero");
  return <h1>{t("title")}</h1>;
}
```

### Adding a New Locale

1. Add the locale to `src/i18n/routing.ts`:
   ```ts
   locales: ["en", "sv", "de"],
   ```
2. Create `messages/de.json` with the same structure as `en.json` or `sv.json`.

---

## Gallery Sections

The scroll-pinned gallery has four sections, each showcasing app screenshots:

| Section | Screens | Content |
|---------|---------|---------|
| **Introduction** | 3 | Truth or Dare, How to Play, Choose Game Mode |
| **Local game** | 8 | Add Players, Categories, Shop, Gameplay, Questions, Buy More, Game Over |
| **Create Game** | 9 | Create Game, Game Lobby, Categories, Shop, Gameplay, Questions, Buy More, Game Over |
| **Join Game** | 5 | Join Game, Game Lobby, Gameplay, Game Over |

Section titles and image labels are translated via `messages/[locale].json` under `gallery.sections` and `gallery.labels`.

---

## Animation & Visual Effects

### GSAP

- **ScrollTrigger**: Pins the gallery during scroll, drives carousel progress
- **Timelines**: Staggered hero entrance, tag animations
- **quickTo**: Smooth avatar parallax and row positioning

### Three.js

- **StarfieldParticles**: Hero WebGL particle field (2500 particles, mouse parallax)
- **GalleryThreeBackground**: Per-section particle background in the gallery
- **CTAParticles**: Particle field in the CTA section

### CSS

- Radial gradients for ambient glow
- Backdrop blur for glass effects
- Keyframe animations for avatar glow, neon rings, scan lines

---

## Configuration

### Environment

No environment variables are required for basic usage.

### next-intl

`src/i18n/routing.ts`:

```ts
localeDetection: false  // URL-only; no browser/cookie detection
defaultLocale: "en"
localePrefix: "always"  // /en, /sv in URL
```

### Cosmic Backgrounds

Background images are configured in `LandingCinematic.tsx`:

- `cosmic-1.png`, `cosmic-3.png` – Hero section
- `cosmic-2.png`, `cosmic-4.png` – CTA section (crossfade on scroll)

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Deploy; Vercel auto-detects Next.js

### Other Platforms

```bash
npm run build
npm run start
```

Ensure the build output is served with Node.js 18+.

---

## Fonts

Loaded via [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts):

- **Geist Sans** – Body text
- **Geist Mono** – Code/monospace
- **Bebas Neue** – Display headings (Truth or Dare title)

---

## Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** – Component hierarchy, scroll behavior, i18n flow

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Three.js Documentation](https://threejs.org/docs/)
- [next-intl Documentation](https://next-intl.dev/docs)
