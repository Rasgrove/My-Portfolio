import { testimonial, testimonialEn } from "@/lib/projects";
import Image from "next/image";

export default function AboutSection({ locale, msgs }: { locale: string; msgs: any }) {
  const t = msgs.about;
  const testi = locale === "es" ? testimonial : testimonialEn;

  return (
    <section
      id="sobre-mi"
      className="grain grain-paper"
      style={{ position: "relative", overflow: "hidden", background: "var(--paper)", color: "var(--fg-dark)" }}
    >
      {/* Photo as faded bg element top-right — no frame, editorial */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: "clamp(260px, 38%, 480px)", zIndex: 0, pointerEvents: "none",
      }}>
        <Image
          src="/images/yamil-alarcon.webp"
          alt=""
          fill
          aria-hidden="true"
          sizes="38vw"
          style={{
            objectFit: "cover", objectPosition: "top center",
            opacity: 0.12,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Ghost text */}
      <span className="ghost-text ghost-text-dark" style={{ bottom: "-2rem", right: "-4rem" }}>ABOUT</span>

      <div
        className="section-pad"
        style={{ position: "relative", zIndex: 1, maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}
      >
        <span className="kicker" style={{ color: "var(--ink)" }}>
          {t.sectionTag}
        </span>
        <div style={{ width: "clamp(3rem, 8vw, 7rem)", height: 2, background: "var(--ink)", opacity: 0.3, marginBottom: "1.5rem" }} />



        {/* Heading editorial — asimetrico en dos lineas */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 9vw, 8rem)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: "clamp(4rem, 8vw, 7rem)",
        }}>
          {t.heading}
        </h2>

        {/* Grid asimetrico: texto izq, testimonio der */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          alignItems: "flex-start",
        }}>
          {/* Bio */}
          <div>
            <p style={{ fontFamily: "var(--font-text)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.75, color: "#3a3530", marginBottom: "1.5rem" }}>
              {t.p1}
            </p>
            <p style={{ fontFamily: "var(--font-text)", fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.75, color: "#3a3530", marginBottom: "2.5rem" }}>
              {t.p2}
            </p>

            {/* Credenciales — texto plano con guion */}
            <div style={{ borderTop: "1px solid rgba(12,11,9,0.15)", paddingTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(12,11,9,0.5)", letterSpacing: "0.1em" }}>
                &mdash; {t.credential1}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(12,11,9,0.5)", letterSpacing: "0.1em" }}>
                &mdash; {t.credential2}
              </p>
            </div>

            <a
              href="https://github.com/Rasgrove"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--ink)",
                borderBottom: "1px solid var(--ink)",
                paddingBottom: "2px",
              }}
            >
              {t.githubCta} &rarr;
            </a>
          </div>

          {/* Testimonio */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(12,11,9,0.4)", marginBottom: "1.5rem" }}>
              {t.testimonialLabel}
            </p>
            <blockquote style={{ borderLeft: "2px solid var(--ink)", paddingLeft: "1.5rem" }}>
              <p style={{
                fontFamily: "var(--font-text)",
                fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                lineHeight: 1.7,
                fontStyle: "italic",
                color: "#3a3530",
                marginBottom: "1.75rem",
              }}>
                &ldquo;{testi.quote}&rdquo;
              </p>
              <footer>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)", letterSpacing: "-0.01em" }}>
                  {testi.name}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(12,11,9,0.4)", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
                  {testi.role}
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sobre-mi [style*="grid-template-columns: 3fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
