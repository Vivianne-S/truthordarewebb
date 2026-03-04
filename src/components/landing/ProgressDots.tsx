"use client";

import styles from "./ProgressDots.module.css";

type ProgressDotsProps = {
  count: number;
  activeIndex: number;
};

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
