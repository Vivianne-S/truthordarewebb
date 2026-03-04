"use client";

import styles from "./CTASection.module.css";

export const CTA_TRIGGER_ID = "bg-switch";

export default function CTASection() {
  return (
    <section id={CTA_TRIGGER_ID} className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to play?</h2>
        <p className={styles.ctaSubtitle}>
          Download and start a game in seconds.
        </p>
      </div>
    </section>
  );
}
