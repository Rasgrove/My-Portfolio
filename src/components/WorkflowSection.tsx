"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const stepsEs = [
  {
    num: "01",
    title: "Descubrimiento y Alcance",
    desc: "Analizo tu negocio, tus objetivos y qué necesitas exactamente. Definimos los detalles del proyecto por escrito o videollamada para evitar malentendidos y asegurar que construiremos justo lo que necesitas.",
  },
  {
    num: "02",
    title: "Dirección Visual y Estructura",
    desc: "Definimos la paleta de colores, estructura, funcionalidades, tipografías y el estilo general basándonos en tus ideas. Trazo la estructura básica de las pantallas para organizar la información de forma lógica y orientada a la conversión.",
  },
  {
    num: "03",
    title: "Desarrollo y Comunicación Constante",
    desc: "Construyo tu sitio o aplicación web utilizando herramientas de desarrollo acelerado. Esto me permite entregar sistemas funcionales, rápidos y adaptables a celulares en una fracción del tiempo, manteniendo comunicación constante y transparente.",
  },
  {
    num: "04",
    title: "Pruebas y Despliegue",
    desc: "Reviso el sistema en diferentes dispositivos para garantizar que todo funcione bien. Incluyo SEO estándar para visibilidad en Google. Finalmente, despliego en servidor o te entrego los archivos listos para que decidas dónde alojarlo.",
  },
  {
    num: "05",
    title: "Soporte y Evolución",
    desc: "Al finalizar, te entrego el control total del proyecto. Si necesitas mantenimiento técnico, actualizaciones o mejoras continuas, podemos acordar un plan de soporte mensual. Ofrezco un período gratis de soporte para solucionar bugs.",
  },
];

const stepsEn = [
  {
    num: "01",
    title: "Discovery & Scope",
    desc: "I analyze your business, goals and what you need exactly. We define the project details in writing or via video call to avoid misunderstandings and ensure we build precisely what you need.",
  },
  {
    num: "02",
    title: "Visual Direction & Structure",
    desc: "We define the color palette, structure, features, typography and overall style based on your ideas. I outline the basic screen structure to organize information logically and focused on conversion.",
  },
  {
    num: "03",
    title: "Development & Constant Communication",
    desc: "I build your website or web application using accelerated development tools. This allows me to deliver functional, fast, mobile-ready systems in a fraction of the time, while maintaining constant and transparent communication.",
  },
  {
    num: "04",
    title: "Testing & Deployment",
    desc: "I review the system across different devices to ensure everything works well. I include standard SEO for Google visibility. Finally, I deploy to a server or hand over the ready-to-go files for you to decide where to host.",
  },
  {
    num: "05",
    title: "Support & Evolution",
    desc: "Upon completion, I hand you full control of the project. If you need maintenance, updates or ongoing improvements, we can agree on a monthly support plan. I offer a free support period to fix bugs.",
  },
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
