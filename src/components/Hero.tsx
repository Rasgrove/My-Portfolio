"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface HeroProps { locale: string; }

const copy = {
  es: {
    role1: "Full-Stack",
    role2: "Developer",
    sub: "Yamil Alarcon — Ingeniero de Sistemas, Bolivia. Construyo productos digitales para negocios que necesitan resultados, no excusas.",
    cta: "Hablemos",
    ctaSub: "wa.me/59177258517",
    scroll: "Scroll",
  },
  en: {
    role1: "Full-Stack",
    role2: "Developer",
    sub: "Yamil Alarcon — Systems Engineer, Bolivia. I build digital products for businesses that need results, not excuses.",
    cta: "Let's talk",
    ctaSub: "wa.me/59177258517",
    scroll: "Scroll",
  },
};

export default function Hero({ locale }: HeroProps) {
  const t = copy[locale as keyof typeof copy] ?? copy.es;
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const waUrl = `https://wa.me/59177258517?text=${encodeURIComponent(
    locale === "es"
      ? "Hola Yamil, me gustaria hablar sobre un proyecto."
      : "Hi Yamil, I'd like to talk about a project."
  )}`;

  // Parallax suave en el background en scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bg = bgRef.current;
    if (!bg) return;

    const onScroll = () => {
      const y = window.scrollY;
      bg.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Glitch en titulo al cargar
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const init = async () => {
      try {
        const { gsap } = await import("gsap");
        const el = document.querySelectorAll(".hero-word");
        gsap.fromTo(
          el,
          { y: "110%", skewX: -8 },
          { y: "0%", skewX: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.2 }
        );
      } catch { /* gsap no instalado aun */ }
    };
    init();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label={locale === "es" ? "Inicio" : "Hero"}
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "clamp(3rem, 7vw, 6rem)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        paddingTop: "80px",
      }}
    >
      {/* Background: foto a la derecha, grande, sin marco */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: 0,
          right: "clamp(-4rem, -2vw, 0rem)",
          bottom: 0,
          width: "clamp(52%, 60%, 68%)",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/yamil-alarcon.webp"
          alt="Yamil Alarcon — Full-Stack Developer"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            maskImage: "linear-gradient(to left, rgba(12,11,9,0.98) 0%, rgba(12,11,9,0.6) 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(12,11,9,0.98) 0%, rgba(12,11,9,0.6) 40%, transparent 100%)",
          }}
        />
        {/* Background pattern fondo */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/fondo-principal.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          mixBlendMode: "overlay",
          zIndex: -1,
        }} />
      </div>

      {/* Overlay inferior: gradiente en la mitad izquierda donde esta el texto */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, var(--ink) 35%, transparent 70%)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* CONTENIDO — sobre el overlay */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1400px" }}>

        {/* Kicker */}
        <span
          className="kicker"
          style={{ marginBottom: "2rem" }}
        >
          Bolivia &middot; UTC-4 &middot; Fluent English
        </span>

        {/* Titulo principal — gigante, con overflow clip para animacion */}
        <h1 aria-label={`${t.role1} ${t.role2}`}>
          {[t.role1, t.role2].map((word, i) => (
            <div
              key={word}
              style={{ overflow: "hidden", lineHeight: 0.92, display: "block" }}
            >
              <span
                className="hero-word"
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(4rem, 13vw, 12rem)",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: i === 1 ? "var(--lime)" : "var(--fg)",
                  lineHeight: 0.92,
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitulo + CTA — fila inferior */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "flex-end",
          marginTop: "clamp(2.5rem, 5vw, 4.5rem)",
          maxWidth: 860,
        }}>
          <p
            className="body-text"
            style={{ color: "var(--fg-dim)", fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", maxWidth: "46ch" }}
          >
            {t.sub}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-fill"
            aria-label={locale === "es" ? "Contactar por WhatsApp" : "Contact via WhatsApp"}
          >
            {t.cta} &rarr;
          </a>
        </div>
      </div>

      {/* Indicador scroll */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        right: "var(--gutter)",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        opacity: 0.4,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>{t.scroll}</span>
        <div style={{ width: 40, height: 1, background: "var(--fg)" }} />
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 640px) {
          #hero > div[style*="zIndex: 2"] { max-width: 100% !important; }
          #hero > div[style*="zIndex: 2"] > div[style*="grid"] { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
