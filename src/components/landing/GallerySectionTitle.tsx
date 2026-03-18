"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import styles from "./GallerySectionTitle.module.css";

type GallerySectionTitleProps = {
  title: string;
  isActive: boolean;
};

// Titlar med samma animation som Hero: bokstav-för-bokstav + rosa glow + light sweep
const GallerySectionTitle = forwardRef<HTMLDivElement, GallerySectionTitleProps>(
  function GallerySectionTitle({ title, isActive }, ref) {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sweepRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef(false);

  const letters = title.split("");

  useEffect(() => {
    if (!isActive) return;

    const lettersEl = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    if (lettersEl.length === 0) return;

    // Animerar bara när vi blir aktiva (inte varje frame)
    if (prevActiveRef.current === isActive) return;
    prevActiveRef.current = isActive;

    gsap.killTweensOf([lettersEl, sweepRef.current].flat().filter(Boolean));

    gsap.set(lettersEl, { opacity: 0 });
    gsap.to(lettersEl, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.04,
      ease: "power2.out",
    });

    if (sweepRef.current) {
      gsap.set(sweepRef.current, { x: "-100%" });
      gsap.to(sweepRef.current, {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
        repeat: 1,
        repeatDelay: 2,
        delay: 0.3,
      });
    }
  }, [isActive, title]);

  useEffect(() => {
    if (!isActive) prevActiveRef.current = false;
  }, [isActive]);

  return (
    <div ref={ref} className={styles.titleWrap}>
      <span className={styles.titleGlow} aria-hidden="true">
        {title}
      </span>
      <h2 className={styles.sectionTitle}>
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            className={`${styles.titleLetter} ${char === " " ? styles.titleSpace : ""}`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <div ref={sweepRef} className={styles.lightSweep} aria-hidden="true" />
    </div>
  );
});

export default GallerySectionTitle;
