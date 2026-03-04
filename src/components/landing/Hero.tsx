"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!subtitleRef.current) return;

    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.35,
    });
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.titleWrap}>
        <span className={styles.titleGlow} aria-hidden="true">
          Truth or Dare
        </span>
        <h1 className={styles.title}>
          <span className={styles.titleWord}>Truth</span>
          <span className={styles.titleWord}>or</span>
          <span className={styles.titleWord}>Dare</span>
        </h1>
      </div>

      <p ref={subtitleRef} className={styles.subtitle}>
        Perfect for parties, birthdays, date nights & friend groups.
      </p>
    </section>
  );
}
