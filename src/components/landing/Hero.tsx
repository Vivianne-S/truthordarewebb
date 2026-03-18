"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

// Tag phrases shown on the left side of the hero
const TAGS_LEFT = ["Play with friends", "Challenge yourself", "No limits"];
// Tag phrases shown on the right side of the hero
const TAGS_RIGHT = ["Have fun", "Get the party started", "Make memories"];

// Title words split for letter-by-letter animation
const TITLE_WORDS = ["Truth", "or", "Dare"];

// Runs all hero entrance animations: letters, tagline, subtitle, tags, light sweep, scroll cue
function runHeroAnimations(
  letters: Element[],
  tagline: HTMLParagraphElement | null,
  subtitle: HTMLParagraphElement | null,
  leftTags: Element[],
  rightTags: Element[],
  lightSweep: HTMLDivElement | null,
  scrollCue: HTMLDivElement | null
) {
  // Stop any running tweens before replaying
  gsap.killTweensOf([letters, tagline, subtitle, leftTags, rightTags, lightSweep, scrollCue].flat().filter(Boolean));

  // Staggered fade-in for each letter of the title
  if (letters.length > 0) {
    gsap.set(letters, { opacity: 0 });
    gsap.to(letters, {
      opacity: 1,
      duration: 0.65,
      stagger: 0.07,
      ease: "power2.out",
      delay: 0.1,
    });
  }

  // Tagline slide-up and fade-in
  if (tagline) {
    gsap.set(tagline, { opacity: 0, y: 14 });
    gsap.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      delay: 1.15,
    });
  }

  // Subtitle slide-up and fade-in
  if (subtitle) {
    gsap.set(subtitle, { opacity: 0, y: 12 });
    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 2,
    });
  }

  // Horizontal light sweep across the title (loops indefinitely)
  if (lightSweep) {
    gsap.set(lightSweep, { x: "-100%" });
    gsap.to(lightSweep, {
      x: "100%",
      duration: 1.2,
      ease: "power2.inOut",
      repeat: -1,
      repeatDelay: 3,
      delay: 2.9,
    });
  }

  // Tags slide in from left and right with staggered timing
  gsap.set(leftTags, { x: -200, opacity: 0, scale: 1.5 });
  gsap.set(rightTags, { x: 200, opacity: 0, scale: 1.5 });

  const rowDelay = 0.9;
  for (let i = 0; i < Math.max(leftTags.length, rightTags.length); i++) {
    const startTime = 2.9 + i * rowDelay;
    if (leftTags[i]) {
      gsap.to(leftTags[i], { x: 0, opacity: 0.95, scale: 1, duration: 1.4, ease: "power3.out", delay: startTime });
    }
    if (rightTags[i]) {
      gsap.to(rightTags[i], { x: 0, opacity: 0.95, scale: 1, duration: 1.4, ease: "power3.out", delay: startTime });
    }
  }

  // Scroll cue fades in last to prompt user to scroll
  if (scrollCue) {
    gsap.set(scrollCue, { opacity: 0 });
    gsap.to(scrollCue, {
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
      delay: 6.2,
    });
  }
}

// Hero section: animated title, tagline, tags, and scroll cue
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const leftTagsRef = useRef<HTMLDivElement>(null);
  const rightTagsRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Collect refs for animation targets
    const letters = titleLettersRef.current.filter((el): el is HTMLSpanElement => el != null);
    const leftTags = leftTagsRef.current?.children ? Array.from(leftTagsRef.current.children) : [];
    const rightTags = rightTagsRef.current?.children ? Array.from(rightTagsRef.current.children) : [];

    const play = () =>
      runHeroAnimations(
        letters,
        taglineRef.current,
        subtitleRef.current,
        leftTags,
        rightTags,
        lightSweepRef.current,
        scrollCueRef.current
      );

    play();

    // Replay animations when user scrolls back up to the hero
    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      onEnterBack: play,
    });

    return () => {
      st.kill();
      gsap.killTweensOf(hero.querySelectorAll("*"));
    };
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

      <div className={styles.taglineWrap}>
        <p ref={taglineRef} className={styles.tagline}>
          Who&apos;s the darest of them all?
        </p>
        <p ref={subtitleRef} className={styles.subtitle}>
          Perfect for parties, birthdays, girls nights, guys nights & friend groups.
        </p>
      </div>

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
