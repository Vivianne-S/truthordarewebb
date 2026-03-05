"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./CosmicBackgroundStack.module.css";

gsap.registerPlugin(ScrollTrigger);

// Props for the layered cosmic background
type Props = {
  /** Start background (hero + cards) */
  startLayer1?: string;
  startLayer2?: string;

  /** Next background (after cards) */
  nextLayer1?: string;
  nextLayer2?: string;

  /** element id that triggers transition */
  triggerId: string;

  /** optional: fade duration */
  duration?: number;

  /** Hero ref for parallax (mouse + scroll) */
  heroRef?: React.RefObject<HTMLElement | null>;
};

// Layered cosmic background: two stacks (start/next) that crossfade on scroll
export default function CosmicBackgroundStack({
  startLayer1 = "/cosmic-1.png",
  startLayer2 = "/cosmic-3.png",
  nextLayer1 = "/cosmic-2.png",
  nextLayer2 = "/cosmic-4.png",
  triggerId,
  duration = 1.2,
  heroRef,
}: Props) {
  const startWrap = useRef<HTMLDivElement>(null);
  const nextWrap = useRef<HTMLDivElement>(null);

  const startSphere = useRef<HTMLImageElement>(null);
  const startSwirl = useRef<HTMLImageElement>(null);

  const nextSphere = useRef<HTMLImageElement>(null);
  const nextSwirl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Set initial visibility: start visible, next hidden
    gsap.set(startWrap.current, { autoAlpha: 1 });
    gsap.set(nextWrap.current, { autoAlpha: 0 });

    // Zoom-in animation on load (3.5s)
    const zoomDuration = 3.5;
    const zoomEase = "power2.out";
    if (startSphere.current) {
      gsap.fromTo(
        startSphere.current,
        { scale: 0.88 },
        { scale: 1, duration: zoomDuration, ease: zoomEase }
      );
    }
    if (startSwirl.current) {
      gsap.fromTo(
        startSwirl.current,
        { scale: 0.9 },
        { scale: 1, duration: zoomDuration, ease: zoomEase }
      );
    }

    // Float animations for start layers (hero background) – begin after zoom
    if (startSphere.current) {
      gsap.to(startSphere.current, {
        scale: 1.1,
        rotate: 4,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: zoomDuration,
      });
    }

    if (startSwirl.current) {
      gsap.to(startSwirl.current, {
        scale: 1.25,
        rotate: 12,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: zoomDuration,
      });
    }

    // Float animations for next layers (CTA background)
    if (nextSphere.current) {
      gsap.to(nextSphere.current, {
        scale: 1.1,
        rotate: -3,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    if (nextSwirl.current) {
      gsap.to(nextSwirl.current, {
        scale: 1.25,
        rotate: -10,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // Crossfade between start and next backgrounds based on scroll position
    const triggerEl = document.getElementById(triggerId);
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top 65%",
      end: "top 25%",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress; // 0..1 as trigger moves through start→end
        gsap.to(startWrap.current, { autoAlpha: 1 - p, duration: 0.1, overwrite: true });
        gsap.to(nextWrap.current, { autoAlpha: p, duration: 0.1, overwrite: true });
      },
      onLeaveBack: () => {
        gsap.to(startWrap.current, { autoAlpha: 1, duration, ease: "power2.out" });
        gsap.to(nextWrap.current, { autoAlpha: 0, duration, ease: "power2.out" });
      },
      onLeave: () => {
        gsap.to(startWrap.current, { autoAlpha: 0, duration, ease: "power2.out" });
        gsap.to(nextWrap.current, { autoAlpha: 1, duration, ease: "power2.out" });
      },
    });

    return () => {
      st.kill();
    };
  }, [triggerId, duration]);

  return (
    <div className={styles.bgWrap} aria-hidden="true">
      {/* Start background: sphere + swirl for hero section */}
      <div ref={startWrap} className={styles.bgStackLayer}>
        <img ref={startSphere} className={styles.bgLayer1} src={startLayer1} alt="" />
        <img ref={startSwirl} className={styles.bgLayer2} src={startLayer2} alt="" />
      </div>

      {/* Next background: shown after CTA trigger enters view */}
      <div ref={nextWrap} className={styles.bgStackLayer}>
        <img ref={nextSphere} className={styles.bgLayer1} src={nextLayer1} alt="" />
        <img ref={nextSwirl} className={styles.bgLayer2} src={nextLayer2} alt="" />
      </div>
    </div>
  );
}