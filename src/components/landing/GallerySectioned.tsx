"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { GALLERY_SECTIONS } from "@/constants/landing";
import FeatureCard from "./FeatureCard";
import GalleryThreeBackground from "./GalleryThreeBackground";
import GallerySectionTitle from "./GallerySectionTitle";
import ProgressDots from "./ProgressDots";
import styles from "./GallerySectioned.module.css";

gsap.registerPlugin(ScrollTrigger);

// Scroll distance per image – user must scroll through all
const SCROLL_PER_IMAGE = 420;
const SCROLL_PER_SECTION_GAP = 40; // Minimal paus mellan sektioner, ingen död zon

// Four gallery sections – pinned, must scroll through all, smooth transitions
export default function GallerySectioned() {
  const tSections = useTranslations("gallery.sections");
  const tLabels = useTranslations("gallery.labels");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [activeCard, setActiveCard] = useState<number[]>(GALLERY_SECTIONS.map(() => 0));

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    if (!wrapper || !viewport) return;

    const sections = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    const titles = titleRefs.current.filter(Boolean) as HTMLDivElement[];
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

    if (sections.length === 0) return;

    // Total scroll = sum of (images * scroll each) + gaps between sections
    const totalImages = GALLERY_SECTIONS.reduce((sum, s) => sum + s.images.length, 0);
    const totalScroll =
      totalImages * SCROLL_PER_IMAGE +
      (GALLERY_SECTIONS.length - 1) * SCROLL_PER_SECTION_GAP;

    const ctx = gsap.context(() => {
      // Initial: only first section visible
      gsap.set(sections, { opacity: 0, scale: 0.96, filter: "blur(8px)" });
      gsap.set(sections[0], { opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(titles, { opacity: 0, y: 30 });
      gsap.set(titles[0], { opacity: 1, y: 0 });

      // Build section ranges: [startProgress, endProgress] for each section
      let acc = 0;
      const sectionRanges = GALLERY_SECTIONS.map((sec) => {
        const start = acc / totalScroll;
        const len = sec.images.length * SCROLL_PER_IMAGE + SCROLL_PER_SECTION_GAP;
        acc += len;
        return { start, end: acc / totalScroll };
      });

      // quickTo för smooth animation – ingen hackig insta-set
      const CROSSFADE_ZONE = 0.006; // Snabb övergång – en sektion i taget
      const rowSetters = rows.map((r) => r ? gsap.quickTo(r, "x", { duration: 0.3, ease: "power2.out" }) : null);

      // Main pinned ScrollTrigger
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const p = self.progress;

          // Which section are we in?
          let currentSection = 0;
          for (let i = 0; i < sectionRanges.length; i++) {
            if (p >= sectionRanges[i].start) currentSection = i;
          }
          setActiveSection(currentSection);

          // Section visibility – smooth crossfade mellan sektioner
          sections.forEach((section, i) => {
            const range = sectionRanges[i];
            const rangeLen = range.end - range.start;
            const isPast = p > range.end;
            const isFuture = p < range.start;

            let opacity: number;
            if (isFuture) {
              const fadeInStart = range.start - CROSSFADE_ZONE;
              opacity = p < fadeInStart ? 0 : Math.min(1, (p - fadeInStart) / CROSSFADE_ZONE);
            } else if (isPast) {
              const fadeOutEnd = range.end + CROSSFADE_ZONE;
              opacity = p > fadeOutEnd ? 0 : Math.min(1, (fadeOutEnd - p) / CROSSFADE_ZONE);
            } else {
              opacity = 1;
            }

            const scale = opacity > 0.5 ? 1 : isPast ? 0.94 : 0.96;
            const blur = opacity > 0.5 ? 0 : isPast ? 6 : 8;
            const titleY = opacity > 0.5 ? 0 : isPast ? -20 : 30;

            gsap.set(section, { opacity, scale, filter: `blur(${blur}px)` });
            gsap.set(titles[i], { opacity, y: titleY });
          });

          // Carousel – mjuk interpolation mellan kort
          const sec = GALLERY_SECTIONS[currentSection];
          const secRange = sectionRanges[currentSection];
          const localP = Math.max(0, (secRange.end - secRange.start) > 0
            ? (p - secRange.start) / (secRange.end - secRange.start)
            : 0);
          const numImages = sec.images.length;
          const carouselProgress = localP * numImages;
          const cardIndex = Math.min(
            numImages - 1,
            Math.max(0, Math.floor(carouselProgress))
          );
          const cardProgressFrac = carouselProgress - cardIndex;

          setActiveCard((prev) => {
            const next = [...prev];
            next[currentSection] = cardIndex;
            return next;
          });

          const row = rows[currentSection];
          if (!row) return;

          const w = viewport.clientWidth;
          const rowW = row.scrollWidth;
          const cardWidth = 360;
          const gap = 48;
          const slotWidth = cardWidth + gap;
          const isBalanced = numImages <= 4;

          const xForCard = (idx: number) => {
            if (isBalanced && numImages >= 2) {
              const spacer = slotWidth;
              const rowLeft = (w - rowW) / 2;
              const cardCenterOffset = spacer + gap + idx * slotWidth + cardWidth / 2;
              return w / 2 - rowLeft - cardCenterOffset;
            }
            const paddingLeft = Math.max(16, w / 2 - 180);
            const cardCenterOffset = idx * slotWidth + cardWidth / 2;
            return w / 2 - paddingLeft - cardCenterOffset;
          };

          const nextIdx = Math.min(cardIndex + 1, numImages - 1);
          const x = cardProgressFrac > 0.01
            ? xForCard(cardIndex) + cardProgressFrac * (xForCard(nextIdx) - xForCard(cardIndex))
            : xForCard(cardIndex);

          const setRowX = rowSetters[currentSection];
          if (setRowX) setRowX(x);
          else gsap.set(row, { x });

          // Spotlight – följer row som nu animeras smooth via quickTo
          const cards = row.querySelectorAll(`.${styles.cardSlot}`);
          const cx = viewport.clientWidth / 2;
          cards.forEach((card, j) => {
            const rect = (card as HTMLElement).getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenter - cx);
            const norm = Math.min(1, dist / 400);
            const scale = j === cardIndex ? 1.08 : 0.88;
            const opacity = 0.82 + 0.18 * (1 - norm);
            const rotateY = ((cardCenter - cx) / 500) * -4;
            gsap.set(card as HTMLElement, { scale, opacity, rotateY });
          });
        },
      });
    }, wrapper);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    const t = setTimeout(refresh, 400);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={viewportRef} className={styles.viewport}>
        <GalleryThreeBackground sectionRef={wrapperRef} />
        <div className={styles.vignette} aria-hidden="true" />

        {GALLERY_SECTIONS.map((section, sectionIndex) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
            className={styles.section}
            data-section={section.id}
          >
            <GallerySectionTitle
              ref={(el) => { titleRefs.current[sectionIndex] = el; }}
              title={tSections(section.titleKey)}
              isActive={activeSection === sectionIndex}
            />
            <div
              ref={(el) => { rowRefs.current[sectionIndex] = el; }}
              className={styles.row}
              data-balanced={section.images.length <= 4 && section.images.length >= 2}
            >
              {section.images.length <= 4 && section.images.length >= 2 && (
                <div className={styles.rowSpacer} aria-hidden="true" />
              )}
              {section.images.map((img, imgIndex) => (
                <div
                  key={`${section.id}-${imgIndex}`}
                  className={`${styles.cardSlot} ${
                    activeSection === sectionIndex && activeCard[sectionIndex] === imgIndex
                      ? styles.cardSlotActive
                      : ""
                  }`}
                >
                  <FeatureCard
                    label={tLabels(img.labelKey)}
                    imageSrc={img.src}
                    isActive={
                      activeSection === sectionIndex &&
                      activeCard[sectionIndex] === imgIndex
                    }
                  />
                </div>
              ))}
              {section.images.length <= 4 && section.images.length >= 2 && (
                <div className={styles.rowSpacer} aria-hidden="true" />
              )}
            </div>
          </div>
        ))}
        <ProgressDots
          count={GALLERY_SECTIONS.length}
          activeIndex={activeSection}
        />
      </div>
    </div>
  );
}
