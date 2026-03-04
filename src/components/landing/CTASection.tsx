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
      </div>
    </section>
  );
}