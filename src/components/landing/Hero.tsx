"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const TAGS_LEFT = ["Play with friends", "Challenge yourself", "No limits"];
const TAGS_RIGHT = ["Have fun", "Spice up the night", "Get the party started"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftTagsRef = useRef<HTMLDivElement>(null);
  const rightTagsRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.35,
        });
      }

      const leftTags = leftTagsRef.current?.children
        ? Array.from(leftTagsRef.current.children)
        : [];
      const rightTags = rightTagsRef.current?.children
        ? Array.from(rightTagsRef.current.children)
        : [];

      if (leftTags.length === 0 && rightTags.length === 0) return;

      // Light sweep över titeln var 6–10 sekund (lens flare / ljusreflektion)
      if (lightSweepRef.current) {
        gsap.set(lightSweepRef.current, { x: "-100%" });
        gsap.to(lightSweepRef.current, {
          x: "100%",
          duration: 1.2,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 3,
        });
      }

      const setupScrollTrigger = () => {
        leftTags.forEach((el) => {
          gsap.fromTo(
            el,
            { x: 0, opacity: 0.9, scale: 1 },
            {
              x: -200,
              opacity: 0,
              scale: 1.5,
              ease: "power3.in",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "top bottom",
                scrub: 2.5,
              },
            }
          );
        });

        rightTags.forEach((el) => {
          gsap.fromTo(
            el,
            { x: 0, opacity: 0.9, scale: 1 },
            {
              x: 200,
              opacity: 0,
              scale: 1.5,
              ease: "power3.in",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "top bottom",
                scrub: 2.5,
              },
            }
          );
        });
      };

      // Load animation: kom in rad för rad, samma sätt som dom försvinner (från isär till ihop)
      gsap.set(leftTags, { x: -200, opacity: 0, scale: 1.5 });
      gsap.set(rightTags, { x: 200, opacity: 0, scale: 1.5 });

      const tl = gsap.timeline({
        onComplete: setupScrollTrigger,
      });
      const rowDelay = 0.9;
      for (let i = 0; i < Math.max(leftTags.length, rightTags.length); i++) {
        const leftEl = leftTags[i];
        const rightEl = rightTags[i];
        const startTime = 0.6 + i * rowDelay;
        if (leftEl) {
          tl.to(leftEl, { x: 0, opacity: 0.9, scale: 1, duration: 1.4, ease: "power3.out" }, startTime);
        }
        if (rightEl) {
          tl.to(rightEl, { x: 0, opacity: 0.9, scale: 1, duration: 1.4, ease: "power3.out" }, startTime);
        }
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
          <span className={styles.titleWord}>Truth</span>
          <span className={styles.titleWord}>or</span>
          <span className={styles.titleWord}>Dare</span>
        </h1>
        <div ref={lightSweepRef} className={styles.lightSweep} aria-hidden="true" />
      </div>

      <p ref={subtitleRef} className={styles.subtitle}>
        Perfect for parties, birthdays, date nights & friend groups.
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
    </section>
  );
}
