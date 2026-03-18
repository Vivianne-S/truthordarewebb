"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CTAParticles from "./CTAParticles";
import styles from "./CTASection.module.css";

gsap.registerPlugin(ScrollTrigger);

// ID used by CosmicBackgroundStack to trigger background crossfade
export const CTA_TRIGGER_ID = "bg-switch";

// Avatar positions – elliptical frame around CTA box, balanced left/right
// Sizes: 48–56 (small), 64–72 (medium), 84–92 (large)
// Y: min 22% (top) för att undvika clipping
const FLOATING_AVATARS = [
  { size: 88, x: "12%", y: "24%", src: "/avatar_monkey.png", from: "left" as const },
  { size: 72, x: "88%", y: "26%", src: "/avatar_penguin.png", from: "right" as const },
  { size: 68, x: "6%", y: "48%", src: "/avatar_alien.png", from: "left" as const },
  { size: 90, x: "94%", y: "50%", src: "/avatar_guy5.png", from: "right" as const },
  { size: 56, x: "20%", y: "82%", src: "/avatar_guy6.png", from: "left" as const },
  { size: 64, x: "80%", y: "78%", src: "/avatar_guy7.png", from: "right" as const },
  { size: 52, x: "32%", y: "22%", src: "/avatar11.png", from: "left" as const },
  { size: 54, x: "68%", y: "22%", src: "/avatar12.png", from: "right" as const },
  { size: 84, x: "50%", y: "88%", src: "/avatar13.png", from: "left" as const },
];

// CTA section: download buttons, floating avatars, and cinematic entrance
export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    let cleanupMouse: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // Set initial state for cinematic reveal (blur + slide up)
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

      // Avatars slide in one by one from left or right based on config
      const avatars = avatarsRef.current.filter(Boolean) as HTMLDivElement[];
      if (avatars.length > 0) {
        avatars.forEach((el, i) => {
          const fromX = FLOATING_AVATARS[i].from === "left" ? -120 : 120;
          gsap.set(el, { x: fromX, opacity: 0 });
        });

        gsap.to(avatars, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        });

        // Mouse parallax – avatarerna följer musen subtilt
        const avatarParallax = avatars.map((el) =>
          gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" })
        );
        const ySetters = avatars.map((el) =>
          gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" })
        );
        const handleMouseMove = (e: MouseEvent) => {
          avatars.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;
            const distX = (e.clientX - elCenterX) / window.innerWidth;
            const distY = (e.clientY - elCenterY) / window.innerHeight;
            avatarParallax[i](distX * 12);
            ySetters[i](distY * 8);
          });
        };
        window.addEventListener("mousemove", handleMouseMove);
        cleanupMouse = () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      cleanupMouse?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={CTA_TRIGGER_ID}
      className={styles.ctaSection}
    >
      <CTAParticles sectionRef={sectionRef} />
      <div className={styles.ctaAvatars} aria-hidden="true">
          {FLOATING_AVATARS.map((avatar, i) => (
            <div
              key={i}
              ref={(el) => { avatarsRef.current[i] = el; }}
              className={styles.ctaAvatarWrap}
              style={{
                left: avatar.x,
                top: avatar.y,
              }}
            >
              <div
                className={styles.ctaAvatar}
                style={{ width: avatar.size, height: avatar.size }}
              >
                <div className={styles.ctaAvatarCircle}>
                  <img
                    src={avatar.src}
                    alt=""
                    className={styles.ctaAvatarImg}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div ref={contentRef} className={styles.ctaContent}>
        <div className={styles.ctaContentInner}>
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
      </div>
    </section>
  );
}