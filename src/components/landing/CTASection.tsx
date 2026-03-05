"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./CTASection.module.css";

gsap.registerPlugin(ScrollTrigger);

export const CTA_TRIGGER_ID = "bg-switch";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial cinematic state (without needing CSS opacity:0)
      gsap.set(contentRef.current, {
        opacity: 0,
        y: 70,
        filter: "blur(14px)",
        willChange: "transform, opacity, filter",
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={CTA_TRIGGER_ID}
      className={styles.ctaSection}
    >
      <div ref={contentRef} className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>Ready to play?</h2>
        <p className={styles.ctaSubtitle}>
          Download and start a game in seconds.
        </p>
        <div className={styles.ctaButtons}>
          <a
            href="#"
            className={`${styles.ctaStoreButton} ${styles.ctaAppStore}`}
            aria-label="Download on the App Store"
          >
            <span className={styles.ctaStoreIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </span>
            <span className={styles.ctaStoreText}>
              <span className={styles.ctaStoreLabel}>Download on the</span>
              <span className={styles.ctaStoreName}>App Store</span>
            </span>
          </a>
          <span className={styles.ctaOr}>or</span>
          <a
            href="#"
            className={`${styles.ctaStoreButton} ${styles.ctaGooglePlay}`}
            aria-label="Get it on Google Play"
          >
            <span className={styles.ctaStoreIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className={styles.ctaStoreText}>
              <span className={styles.ctaStoreLabel}>Get it on</span>
              <span className={styles.ctaStoreName}>Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}