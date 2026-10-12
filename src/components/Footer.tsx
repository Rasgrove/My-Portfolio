"use client";

import Image from "next/image";
import AsciiDonut from "./AsciiDonut";

const copy = {
  es: {
    rights: "Todos los derechos reservados",
    ready: "Listo cuando tú lo estés",
    talk: "Hablemos.",
    top: "Volver arriba ↑",
    status: "DISPONIBLE PARA NUEVOS PROYECTOS",
    location: "Bolivia (UTC-4) · La Paz & Cochabamba",
    stackInfo: "Next.js 16 · React 19 · TypeScript · GSAP",
  },
  en: {
    rights: "All rights reserved",
    ready: "Ready when you are",
    talk: "Let's talk.",
    top: "Back to top ↑",
    status: "AVAILABLE FOR SELECT PROJECTS",
    location: "Bolivia (UTC-4) · La Paz & Cochabamba",
    stackInfo: "Next.js 16 · React 19 · TypeScript · GSAP",
  },
};

export default function Footer({ locale }: { locale: string }) {
  const t = copy[locale as keyof typeof copy] ?? copy.es;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="colofon"
      className="grain"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--ink)",
        borderTop: "1px solid rgba(242,237,230,0.12)",
        padding: "clamp(2.5rem, 5vw, 4rem) var(--gutter) clamp(1.5rem, 3vw, 2.5rem)",
      }}
    >
      {/* Glitch bg overlay — mas visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "url('/images/glitch-verdes-negros.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.16,
        }}
      />

      {/* Dot-grid sutil */}
      <div
        className="dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Ghost text */}
      <span
        className="ghost-text"
        style={{ bottom: "-1.5rem", left: "50%", transform: "translateX(-50%)" }}
      >
        Y.A. SYSTEMS
      </span>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        
        {/* Fila superior: Logo Y.A. SYSTEMS (original_YA_text_only) + Status + Volver arriba */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.25rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid rgba(242,237,230,0.1)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {/* Logo Y.A. SYSTEMS — blanco invertido sin fondo */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Image
              src="/images/original_YA_text_only.png"
              alt="Y.A. Systems"
              width={140}
              height={32}
              style={{
                height: "26px",
                width: "auto",
                objectFit: "contain",
                filter: "invert(1)", // Negro a blanco puro
              }}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--lime)",
                background: "rgba(214, 244, 73, 0.08)",
                border: "1px solid rgba(214, 244, 73, 0.25)",
                padding: "0.25rem 0.55rem",
                borderRadius: "2px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--lime)",
                  display: "inline-block",
                  boxShadow: "0 0 6px var(--lime)",
                }}
              />
              {t.status}
            </span>
          </div>

          {/* Boton volver arriba */}
          <button
            onClick={scrollToTop}
            style={{
              background: "transparent",
              border: "1px solid rgba(242,237,230,0.15)",
              color: "rgba(242,237,230,0.7)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.35rem 0.75rem",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--lime)";
              e.currentTarget.style.color = "var(--lime)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(242,237,230,0.15)";
              e.currentTarget.style.color = "rgba(242,237,230,0.7)";
            }}
          >
            {t.top}
          </button>
        </div>

        {/* Bloque central: CTA y ASCII Donut lado a lado o balanceado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: "2.5rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          {/* CTA "Hablemos." — con tamaño reducido y elegante */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fg-dim)",
                marginBottom: "0.75rem",
              }}
            >
              {t.ready}
            </p>
            <a
              href="#contacto"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "var(--lime)",
                textDecoration: "none",
                lineHeight: 0.92,
                display: "inline-block",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.75";
                e.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {t.talk} &rarr;
            </a>
          </div>

          {/* ASCII Donut — reducido de tamaño, zoom alejado, nítido y elegante */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0.75rem 1.25rem",
              border: "1px solid rgba(214, 244, 73, 0.15)",
              background: "rgba(12, 11, 9, 0.5)",
              borderRadius: "4px",
            }}
          >
            <AsciiDonut visible={true} />
          </div>
        </div>

        {/* Fila inferior de metadata técnica y redes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.25rem",
            borderTop: "1px solid rgba(242,237,230,0.08)",
            paddingTop: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "rgba(242,237,230,0.45)",
                letterSpacing: "0.1em",
              }}
            >
              &copy; {new Date().getFullYear()} Yamil Alarcón &mdash; {t.rights}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                color: "rgba(242,237,230,0.25)",
                letterSpacing: "0.08em",
              }}
            >
              {t.location} &middot; {t.stackInfo}
            </p>
          </div>

          {/* Enlaces a redes con iconos */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
            aria-label="Social links"
          >
            {[
              { href: "https://github.com/Rasgrove", label: "GitHub" },
              { href: "https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/", label: "LinkedIn" },
              { href: "https://wa.me/59177258517", label: "WhatsApp" },
              { href: "mailto:elyamilalarcon.111@gmail.com", label: "Email" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.64rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(242,237,230,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--lime)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.45)")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

    </footer>
  );
}
