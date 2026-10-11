"use client";

import AsciiDonut from "./AsciiDonut";

const copy = {
  es: { rights: "Todos los derechos reservados", built: "Construido con Next.js" },
  en: { rights: "All rights reserved", built: "Built with Next.js" },
};

export default function Footer({ locale }: { locale: string }) {
  const t = copy[locale as keyof typeof copy] ?? copy.es;

  return (
    <footer
      id="colofon"
      className="grain"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--ink)",
        borderTop: "1px solid rgba(242,237,230,0.08)",
        padding: "clamp(4rem, 8vw, 7rem) var(--gutter) clamp(2rem, 4vw, 3rem)",
      }}
    >
      {/* Glitch faint bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "url('/images/glitch-verdes-negros.webp')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.06,
      }} />
      {/* Ghost CTA text detr\u00e1s */}
      <span className="ghost-text" style={{ bottom: "-3rem", left: "50%", transform: "translateX(-50%)" }}>CONTACT</span>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        {/* CTA grande — centrado como remate editorial */}
        <div style={{ textAlign: "center", marginBottom: "clamp(4rem, 8vw, 7rem)" }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--fg-dim)",
            marginBottom: "1.5rem",
          }}>
            {locale === "es" ? "Listo cuando tu lo estes" : "Ready when you are"}
          </p>
          <a
            href="https://wa.me/59177258517"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem, 10vw, 9rem)",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--lime)",
              textDecoration: "none",
              lineHeight: 0.9,
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            {locale === "es" ? "Hablemos." : "Let's talk."}
          </a>
        </div>

        {/* ASCII Donut separador oculto pero funcional como easter egg */}
        <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", marginBottom: "3rem", opacity: 0.15 }}>
          <AsciiDonut visible={true} />
        </div>

        {/* Fila inferior */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          borderTop: "1px solid rgba(242,237,230,0.07)",
          paddingTop: "1.75rem",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(242,237,230,0.25)", letterSpacing: "0.1em" }}>
            &copy; {new Date().getFullYear()} Yamil Alarcon &mdash; {t.rights}
          </p>
          <nav style={{ display: "flex", gap: "1.5rem" }} aria-label="Social links">
            {[
              { href: "https://github.com/Rasgrove", label: "GitHub" },
              { href: "https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/", label: "LinkedIn" },
              { href: "mailto:elyamilalarcon.111@gmail.com", label: "Email" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(242,237,230,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--lime)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(242,237,230,0.35)")}
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
