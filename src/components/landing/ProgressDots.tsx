"use client";

import styles from "./ProgressDots.module.css";

// Props for the progress indicator dots
type ProgressDotsProps = {
  count: number;
  activeIndex: number;
};

// Renders a row of dots; the active one is highlighted to show carousel position
export default function ProgressDots({ count, activeIndex }: ProgressDotsProps) {
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={styles.progressDots} aria-hidden="true">
      {dots.map((i) => (
        <span
          key={i}
          className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
        />
      ))}
    </div>
  );
}
