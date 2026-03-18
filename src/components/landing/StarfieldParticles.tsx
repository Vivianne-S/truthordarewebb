"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./StarfieldParticles.module.css";

// WebGL starfield overlay – depth layers, subtle mouse parallax, cosmic colors
export default function StarfieldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
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

    // Particle count – balanced for performance
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const purple = new THREE.Color(0x8a4aff);
    const pink = new THREE.Color(0xe04aff);
    const blue = new THREE.Color(0x4a8aff);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < count; i++) {
      // Spread in a wide box (parallax depth)
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Cosmic color mix – purple, pink, blue + white for sparkle
      const t = Math.random();
      const c = t < 0.2 ? white : t < 0.5 ? purple : t < 0.8 ? pink : blue;
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
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    let time = 0;
    function animate() {
      time += 0.004;
      frameRef.current = requestAnimationFrame(animate);

      // Gentle rotation + mouse parallax
      particles.rotation.y = time * 0.1 + mouseRef.current.x;
      particles.rotation.x = mouseRef.current.y * 0.3;

      // Subtle pulse on opacity
      const opacity = 0.5 + Math.sin(time * 2) * 0.12;
      (material as THREE.PointsMaterial).opacity = Math.min(0.7, opacity);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
