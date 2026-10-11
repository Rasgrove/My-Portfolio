"use client";

import { useEffect, useRef } from "react";

// Spring cursor: low stiffness, high damping — feels physical, not CSS
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
    let rx = mx, ry = my;
    let rafId: number;
    let isHovering = false;
    let isClicking = false;

    // Spring physics params
    const stiffness = 0.12;
    const damping = 0.78;
    let vx = 0, vy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; };
    const onDown  = () => { isClicking = true; };
    const onUp    = () => { isClicking = false; };

    // Attach hover detection to all interactive elements
    const targets = () => document.querySelectorAll("a, button, [role='button'], [data-cursor]");
    const attachTargets = () => {
      targets().forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachTargets();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const tick = () => {
      // Spring toward mouse
      const fx = (mx - rx) * stiffness;
      const fy = (my - ry) * stiffness;
      vx = vx * damping + fx;
      vy = vy * damping + fy;
      rx += vx;
      ry += vy;

      const size = isClicking ? 18 : isHovering ? 44 : 26;
      const opacity = isHovering ? 0.5 : 0.35;

      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.opacity = String(opacity);

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 5, height: 5,
          background: "var(--lime)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 26, height: 26,
          background: "transparent",
          border: "1.5px solid var(--lime)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform, width, height",
          transition: "width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />
    </>
  );
}
