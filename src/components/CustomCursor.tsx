"use client";

import { useEffect, useRef } from "react";

// Inverted lens cursor with physics and high contrast (mix-blend-mode: difference)
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId: number;
    let isHovering = false;
    let isClicking = false;

    // Spring physics params for smooth organic trailing
    const stiffness = 0.16;
    const damping = 0.75;
    let vx = 0;
    let vy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], [data-cursor], input, textarea, select"
      );
      isHovering = !!target;
    };

    const onDown = () => { isClicking = true; };
    const onUp = () => { isClicking = false; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });

    const tick = () => {
      // Spring toward mouse
      const fx = (mx - rx) * stiffness;
      const fy = (my - ry) * stiffness;
      vx = vx * damping + fx;
      vy = vy * damping + fy;
      rx += vx;
      ry += vy;

      const size = isClicking ? 20 : isHovering ? 52 : 32;

      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.background = isClicking
        ? "rgba(255, 255, 255, 0.4)"
        : isHovering
        ? "rgba(255, 255, 255, 0.2)"
        : "transparent";

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Central precise dot in negative / difference mode */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          background: "#ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Trailing lens ring with thicker 2.2px line and difference blending */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          background: "transparent",
          border: "2.2px solid #ffffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          mixBlendMode: "difference",
          opacity: 1,
          willChange: "transform, width, height, background",
          transition: "width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease",
        }}
      />
    </>
  );
}
