"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const stepsEs = [
  { num: "01", title: "Descubrimiento",  desc: "Entender tus objetivos, audiencia y requisitos." },
  { num: "02", title: "Planificacion",   desc: "Investigacion y plan estrategico basado en datos." },
  { num: "03", title: "Wireframe",       desc: "Estructura visual para mapear el recorrido del usuario." },
  { num: "04", title: "Diseno",          desc: "Estilo visual centrado en tu marca y UX." },
  { num: "05", title: "Desarrollo",      desc: "Codigo limpio, typesafe y sin deuda tecnica." },
  { num: "06", title: "Pruebas",         desc: "QA en dispositivos reales, navegadores, rendimiento." },
  { num: "07", title: "Lanzamiento",     desc: "Deploy, dominio, SSL. Todo configurado." },
  { num: "08", title: "Soporte",         desc: "Asistencia continua para que tu negocio siga creciendo." },
];

const stepsEn = [
  { num: "01", title: "Discovery",    desc: "Understand your goals, audience and requirements." },
  { num: "02", title: "Planning",     desc: "Research and strategic plan based on data." },
  { num: "03", title: "Wireframe",    desc: "Visual structure to map the user journey." },
  { num: "04", title: "Design",       desc: "Visual style centered on your brand and UX." },
  { num: "05", title: "Development",  desc: "Clean, typesafe code. No technical debt." },
  { num: "06", title: "Testing",      desc: "QA on real devices, browsers, performance." },
  { num: "07", title: "Launch",       desc: "Deploy, domain, SSL. Everything configured." },
  { num: "08", title: "Support",      desc: "Ongoing assistance so your business keeps growing." },
];

export default function WorkflowSection({ locale }: { locale: string }) {
  const steps = locale === "es" ? stepsEs : stepsEn;
  const heading = locale === "es" ? "Asi trabajo." : "How I work.";
  const kicker = locale === "es" ? "Proceso" : "Process";
  const listRef = useRef<HTMLOListElement>(null);

  // Reveal con IntersectionObserver
  useEffect(() => {
    const items = listRef.current?.querySelectorAll("li");
    if (!items) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((item, i) => {
      (item as HTMLElement).style.opacity = "0";
      (item as HTMLElement).style.transform = "translateY(24px)";
      (item as HTMLElement).style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="workflow"
      className="grain"
      style={{ position: "relative", overflow: "hidden", background: "var(--ink)" }}
    >
      {/* Glitch background — un poco mas visible */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.22 }}>
        <Image src="/images/glitch-verdes-negros.webp" alt="" fill style={{ objectFit: "cover" }} />
      </div>

      {/* Fondo laptop/codigo — toque editorial mas visible */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "50%", zIndex: 0,
        backgroundImage: "url('/images/fondo-principal.webp')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.15, maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,0.7) 60%)",
        WebkitMaskImage: "linear-gradient(to right, transparent, rgba(0,0,0,0.7) 60%)",
      }} />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(214,244,73,0.11) 1.2px, transparent 1.2px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Ghost PROCESS detrás del heading */}
      <span className="ghost-text" style={{ bottom: "0", left: "-2rem", opacity: 0.6 }}>PROCESS</span>

      <div
        className="section-pad"
        style={{ position: "relative", zIndex: 1, maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}
      >
        <span className="kicker">{kicker}</span>
        {/* Linea de acento lima */}
        <div style={{ width: "clamp(3rem, 8vw, 7rem)", height: 2, background: "var(--lime)", marginBottom: "1.5rem" }} />

        {/* Heading tipografico grande */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 10vw, 9rem)",
            letterSpacing: "-0.045em",
            textTransform: "uppercase",
            lineHeight: 0.9,
            color: "var(--fg)",
            marginBottom: "clamp(3.5rem, 8vw, 7rem)",
          }}
        >
          {heading}
        </h2>

        {/* Lista numerada: dos columnas en desktop, fluida */}
        <ol
          ref={listRef}
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          }}
        >
          {steps.map(({ num, title, desc }) => (
            <li
              key={num}
              style={{
                borderTop: "1px solid rgba(242,237,230,0.1)",
                padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
                display: "grid",
                gridTemplateColumns: "3rem 1fr",
                gap: "1.25rem",
                alignItems: "flex-start",
              }}
            >
              {/* Numero */}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "var(--lime)",
                letterSpacing: "0.1em",
                paddingTop: "0.3rem",
              }}>
                {num}
              </span>

              {/* Texto */}
              <div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1rem, 2vw, 1.4rem)",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.1,
                }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "0.88rem",
                  color: "var(--fg-dim)",
                  lineHeight: 1.6,
                }}>
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
