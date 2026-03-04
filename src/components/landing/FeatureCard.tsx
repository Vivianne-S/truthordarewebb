"use client";

import { useState, ReactNode } from "react";
import styles from "./FeatureCard.module.css";

type FeatureCardProps = {
  label: string;
  imageSrc?: string | null;
  children?: ReactNode;
  isActive?: boolean;
};

export default function FeatureCard({
  label,
  imageSrc,
  children,
  isActive = false,
}: FeatureCardProps) {
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
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.featureCardPlaceholder}>
            {children ?? label}
          </div>
        )}
      </div>
      <p className={styles.featureCardLabel}>{label}</p>
    </div>
  );
}
