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
              scrub: 1.5,
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
              scrub: 1.5,
            },
          }
        );
      });
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
