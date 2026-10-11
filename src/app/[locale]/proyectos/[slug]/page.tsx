import { notFound } from "next/navigation";
import NextLink from "next/link";
import { projects, testimonial, testimonialEn } from "@/lib/projects";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

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

  const backHref = `/${locale}`;

  return (
    <div style={{ paddingTop: "56px", minHeight: "100vh", background: "var(--bg-dark)" }}>
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "4rem 2rem 7rem" }}>
        {/* Back link */}
        <NextLink
          href={backHref}
          style={{
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono), monospace",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "3rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          ← {cs.back}
        </NextLink>

        {/* Category */}
        <p className="hud-label" style={{ marginBottom: "0.75rem" }}>{item.category}</p>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            marginBottom: "2rem",
            color: "var(--text-primary)",
          }}
        >
          {item.title}
        </h1>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "3.5rem" }}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              style={{
                background: "rgba(0,229,195,0.06)",
                border: "1px solid var(--border-accent)",
                color: "var(--accent)",
                padding: "0.25rem 0.75rem",
                borderRadius: "50px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono), monospace",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Case study body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <CaseSection label={cs.problem} content={item.problem} />
          <CaseSection label={cs.solution} content={item.solution} />
          <CaseSection label={cs.result} content={item.result} accent />

          {/* Metric */}
          <div
            style={{
              background: "rgba(0,229,195,0.05)",
              border: "1.5px solid var(--border-accent)",
              borderRadius: "12px",
              padding: "1.25rem 1.75rem",
            }}
          >
            <span
              style={{
                color: "var(--accent2)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              ▶ {item.metric}
            </span>
          </div>
        </div>

        {/* Testimonial */}
        {showTestimonial && (
          <div style={{ marginTop: "4rem" }}>
            <p className="hud-label" style={{ marginBottom: "1rem" }}>{cs.testimonial}</p>
            <blockquote
              style={{
                background: "var(--bg-card)",
                border: "1.5px solid var(--border-subtle)",
                borderLeft: "3px solid var(--accent)",
                borderRadius: "16px",
                padding: "2rem",
                position: "relative",
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", top: "1rem", right: "1.5rem", fontSize: "3rem", lineHeight: 1, color: "rgba(0,229,195,0.08)", fontFamily: "Georgia, serif" }}>❝</span>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1.5rem" }}>
                &ldquo;{testi.quote}&rdquo;
              </p>
              <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>{testi.name}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-mono), monospace" }}>{testi.role}</p>
                </div>
                <a href={testi.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#0a66c2" }} aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              </footer>
            </blockquote>
          </div>
        )}

        {/* Project links */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {cs.liveLink} ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {cs.githubLink}
            </a>
          )}
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

function CaseSection({ label, content, accent = false }: { label: string; content: string; accent?: boolean }) {
  return (
    <div>
      <p className="hud-label" style={{ marginBottom: "0.65rem", color: accent ? "var(--accent2)" : "var(--accent)" }}>
        {label}
      </p>
      <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.97rem" }}>
        {content}
      </p>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
