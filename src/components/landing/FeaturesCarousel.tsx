"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FEATURES } from "@/constants/landing";
import FeatureCard from "./FeatureCard";
import ProgressDots from "./ProgressDots";
import GalleryThreeBackground from "./GalleryThreeBackground";
import styles from "./FeaturesCarousel.module.css";

gsap.registerPlugin(ScrollTrigger);

// Scroll-pinned carousel: cards move horizontally with scroll, spotlight effect, futuristic feel
export default function FeaturesCarousel() {
  const featuresRef = useRef<HTMLElement>(null);
  const featuresRowRef = useRef<HTMLDivElement>(null);
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Callback to sync active index for ProgressDots
  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = featuresRef.current;
      const row = featuresRowRef.current;
      const cards = featureCardRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!section || !row || cards.length === 0) return;

      // Fade in the section – smooth futuristic entrance
      gsap.fromTo(
        section,
        { opacity: 0, y: 80, filter: "blur(14px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 40%",
            scrub: 1.5,
          },
        }
      );

      // Maximum horizontal offset (negative) for the row when fully scrolled
      const getMaxX = () => {
        const sectionWidth = section.clientWidth;
        const rowWidth = row.scrollWidth;
        return Math.min(0, sectionWidth - rowWidth);
      };

      // Enable 3D transforms for smooth scale/rotate animations
      gsap.set(row, { x: 0, force3D: true });
      cards.forEach((c) =>
        gsap.set(c, {
          transformPerspective: 1200,
          transformOrigin: "center center",
        })
      );
      gsap.set(cards, { transformStyle: "preserve-3d", force3D: true });

      // QuickTo setters – smoother, more futuristic feel
      const setters = cards.map((card) => ({
        scale: gsap.quickTo(card, "scale", {
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        }),
        opacity: gsap.quickTo(card, "opacity", {
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        }),
        rotateY: gsap.quickTo(card, "rotateY", {
          duration: 0.28,
          ease: "power3.out",
          overwrite: true,
        }),
      }));

      // Get the horizontal center of the section viewport
      const centerX = () => {
        const r = section.getBoundingClientRect();
        return r.left + r.width / 2;
      };

      let prevClosestIndex = -1;

      // Update scale, opacity, rotateY for each card based on distance from center
      const updateSpotlight = () => {
        const cx = centerX();
        cards.forEach((c) => {
          c.classList.remove(styles.featureCardSlotActive, styles.featureCardSlotBump);
        });

        let closestIndex = 0;
        let closestDistance = Infinity;

        for (let i = 0; i < cards.length; i++) {
          const rect = cards[i].getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - cx);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }

          const norm = Math.min(1, distance / 380);
          const smoothNorm = 1 - Math.pow(1 - norm, 1.5);

          const scale = i === closestIndex ? 1.08 : 0.62;
          const opacity = 0.5 + 0.5 * (1 - smoothNorm);
          const rotateY = ((cardCenter - cx) / 480) * -6;

          setters[i].scale(scale);
          setters[i].opacity(opacity);
          setters[i].rotateY(rotateY);
        }

        const activeCard = cards[closestIndex];
        activeCard?.classList.add(styles.featureCardSlotActive);

        // Bump animation when snapping to a new card: scale pulse + glow
        if (closestIndex !== prevClosestIndex && prevClosestIndex >= 0) {
          activeCard?.classList.add(styles.featureCardSlotBump);
          gsap.fromTo(
            activeCard,
            { scale: 1.14 },
            {
              scale: 1.08,
              duration: 0.45,
              ease: "power3.out",
              overwrite: true,
            }
          );
          setTimeout(() => {
            activeCard?.classList.remove(styles.featureCardSlotBump);
          }, 350);
        }
        prevClosestIndex = closestIndex;
        updateActiveIndex(closestIndex);
      };

      // Compute snap positions so each card centers when scrolled
      const getSnapPoints = () => {
        const maxX = getMaxX();
        const sectionW = section.clientWidth;

        gsap.set(row, { x: 0 });

        const points: number[] = cards.map((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenterGlobal = rect.left + rect.width / 2;

          const sectionRect = section.getBoundingClientRect();
          const sectionCenterGlobal = sectionRect.left + sectionW / 2;

          const delta = sectionCenterGlobal - cardCenterGlobal;
          return gsap.utils.clamp(maxX, 0, delta);
        });

        points.sort((a, b) => b - a);
        return { points, maxX };
      };

      let snapPoints = getSnapPoints();
      // Track last snapped index to enforce one-step-at-a-time snapping
      let lastSnapIndex = 0;

      // ScrollTrigger: pin section, scrub row x, snap to cards, update spotlight
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(Math.abs(getMaxX()) * 1.8 + 1500, 5000)}`,
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          snap: {
            snapTo: (value) => {
              const maxX = snapPoints.maxX;
              const x = value * maxX;

              const nearest = gsap.utils.snap(snapPoints.points, x);
              const nearestIndex = snapPoints.points.indexOf(nearest);

              // Enforce one-step-at-a-time: only move 1 index per scroll direction
              const step = Math.sign(nearestIndex - lastSnapIndex);
              const clampedIndex = Math.max(
                0,
                Math.min(
                  snapPoints.points.length - 1,
                  lastSnapIndex + (step === 0 ? 0 : step)
                )
              );

              lastSnapIndex = clampedIndex;

              const clampedX = snapPoints.points[clampedIndex];
              return maxX === 0 ? 0 : clampedX / maxX;
            },
            duration: { min: 0.5, max: 0.9 },
            ease: "power3.inOut",
            inertia: true,
          },

          onUpdate: updateSpotlight,
          // Recompute snap points on resize/load
          onRefresh: () => {
            gsap.set(row, { x: 0 });
            snapPoints = getSnapPoints();
            lastSnapIndex = 0;
            updateSpotlight();
          },
        },
      });

      // Animate row from 0 to maxX as scroll progress goes 0→1
      tl.to(row, {
        x: () => getMaxX(),
        ease: "none",
        onUpdate: updateSpotlight,
      });

      updateSpotlight();

      // Refresh ScrollTrigger on load/resize so pin/snap recalculate
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);
      const t = window.setTimeout(refresh, 250);
      const t2 = window.setTimeout(refresh, 800);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        window.clearTimeout(t);
        window.clearTimeout(t2);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuresRef} className={styles.featuresSection}>
      <GalleryThreeBackground sectionRef={featuresRef} />
      <div className={styles.featuresVignette} aria-hidden="true" />
      <ProgressDots count={FEATURES.length} activeIndex={activeIndex} />
      <div ref={featuresRowRef} className={styles.featuresRow}>
        {FEATURES.map((f, i) => (
          <div
            key={`${f.label}-${i}`}
            ref={(el) => {
              featureCardRefs.current[i] = el;
            }}
            className={styles.featureCardSlot}
          >
            <FeatureCard
              label={f.label}
              imageSrc={f.image}
              isActive={i === activeIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
