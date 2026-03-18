"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./CTAParticles.module.css";

gsap.registerPlugin(ScrollTrigger);

// Three.js partiklar för CTA – intensifieras när sektionen är i view
export default function CTAParticles({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const count = 1200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const purple = new THREE.Color(0x8a4aff);
    const pink = new THREE.Color(0xe04aff);
    const blue = new THREE.Color(0x4a8aff);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const t = Math.random();
      const c = t < 0.4 ? purple : t < 0.8 ? pink : blue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        material.opacity = self.progress * 0.5;
      },
    });

    let time = 0;
    let frameId: number;

    function animate() {
      time += 0.012;
      frameId = requestAnimationFrame(animate);
      particles.rotation.y = time * 0.06;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      st.kill();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [sectionRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
