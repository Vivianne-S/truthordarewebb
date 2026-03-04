"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CosmicBackground from "./CosmicBackground";
import FeatureCard from "./FeatureCard";
import styles from "./landing.module.css";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { label: "Logo", image: "/logo.png" },
  { label: "Intro", image: "/intro.png" },
  { label: "Add player", image: "/addplayer.png" },
  { label: "Add avatar", image: "/addavatar.png" },
  { label: "Categories", image: "/categories.png" },
  { label: "Game", image: "/game.png" },
];

export default function LandingCinematic() {
  const heroRef = useRef<HTMLElement>(null);
  const titleWordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresWrapperRef = useRef<HTMLDivElement>(null);
  const featuresRowRef = useRef<HTMLDivElement>(null);
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const runHeroAnimation = () => {
      const subtitle = subtitleRef.current;
      if (subtitle) {
        gsap.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        });
      }
    };
    const timeoutId = window.setTimeout(runHeroAnimation, 100);

    const setupScrollTriggers = () => {
      const section = featuresRef.current;
      const row = featuresRowRef.current;
      const cards = featureCardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!section || !row) return false;

      // Mjuk fade-in när sektionen kommer in (innan pin)
    gsap.fromTo(
      section,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          scrub: 1.5,
        },
      }
    );

    const maxX = -(row.scrollWidth - window.innerWidth);
    const vpCenter = () => window.innerWidth / 2;

    // Horisontell scroll + cinematic spotlight (scale/opacity/rotateY per kort)
    gsap.to(row, {
      x: maxX,
      ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200vh",
          pin: true,
          scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const rowX = progress * maxX;
          cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = cardCenter - vpCenter();
            const norm = Math.min(1, Math.abs(distance) / 400);
            const scale = 1 - 0.18 * norm;
            const opacity = 0.5 + 0.5 * (1 - norm);
            const rotateY = (distance / 500) * -8;
            gsap.set(card, {
              scale,
              opacity,
              rotateY,
              transformOrigin: "center center",
              force3D: true,
            });
          });
        },
      },
    });

      return true;
    };

    if (!setupScrollTriggers()) {
      const retryId = window.setTimeout(setupScrollTriggers, 150);
      return () => {
        window.clearTimeout(timeoutId);
        window.clearTimeout(retryId);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    return () => {
      window.clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className={styles.page}>
      {/* Hero – fixed cosmic bg */}
      <CosmicBackground fixed={true} />

      <section ref={heroRef} className={styles.hero}>
        <div className={styles.titleWrap}>
          <span className={styles.titleGlow} aria-hidden="true">
            Truth or Dare
          </span>
          <h1 className={styles.title}>
            <span ref={(el) => { titleWordRefs.current[0] = el; }} className={styles.titleWord}>Truth</span>
            <span ref={(el) => { titleWordRefs.current[1] = el; }} className={styles.titleWord}>or</span>
            <span ref={(el) => { titleWordRefs.current[2] = el; }} className={styles.titleWord}>Dare</span>
          </h1>
        </div>
        <p ref={subtitleRef} className={styles.subtitle}>
          Perfect for parties, birthdays, date nights & friend groups.
        </p>
      </section>

      <div ref={featuresWrapperRef} className={styles.featuresWrapper}>
        <section ref={featuresRef} className={styles.featuresSection}>
          <div className={styles.featuresVignette} aria-hidden="true" />
          <div ref={featuresRowRef} className={styles.featuresRow}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={(el) => { featureCardRefs.current[i] = el; }}
                className={styles.featureCardSlot}
              >
                <FeatureCard label={f.label} imageSrc={f.image} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
