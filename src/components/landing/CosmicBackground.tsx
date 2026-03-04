"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CosmicBackground.module.css";

type CosmicBackgroundProps = {
  layer1Src?: string;
  layer2Src?: string;
  fixed?: boolean;
  className?: string;
};

export default function CosmicBackground({
  layer1Src = "/cosmic-1.png",
  layer2Src = "/cosmic-3.png",
  fixed = true,
  className,
}: CosmicBackgroundProps) {
  const sphere = useRef<HTMLImageElement>(null);
  const swirl = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sphere.current || !swirl.current) return;

    gsap.to(sphere.current, {
      scale: 1.1,
      rotate: 4,
      duration: 18,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(swirl.current, {
      scale: 1.05,
      duration: 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${fixed ? styles.bgWrap : styles.bgWrapSection} ${className ?? ""}`}
    >
      <img
        ref={sphere}
        className={styles.bgLayer1}
        src={layer1Src}
        alt=""
      />
      <img
        ref={swirl}
        className={styles.bgLayer2}
        src={layer2Src}
        alt=""
      />
    </div>
  );
}
