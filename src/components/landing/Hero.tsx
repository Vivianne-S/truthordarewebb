"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

const TAGS_LEFT = ["Play with friends", "Challenge yourself", "No limits"];
const TAGS_RIGHT = ["Have fun", "Get the party started", "Make memories"];

const TITLE_WORDS = ["Truth", "or", "Dare"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftTagsRef = useRef<HTMLDivElement>(null);
  const rightTagsRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const titleLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleLettersRef.current.filter(Boolean);
      if (letters.length > 0) {
        gsap.set(letters, { opacity: 0 });
        gsap.to(letters, {
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        });
      }

      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.4,
        });
      }

      const leftTags = leftTagsRef.current?.children
        ? Array.from(leftTagsRef.current.children)
        : [];
      const rightTags = rightTagsRef.current?.children
        ? Array.from(rightTagsRef.current.children)
        : [];

      if (leftTags.length === 0 && rightTags.length === 0) return;

      if (lightSweepRef.current) {
        gsap.set(lightSweepRef.current, { x: "-100%" });
        gsap.to(lightSweepRef.current, {
          x: "100%",
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 3,
          delay: 2.5,
        });
      }


      gsap.set(leftTags, { x: -200, opacity: 0, scale: 1.5 });
      gsap.set(rightTags, { x: 200, opacity: 0, scale: 1.5 });

      const tl = gsap.timeline();
      const rowDelay = 0.9;
      for (let i = 0; i < Math.max(leftTags.length, rightTags.length); i++) {
        const leftEl = leftTags[i];
        const rightEl = rightTags[i];
        const startTime = 2.5 + i * rowDelay;
        if (leftEl) {
          tl.to(leftEl, { x: 0, opacity: 0.9, scale: 1, duration: 1.4, ease: "power3.out" }, startTime);
        }
        if (rightEl) {
          tl.to(rightEl, { x: 0, opacity: 0.9, scale: 1, duration: 1.4, ease: "power3.out" }, startTime);
        }
      }

      if (scrollCueRef.current) {
        gsap.set(scrollCueRef.current, { opacity: 0 });
        gsap.to(scrollCueRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 5.5,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.titleWrap}>
        <span className={styles.titleGlow} aria-hidden="true">
          Truth or Dare
        </span>
        <h1 className={styles.title}>
          {(() => {
            let letterIdx = 0;
            return TITLE_WORDS.map((word) => (
              <span key={word} className={styles.titleWord}>
                {word.split("").map((char) => {
                  const idx = letterIdx++;
                  return (
                    <span
                      key={idx}
                      ref={(el) => {
                        if (el) titleLettersRef.current[idx] = el;
                      }}
                      className={styles.titleLetter}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ));
          })()}
        </h1>
        <div ref={lightSweepRef} className={styles.lightSweep} aria-hidden="true" />
      </div>

      <p ref={subtitleRef} className={styles.subtitle}>
        Perfect for parties, birthdays, girls nights, guys nights & friend groups.
      </p>

      <div className={styles.heroTags}>
        <div ref={leftTagsRef} className={styles.heroTagsLeft}>
          {TAGS_LEFT.map((tag) => (
            <span key={tag} className={styles.heroTag}>
              {tag}
            </span>
          ))}
        </div>
        <div ref={rightTagsRef} className={styles.heroTagsRight}>
          {TAGS_RIGHT.map((tag) => (
            <span key={tag} className={styles.heroTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div ref={scrollCueRef} className={styles.scrollCue}>
        <span className={styles.scrollCueText}>Scroll to explore gameplay</span>
        <span className={styles.scrollCueArrow} aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
