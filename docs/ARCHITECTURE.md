# Architecture

This document describes the technical architecture and data flow of the Truth or Dare landing page.

## High-Level Flow

```
User visits / or /en
    → Middleware (next-intl) redirects / to /en
    → App Router renders app/[locale]/page.tsx
    → LandingCinematic composes: Background → Starfield → Hero → Gallery → CTA
    → Each section uses GSAP ScrollTrigger for scroll-driven behavior
```

## Component Hierarchy

```
LandingCinematic
├── LanguageSwitcher (fixed, top-right)
├── CosmicBackgroundStack (fixed, z-index 0)
│   └── Two layers: start (hero) + next (CTA), crossfade on scroll
├── StarfieldParticles (fixed, WebGL canvas)
├── Hero
│   ├── Title (letter-by-letter animation)
│   ├── Tagline + Subtitle
│   ├── Tags (left/right)
│   └── Scroll cue
├── GallerySectioned (pinned during scroll)
│   ├── GalleryThreeBackground (per-section particles)
│   ├── Section × 4 (Introduction, Local game, Create Game, Join Game)
│   │   ├── GallerySectionTitle
│   │   └── Row of FeatureCards
│   └── ProgressDots
└── CTASection
    ├── CTAParticles (WebGL)
    ├── Floating avatars (9, various sizes)
    └── CTA content (title, subtitle, store buttons)
```

## Scroll Behavior

1. **Hero**: Static until user scrolls
2. **Gallery**: Pinned via ScrollTrigger; scroll progress drives:
   - Section crossfade (opacity, blur)
   - Carousel position (which card is centered)
   - Row x-offset (smooth interpolation)
3. **CTA**: Enters when gallery scroll ends; background crossfades from cosmic-1/3 to cosmic-2/4

## i18n Data Flow

```
messages/en.json, messages/sv.json
    → getRequestConfig (i18n/request.ts) loads based on URL locale
    → NextIntlClientProvider provides messages to client
    → useTranslations("namespace") in components
```

Gallery labels use keys from `constants/landing.ts` (`labelKey`, `titleKey`) resolved via `tLabels()` and `tSections()` in `GallerySectioned`.

## Key Constants

| File | Purpose |
|------|---------|
| `constants/landing.ts` | `GALLERY_SECTIONS` – section ids, image src, i18n keys |
| `i18n/routing.ts` | Locales, default locale, locale prefix |
| `GallerySectioned.tsx` | `SCROLL_PER_IMAGE`, `SCROLL_PER_SECTION_GAP` – scroll distances |

## Asset Conventions

- **Cosmic backgrounds**: `public/cosmic-{1,2,3,4}.png`
- **Gallery images**: `public/*.jpeg`, `public/*.png`
- **Avatars**: `public/avatar_*.png`, `public/avatar*.png`
