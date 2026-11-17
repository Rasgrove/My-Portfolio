import { testimonial, testimonialEn } from "@/lib/projects";

export default function AboutSection({ locale, msgs }: { locale: string; msgs: any }) {
  const t = msgs.about;
  const testi = locale === "es" ? testimonial : testimonialEn;

  return (
    <section
      id="sobre-mi"
      className="grain grain-paper"
      style={{ position: "relative", overflow: "hidden", background: "var(--paper)", color: "var(--fg-dark)" }}
    >
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



        {/* Heading editorial — asimetrico en dos lineas, contenido en movil para palabras largas como BUSINESSES / TECNOLOGIA */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(1.85rem, 8.2vw, 8rem)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: "clamp(4rem, 8vw, 7rem)",
          wordBreak: "break-word",
        }}>
          {t.heading}
        </h2>

        {/* Grid asimetrico: texto izq, testimonio der — responsive con about-grid */}
        <div className="about-grid">
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

            {/* CTA row — GitHub + CV Download */}
            <div className="about-cta-row">
              <a
                href="https://github.com/Rasgrove"
                target="_blank"
                rel="noopener noreferrer"
                className="about-github-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                {t.githubCta} &rarr;
              </a>

              {/* CV Download */}
              <div className="about-cv-wrap">
                <a
                  href={locale === "es" ? "/cv-yamil-alarcon.pdf" : "/cv-yamil-alarcon-english.pdf"}
                  download
                  className="about-cv-btn"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {locale === "es" ? "Descargar CV" : "Download CV"}
                </a>
                <span className="about-cv-hint">
                  {locale === "es" ? "Curriculum Vitae · PDF" : "Curriculum Vitae · PDF"}
                </span>
              </div>
            </div>
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
        .about-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: clamp(3rem, 8vw, 8rem);
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 480px) {
          #sobre-mi h2, #about h2 {
            font-size: clamp(1.75rem, 8vw, 2.5rem) !important;
          }
        }
        /* CTA row */
        .about-cta-row {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-top: 2.5rem;
          align-items: flex-start;
        }

        /* GitHub link */
        .about-github-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ink);
          border: 1px solid rgba(12,11,9,0.4);
          padding: 0.55rem 1rem;
          border-radius: 3px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .about-github-btn:hover {
          background: rgba(12,11,9,0.07);
          border-color: var(--ink);
        }

        /* CV wrap + hint */
        .about-cv-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .about-cv-hint {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(12,11,9,0.38);
          text-transform: uppercase;
          padding-left: 0.1rem;
        }

        /* CV button */
        .about-cv-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ink);
          background: rgba(12,11,9,0.05);
          border: 1px solid rgba(12,11,9,0.55);
          padding: 0.55rem 1rem;
          border-radius: 3px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .about-cv-btn:hover {
          background: rgba(12,11,9,0.11);
          border-color: var(--ink);
        }
      `}</style>
    </section>
  );
}
