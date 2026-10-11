"use client";

import NextLink from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsSection({ locale, msgs }: { locale: string; msgs: any }) {
  const t = msgs.projects;

  return (
    <section id="proyectos" style={{ position: "relative", background: "var(--ink-2)", paddingBottom: "clamp(5rem, 12vw, 10rem)", overflow: "hidden" }} className="grain">

      {/* Dot grid sutil */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(242,237,230,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Imagen de fondo tenue */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('/images/fondo-principal.webp')",
        backgroundSize: "cover", backgroundPosition: "center right",
        opacity: 0.05, mixBlendMode: "luminosity", pointerEvents: "none",
      }} />

      {/* Ghost text WORK */}
      <span className="ghost-text" style={{ top: "-2rem", right: "-4rem" }}>WORK</span>

      <div style={{ padding: "clamp(5rem, 10vw, 9rem) var(--gutter) 0" }}>
        <span className="kicker">
          {t.sectionTag ?? (locale === "es" ? "Casos de estudio" : "Case studies")}
        </span>
      </div>

      {/* Lista editorial: sin grilla, ritmos distintos */}
      <ol style={{ listStyle: "none" }} aria-label={locale === "es" ? "Proyectos" : "Projects"}>
        {projects.map((project, i) => {
          const item = t.items[project.slug];
          if (!item) return null;

          const isFeatured = i === 0;

          return (
            <li
              key={project.slug}
              style={{
                borderTop: "1px solid rgba(242,237,230,0.1)",
                padding: isFeatured
                  ? "clamp(3rem, 6vw, 5.5rem) var(--gutter)"
                  : "clamp(2rem, 4vw, 3.5rem) var(--gutter)",
              }}
            >
              <NextLink
                href={`/${locale}/proyectos/${project.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <article style={{
                  display: "grid",
                  gridTemplateColumns: isFeatured ? "1fr" : "auto 1fr auto",
                  gap: isFeatured ? "1.5rem" : "clamp(1rem, 4vw, 4rem)",
                  alignItems: isFeatured ? "flex-start" : "center",
                }}>

                  {/* Numero */}
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "rgba(242,237,230,0.3)",
                    letterSpacing: "0.2em",
                    ...(isFeatured ? {} : { minWidth: "3ch", flexShrink: 0 }),
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Contenido principal */}
                  <div>
                    {/* Categoria */}
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--lime)",
                      display: "block",
                      marginBottom: isFeatured ? "0.75rem" : "0.35rem",
                    }}>
                      {item.category}
                    </span>

                    {/* Titulo — tamanio dramaticamente diferente segun posicion */}
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: isFeatured
                          ? "clamp(2.5rem, 7vw, 7rem)"
                          : "clamp(1.4rem, 2.8vw, 2.5rem)",
                        letterSpacing: isFeatured ? "-0.04em" : "-0.025em",
                        textTransform: "uppercase",
                        lineHeight: 0.95,
                        color: "var(--fg)",
                        transition: "color 0.2s",
                      }}
                      className="project-title"
                    >
                      {item.title}
                    </h2>

                    {/* Descripcion corta — solo en featured y en los siguientes con texto */}
                    <p style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "0.92rem",
                      color: "rgba(242,237,230,0.45)",
                      lineHeight: 1.65,
                      marginTop: isFeatured ? "1.25rem" : "0.5rem",
                      maxWidth: isFeatured ? "52ch" : "none",
                    }}>
                      {item.shortDesc}
                    </p>

                    {/* Tech tags — texto plano, no pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", marginTop: isFeatured ? "2rem" : "0.75rem" }}>
                      {project.tech.map(tech => (
                        <span key={tech} style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "rgba(242,237,230,0.25)",
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA — solo en filas no-featured */}
                  {!isFeatured && (
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(242,237,230,0.35)",
                      whiteSpace: "nowrap",
                    }}>
                      {t.viewCase ?? "Ver"} &rarr;
                    </span>
                  )}

                  {/* CTA grande en featured */}
                  {isFeatured && (
                    <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                      <span className="btn btn-fill" style={{ display: "inline-flex" }}>
                        {t.viewCase ?? "Ver caso"} &rarr;
                      </span>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="btn"
                          style={{ display: "inline-flex" }}
                        >
                          {t.liveSite ?? "Sitio en vivo"} &nearr;
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </NextLink>
            </li>
          );
        })}
      </ol>

      <style>{`
        .project-title { transition: color 0.2s; }
        li:hover .project-title { color: var(--lime) !important; }
        @media (max-width: 640px) {
          ol > li > a > article { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
        }
      `}</style>
    </section>
  );
}
