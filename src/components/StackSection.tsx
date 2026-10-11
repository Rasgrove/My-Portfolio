"use client";

const stackRows = [
  { label: "Next.js / React",   note: "Front-end & SSR" },
  { label: "TypeScript",        note: "Siempre tipado" },
  { label: "Tailwind CSS",      note: "Utility-first" },
  { label: "Node / Express",    note: "Back-end" },
  { label: "Supabase / SQL",    note: "Datos" },
  { label: "SEO Tecnico",       note: "Core Web Vitals" },
];

const stackRowsEn = [
  { label: "Next.js / React",   note: "Front-end & SSR" },
  { label: "TypeScript",        note: "Always typed" },
  { label: "Tailwind CSS",      note: "Utility-first" },
  { label: "Node / Express",    note: "Back-end" },
  { label: "Supabase / SQL",    note: "Data" },
  { label: "Technical SEO",     note: "Core Web Vitals" },
];

export default function StackSection({ locale, msgs }: { locale: string; msgs: any }) {
  const t = msgs.stack;
  const rows = locale === "es" ? stackRows : stackRowsEn;

  return (
    <section id="stack" className="grain" style={{ position: "relative", overflow: "hidden", background: "var(--ink-2)" }}>

      {/* Dot grid sutil — mas visible */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(242,237,230,0.12) 1.2px, transparent 1.2px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Imagen de fondo sutil */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "url('/images/fondo-principal.webp')",
        backgroundSize: "cover", backgroundPosition: "center left",
        opacity: 0.10, mixBlendMode: "luminosity",
      }} />

      {/* Ghost text STACK al fondo */}
      <span className="ghost-text" style={{ top: "-1rem", left: "-3rem" }}>STACK</span>

      <div className="section-pad" style={{ position: "relative", zIndex: 1, maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}>
        <span className="kicker">{t.sectionTag}</span>
        <div style={{ width: "clamp(3rem, 8vw, 7rem)", height: 2, background: "var(--lime)", marginBottom: "1.5rem" }} />

        {/* Heading + lista — layout asimetrico */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "clamp(3rem, 8vw, 8rem)",
          alignItems: "flex-start",
        }}>
          {/* Heading izquierdo — grande y sticky-ish */}
          <div style={{ position: "sticky", top: "80px" }}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              letterSpacing: "-0.045em",
              textTransform: "uppercase",
              lineHeight: 0.9,
              color: "var(--fg)",
              marginBottom: "2rem",
            }}>
              {t.heading}
            </h2>
            <p style={{ fontFamily: "var(--font-text)", fontSize: "0.9rem", color: "var(--fg-dim)", lineHeight: 1.7, maxWidth: "28ch" }}>
              {t.subheading ?? (
                locale === "es"
                  ? "Herramientas que domino. Profundidad sobre amplitud."
                  : "Tools I master. Depth over breadth."
              )}
            </p>
          </div>

          {/* Lista de tecnologias — filas con separador */}
          <div>
            {rows.map(({ label, note }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "clamp(0.9rem, 2vw, 1.4rem) 0",
                  borderTop: i === 0 ? "1px solid rgba(242,237,230,0.1)" : "none",
                  borderBottom: "1px solid rgba(242,237,230,0.1)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(214,244,73,0.04)";
                  const title = (e.currentTarget as HTMLElement).querySelector(".stack-label") as HTMLElement;
                  if (title) title.style.color = "var(--lime)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  const title = (e.currentTarget as HTMLElement).querySelector(".stack-label") as HTMLElement;
                  if (title) title.style.color = "var(--fg)";
                }}
              >
                <span
                  className="stack-label"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1rem, 2.4vw, 2rem)",
                    letterSpacing: "-0.025em",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(242,237,230,0.25)",
                }}>
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #stack [style*="grid-template-columns: 2fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
