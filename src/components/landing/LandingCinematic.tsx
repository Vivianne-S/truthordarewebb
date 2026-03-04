"use client";

import CosmicBackgroundStack from "./CosmicBackgroundStack";
import Hero from "./Hero";
import FeaturesCarousel from "./FeaturesCarousel";
import CTASection, { CTA_TRIGGER_ID } from "./CTASection";
import styles from "./LandingPage.module.css";

export default function LandingCinematic() {
  return (
    <main className={styles.page}>
      <CosmicBackgroundStack
        triggerId={CTA_TRIGGER_ID}
        startLayer1="/cosmic-1.png"
        startLayer2="/cosmic-3.png"
        nextLayer1="/cosmic-2.png"
        nextLayer2="/cosmic-4.png"
      />

      <Hero />

      <FeaturesCarousel />

      <CTASection />
    </main>
  );
}
