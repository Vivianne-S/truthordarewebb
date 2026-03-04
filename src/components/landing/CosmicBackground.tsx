"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./landing.module.css";

export default function CosmicBackground() {

  const sphere = useRef<HTMLImageElement>(null);
  const swirl = useRef<HTMLImageElement>(null);

  useEffect(() => {

    gsap.to(sphere.current,{
      scale:1.1,
      rotate:4,
      duration:18,
      ease:"sine.inOut",
      repeat:-1,
      yoyo:true
    })

    gsap.to(swirl.current,{
      y:-30,
      scale:1.05,
      duration:12,
      ease:"sine.inOut",
      repeat:-1,
      yoyo:true
    })

  },[])

  return(
    <div className={styles.bgWrap}>

      <img
        ref={sphere}
        className={styles.bgLayer1}
        src="/cosmic-1.png"
      />

      <img
        ref={swirl}
        className={styles.bgLayer2}
        src="/cosmic-3.png"
      />

    </div>
  )
}