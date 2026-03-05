"use client";

import CosmicBackgroundStack from "./CosmicBackgroundStack";
import Hero from "./Hero";
import FeaturesCarousel from "./FeaturesCarousel";
import CTASection, { CTA_TRIGGER_ID } from "./CTASection";
import styles from "./LandingPage.module.css";

// Main landing page: stacked cosmic background, hero, feature carousel, and CTA
export default function LandingCinematic() {
  return (
    <main className={styles.page}>
      {/* Animated cosmic background that crossfades when CTA section enters view */}
      <CosmicBackgroundStack
        triggerId={CTA_TRIGGER_ID}
        startLayer1="/cosmic-1.png"
        startLayer2="/cosmic-3.png"
        nextLayer1="/cosmic-2.png"
        nextLayer2="/cosmic-4.png"
      />

      {/* Hero section with title, tagline, and scroll cue */}
      <Hero />

      {/* Scroll-driven carousel of app feature screenshots */}
      <FeaturesCarousel />

      {/* Call-to-action with download buttons and floating avatars */}
      <CTASection />
    </main>
  );
}
