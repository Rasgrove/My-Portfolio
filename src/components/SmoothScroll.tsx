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

        // Pause Lenis during pinch-zoom (2+ touch points) to avoid freeze on mobile
        const onTouchStart = (e: TouchEvent) => {
          if (e.touches.length >= 2) lenis?.stop();
        };
        const onTouchEnd = (e: TouchEvent) => {
          if (e.touches.length < 2) lenis?.start();
        };
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        const raf = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        // Cleanup stored so destroy() can remove listeners
        const prevDestroy = lenis.destroy.bind(lenis);
        lenis.destroy = () => {
          window.removeEventListener("touchstart", onTouchStart);
          window.removeEventListener("touchend", onTouchEnd);
          prevDestroy();
        };
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
