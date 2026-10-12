"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function ProjectsSection({ locale, msgs }: { locale: string; msgs: any }) {
  const t = msgs.projects;

  // Si se regresa desde un caso de estudio con hash (#proyecto-slug), posicionar con precisión
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant", block: "start" });
        }, 50);
      }
    }
  }, []);

  return (
    <section
      id="proyectos"
      style={{
        position: "relative",
        background: "var(--ink-2)",
        paddingBottom: "clamp(5rem, 12vw, 10rem)",
        overflow: "hidden",
      }}
      className="grain"
    >
      {/* Dot grid sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(242,237,230,0.12) 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* Imagen de fondo tenue */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/images/fondo-principal.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.12,
          mixBlendMode: "luminosity",
          pointerEvents: "none",
        }}
      />

      {/* Ghost text WORK */}
      <span className="ghost-text" style={{ top: "-2rem", right: "-4rem" }}>
        WORK
      </span>

      <div style={{ padding: "clamp(5rem, 10vw, 8rem) var(--gutter) 2rem" }}>
        <span className="kicker">
          {t.sectionTag ?? (locale === "es" ? "TRABAJOS:" : "WORK 02")}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.035em",
            textTransform: "uppercase",
            color: "var(--fg)",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          {t.heading ?? (locale === "es" ? "Casos de Estudio" : "Case Studies")}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "rgba(242,237,230,0.5)",
            letterSpacing: "0.08em",
          }}
        >
          {t.sub}
        </p>
      </div>

      {/* Lista editorial de proyectos */}
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }} aria-label={locale === "es" ? "Proyectos" : "Projects"}>
        {projects.map((project, i) => {
          const item = t.items[project.slug];
          if (!item) return null;

          return (
            <li
              key={project.slug}
              id={`proyecto-${project.slug}`}
              className="project-item"
              style={{
                borderTop: "1px solid rgba(242,237,230,0.12)",
                padding: "clamp(2rem, 3.5vw, 3.25rem) var(--gutter)",
                scrollMarginTop: "90px",
              }}
            >
              <article className="project-card-grid">
                {/* Columna A: Screenshot Showcase — Intermedio exacto en PC, completo en móvil */}
                <div className="project-image-wrapper">
                  <NextLink
                    href={`/${locale}/proyectos/${project.slug}`}
                    aria-label={`${item.title} - ${t.viewCase ?? "Ver caso"}`}
                    style={{ display: "block", width: "100%", textDecoration: "none" }}
                  >
                    <div className="project-image-container">
                      <Image
                        src={project.image}
                        alt={item.title}
                        width={1920}
                        height={1080}
                        sizes="(max-width: 900px) 100vw, 500px"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                        priority={i < 2}
                        quality={90}
                        className="project-screenshot-img"
                      />
                      {/* Badge visual discreto al hover */}
                      <div className="project-image-hover-overlay">
                        <span className="project-image-view-badge">
                          {t.viewCase ?? (locale === "es" ? "Ver caso" : "View case")} &rarr;
                        </span>
                      </div>
                    </div>
                  </NextLink>
                </div>

                {/* Columna B: Información editorial del proyecto */}
                <div className="project-info-wrapper">
                  {/* Fila superior: Número + Categoría */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "rgba(242,237,230,0.4)",
                        letterSpacing: "0.15em",
                        fontWeight: 700,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--lime)",
                        fontWeight: 700,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Título del proyecto */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      letterSpacing: "-0.03em",
                      textTransform: "uppercase",
                      lineHeight: 1.08,
                      marginBottom: "1rem",
                    }}
                  >
                    <NextLink
                      href={`/${locale}/proyectos/${project.slug}`}
                      className="project-title-link"
                      style={{
                        color: "var(--fg)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.title}
                    </NextLink>
                  </h3>

                  {/* Descripción corta */}
                  <p
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "0.94rem",
                      color: "rgba(242,237,230,0.55)",
                      lineHeight: 1.65,
                      marginBottom: "1.5rem",
                      maxWidth: "54ch",
                    }}
                  >
                    {item.shortDesc}
                  </p>

                  {/* Métricas o impacto clave */}
                  {item.metric && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.35rem 0.85rem",
                        background: "rgba(214, 244, 73, 0.06)",
                        border: "1px solid rgba(214, 244, 73, 0.2)",
                        borderRadius: "6px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span style={{ color: "var(--lime)", fontSize: "0.65rem" }}>▶</span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "rgba(242,237,230,0.85)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>
                  )}

                  {/* Tech tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem 1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(242,237,230,0.35)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                    <NextLink
                      href={`/${locale}/proyectos/${project.slug}`}
                      className="btn btn-fill"
                      style={{
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.65rem 1.3rem",
                        fontSize: "0.78rem",
                      }}
                    >
                      <span>{t.viewCase ?? (locale === "es" ? "Ver caso completo" : "View full case")}</span>
                      <span>&rarr;</span>
                    </NextLink>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.65rem 1.2rem",
                          fontSize: "0.78rem",
                        }}
                      >
                        <span>{t.liveSite ?? (locale === "es" ? "Sitio en vivo" : "Live site")}</span>
                        <span>↗</span>
                      </a>
                    )}

                    {project.githubUrl && !project.liveUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.65rem 1.2rem",
                          fontSize: "0.78rem",
                        }}
                      >
                        <span>{t.github ?? "GitHub"}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <style jsx>{`
        .project-card-grid {
          display: grid;
          grid-template-columns: minmax(320px, 500px) 1fr;
          gap: clamp(2.2rem, 4vw, 4.5rem);
          align-items: center;
        }

        .project-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .project-image-container {
          position: relative;
          width: 100%;
          border-radius: 8px;
          border: 1px solid rgba(242, 237, 230, 0.12);
          background: rgba(12, 12, 11, 0.95);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.42);
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        /* ZERO ZOOM: Sin transform scale */
        .project-item:hover .project-image-container {
          border-color: rgba(214, 244, 73, 0.45);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.58), 0 0 20px rgba(214, 244, 73, 0.08);
        }

        .project-item:hover .project-title-link {
          color: var(--lime) !important;
        }

        .project-image-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(12, 12, 11, 0.3);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .project-item:hover .project-image-hover-overlay {
          opacity: 1;
        }

        .project-image-view-badge {
          background: rgba(18, 17, 15, 0.92);
          border: 1px solid var(--lime);
          color: var(--lime);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 900px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .project-image-wrapper {
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
