"use client";

import { useState, ReactNode } from "react";
import styles from "./FeatureCard.module.css";

// Props for a single feature card in the carousel
type FeatureCardProps = {
  label: string;
  imageSrc?: string | null;
  children?: ReactNode;
  isActive?: boolean;
};

// Displays a feature screenshot with label; falls back to placeholder if image fails
export default function FeatureCard({
  label,
  imageSrc,
  children,
  isActive = false,
}: FeatureCardProps) {
  // Track image load errors to show placeholder instead
  const [imageError, setImageError] = useState(false);
  const showImage = imageSrc && !imageError;

  return (
    <div className={styles.featureCard}>
      <div
        className={`${styles.featureCardImageWrap} ${isActive ? styles.featureCardImageWrapActive : ""}`}
      >
        {showImage ? (
          <img
            src={imageSrc}
            alt={label}
            className={styles.featureCardImage}
            onError={() => setImageError(true)} // Fallback to placeholder on load failure
          />
        ) : (
          // Placeholder when no image or image failed to load
          <div className={styles.featureCardPlaceholder}>
            {children ?? label}
          </div>
        )}
      </div>
      <p className={styles.featureCardLabel}>{label}</p>
    </div>
  );
}
