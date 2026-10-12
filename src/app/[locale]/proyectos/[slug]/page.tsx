import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { projects, testimonial, testimonialEn } from "@/lib/projects";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import CaseStudyContainer from "@/components/CaseStudyContainer";

// Static imports — Turbopack cannot resolve dynamic template literal imports
import esMessages from "../../../../../messages/es.json";
import enMessages from "../../../../../messages/en.json";

interface Params {
  locale: string;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

type Messages = typeof esMessages;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const msgs: Messages = locale === "en" ? enMessages : esMessages;

  const proj = projects.find((p) => p.slug === slug);
  if (!proj) return {};

  const item = msgs.projects.items[slug as keyof typeof msgs.projects.items];
  if (!item) return {};

  const rawTitle = `${item.title} — Yamil Alarcon`;
  const title = rawTitle.slice(0, 60);
  const description = item.shortDesc.slice(0, 155);
  const url = `https://yamilalarconportfolio.netlify.app/${locale}/proyectos/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `https://yamilalarconportfolio.netlify.app/es/proyectos/${slug}`,
        en: `https://yamilalarconportfolio.netlify.app/en/proyectos/${slug}`,
      },
    },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const msgs: Messages = locale === "en" ? enMessages : esMessages;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const item = msgs.projects.items[slug as keyof typeof msgs.projects.items];
  if (!item) notFound();

  const cs = msgs.caseStudy;
  const testi = locale === "es" ? testimonial : testimonialEn;
  const showTestimonial = project.hasTestimonial;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.shortDesc,
    creator: {
      "@type": "Person",
      name: "Yamil Alarcon",
      url: "https://yamilalarconportfolio.netlify.app",
    },
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
  };

  return (
    <CaseStudyContainer locale={locale} slug={slug} backText={cs.back}>
      {/* Encabezado: Categoría */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--lime)",
          display: "block",
          marginBottom: "0.85rem",
          fontWeight: 700,
        }}
      >
        {item.category}
      </span>

      {/* Título Principal */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          marginBottom: "1.5rem",
          color: "var(--fg)",
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </h1>

      {/* Tags de Tecnologías */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1rem", marginBottom: "2.5rem" }}>
        {project.tech.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.3rem 0.75rem",
              borderRadius: "4px",
              background: "rgba(242, 237, 230, 0.04)",
              border: "1px solid rgba(242, 237, 230, 0.12)",
              color: "rgba(242,237,230,0.6)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Showcase Visual: Tamaño equilibrado (720px max), proporción real, cero corte, cero zoom */}
      {project.image && (
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 3.5rem",
            borderRadius: "8px",
            border: "1px solid rgba(242, 237, 230, 0.14)",
            background: "rgba(12, 12, 11, 0.95)",
            boxShadow: "0 14px 36px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
          }}
        >
          {/* Barra de cabecera técnica minimalista */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem 0.85rem",
              borderBottom: "1px solid rgba(242, 237, 230, 0.08)",
              background: "rgba(18, 17, 15, 0.85)",
            }}
          >
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(242,237,230,0.2)" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(242,237,230,0.2)" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(242,237,230,0.2)" }} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                color: "rgba(242,237,230,0.4)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {locale === "es" ? "CAPTURA DE PRODUCCIÓN" : "PRODUCTION SCREENSHOT"}
            </span>
          </div>

          <Image
            src={project.image}
            alt={item.title}
            width={1920}
            height={1080}
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, 720px"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Desglose Editorial del Caso */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Bloque 01: El Problema */}
        <section
          style={{
            borderLeft: "2px solid rgba(242, 237, 230, 0.15)",
            paddingLeft: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(242, 237, 230, 0.45)",
              display: "block",
              marginBottom: "0.6rem",
              fontWeight: 700,
            }}
          >
            01 // {cs.problem}
          </span>
          <p
            style={{
              fontFamily: "var(--font-text)",
              color: "rgba(242, 237, 230, 0.85)",
              lineHeight: 1.75,
              fontSize: "1.02rem",
              margin: 0,
            }}
          >
            {item.problem}
          </p>
        </section>

        {/* Bloque 02: La Solución */}
        <section
          style={{
            borderLeft: "2px solid var(--lime)",
            paddingLeft: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--lime)",
              display: "block",
              marginBottom: "0.6rem",
              fontWeight: 700,
            }}
          >
            02 // {cs.solution}
          </span>
          <p
            style={{
              fontFamily: "var(--font-text)",
              color: "rgba(242, 237, 230, 0.85)",
              lineHeight: 1.75,
              fontSize: "1.02rem",
              margin: 0,
            }}
          >
            {item.solution}
          </p>
        </section>

        {/* Bloque 03: El Resultado */}
        <section
          style={{
            borderLeft: "2px solid rgba(242, 237, 230, 0.35)",
            paddingLeft: "1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(242, 237, 230, 0.7)",
              display: "block",
              marginBottom: "0.6rem",
              fontWeight: 700,
            }}
          >
            03 // {cs.result}
          </span>
          <p
            style={{
              fontFamily: "var(--font-text)",
              color: "rgba(242, 237, 230, 0.85)",
              lineHeight: 1.75,
              fontSize: "1.02rem",
              margin: 0,
            }}
          >
            {item.result}
          </p>
        </section>

        {/* Métrica / Logro clave resaltado */}
        {item.metric && (
          <div
            style={{
              background: "rgba(214, 244, 73, 0.05)",
              border: "1px solid rgba(214, 244, 73, 0.25)",
              borderRadius: "8px",
              padding: "1.25rem 1.75rem",
              marginTop: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--lime)",
                display: "block",
                marginBottom: "0.35rem",
                fontWeight: 700,
              }}
            >
              {locale === "es" ? "IMPACTO VERIFICABLE" : "KEY IMPACT"}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.95rem",
                color: "var(--fg)",
                letterSpacing: "0.04em",
                fontWeight: 700,
              }}
            >
              ▶ {item.metric}
            </span>
          </div>
        )}
      </div>

      {/* Testimonio si existe */}
      {showTestimonial && (
        <div style={{ marginTop: "3.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--lime)",
              display: "block",
              marginBottom: "1rem",
              fontWeight: 700,
            }}
          >
            {cs.testimonial}
          </span>
          <blockquote
            style={{
              background: "rgba(18, 17, 15, 0.6)",
              border: "1px solid rgba(242, 237, 230, 0.1)",
              borderLeft: "3px solid var(--lime)",
              borderRadius: "8px",
              padding: "1.75rem",
              position: "relative",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-text)",
                color: "rgba(242, 237, 230, 0.8)",
                lineHeight: 1.7,
                fontStyle: "italic",
                marginBottom: "1.25rem",
                fontSize: "0.98rem",
              }}
            >
              &ldquo;{testi.quote}&rdquo;
            </p>
            <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    color: "var(--fg)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {testi.name}
                </p>
                <p
                  style={{
                    color: "rgba(242, 237, 230, 0.45)",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    margin: 0,
                  }}
                >
                  {testi.role}
                </p>
              </div>
              <a
                href={testi.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--lime)", textDecoration: "none" }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </footer>
          </blockquote>
        </div>
      )}

      {/* Enlaces de Acción */}
      <div style={{ marginTop: "3.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-fill"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.75rem 1.4rem",
              fontSize: "0.8rem",
            }}
          >
            <span>{cs.liveLink}</span>
            <span>↗</span>
          </a>
        )}
        {project.githubUrl && (
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
              padding: "0.75rem 1.4rem",
              fontSize: "0.8rem",
            }}
          >
            <span>{cs.githubLink}</span>
            <span>↗</span>
          </a>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </CaseStudyContainer>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
