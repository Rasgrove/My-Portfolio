"use client";

import { useEffect } from "react";

// Lenis smooth scroll wrapper — single rAF, lagSmoothing(0)
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: any;
    let rafId: number;

    const init = async () => {
      try {
        const LenisModule = await import("lenis");
        const Lenis = LenisModule.default;

        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        // Expose for GSAP ScrollTrigger integration
        (window as any).__lenis = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not installed yet — silently skip
      }
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
