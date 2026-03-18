"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./GalleryThreeBackground.module.css";

gsap.registerPlugin(ScrollTrigger);

// WebGL futuristic grid + floating orbs that react to scroll – sits behind the carousel
export default function GalleryThreeBackground({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const gridRef = useRef<THREE.Group | null>(null);
  const orbsRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Futuristic grid
    const gridHelper = new THREE.GridHelper(20, 24, 0x8a4aff, 0x4a1a8a);
    gridHelper.material.opacity = 0.12;
    (gridHelper.material as THREE.Material).transparent = true;
    gridHelper.position.z = -4;
    const gridGroup = new THREE.Group();
    gridGroup.add(gridHelper);
    scene.add(gridGroup);
    gridRef.current = gridGroup;

    // Floating orbs
    const orbGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const orbGroup = new THREE.Group();
    const orbPositions = [
      [-3, 1.5, -2],
      [2.5, -1, -1.5],
      [-1.5, -2, -3],
      [3, 1, -2.5],
      [0, 2.5, -1],
    ];
    orbPositions.forEach((pos, i) => {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xe04aff : 0x8a4aff,
        transparent: true,
        opacity: 0.25,
      });
      const orb = new THREE.Mesh(orbGeometry, material);
      orb.position.set(pos[0], pos[1], pos[2]);
      orbGroup.add(orb);
    });
    scene.add(orbGroup);
    orbsRef.current = orbGroup;

    // Scroll-driven parallax and intensity
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (gridGroup) {
          gridGroup.rotation.y = p * Math.PI * 0.15;
          (gridHelper.material as THREE.Material).opacity = 0.08 + p * 0.12;
        }
        if (orbGroup) {
          orbGroup.rotation.y = p * Math.PI * 0.2;
          orbGroup.children.forEach((orb, i) => {
            const m = orb as THREE.Mesh;
            if (m.material && "opacity" in m.material) {
              (m.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(p * Math.PI + i) * 0.15;
            }
          });
        }
      },
    });

    let time = 0;
    function animate() {
      time += 0.016;
      frameRef.current = requestAnimationFrame(animate);

      if (gridGroup) gridGroup.rotation.x = Math.sin(time * 0.3) * 0.02;
      if (orbGroup) {
        orbGroup.children.forEach((orb, i) => {
          orb.position.y += Math.sin(time + i) * 0.002;
        });
      }

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
      cancelAnimationFrame(frameRef.current);
      orbGeometry.dispose();
      orbGroup.children.forEach((c) => {
        const m = (c as THREE.Mesh).material;
        if (Array.isArray(m)) m.forEach((mat) => mat.dispose());
        else if (m) m.dispose();
      });
      (gridHelper.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [sectionRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
