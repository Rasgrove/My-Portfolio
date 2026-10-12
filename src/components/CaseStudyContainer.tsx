"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

interface CaseStudyContainerProps {
  locale: string;
  slug: string;
  backText: string;
  children: React.ReactNode;
}

export default function CaseStudyContainer({
  locale,
  slug,
  backText,
  children,
}: CaseStudyContainerProps) {
  const router = useRouter();
  const targetAnchor = slug ? `proyecto-${slug}` : "proyectos";

  const handleClose = () => {
    router.push(`/${locale}#${targetAnchor}`);
  };

  // Escuchar tecla Escape para salir rápidamente
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [locale, targetAnchor]);

  // Manejar clic fuera del contenido (en el backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const cleanBackText = backText.replace(/^[←\s]+/, "");

  return (
    <div
      onClick={handleBackdropClick}
      className="grain"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "72px",
        background: "var(--ink-2)",
        cursor: "default",
      }}
    >
      {/* Botón flotante de cierre rápido (anclado abajo al centro, accesible con 1 solo toque en cualquier momento) */}
      <button
        onClick={handleClose}
        aria-label={locale === "es" ? "Cerrar y volver a proyectos" : "Close and back to projects"}
        className="case-study-floating-pill"
        style={{
          position: "fixed",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "rgba(18, 17, 15, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(214, 244, 73, 0.5)",
          color: "var(--lime)",
          borderRadius: "9999px",
          padding: "0.65rem 1.4rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(214, 244, 73, 0.12)",
          transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(-50%) scale(1.05)";
          e.currentTarget.style.background = "var(--lime)";
          e.currentTarget.style.color = "var(--ink)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(-50%) scale(1)";
          e.currentTarget.style.background = "rgba(18, 17, 15, 0.92)";
          e.currentTarget.style.color = "var(--lime)";
        }}
      >
        <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>✕</span>
        <span>{locale === "es" ? "Cerrar / Volver al proyecto" : "Close / Back to project"}</span>
      </button>

      {/* Artículo principal */}
      <article
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 2.5rem) 7rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Botón Volver a proyectos resaltado */}
        <div style={{ marginBottom: "2.5rem" }}>
          <NextLink
            href={`/${locale}#${targetAnchor}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(214, 244, 73, 0.08)",
              border: "1.5px solid var(--lime)",
              color: "var(--lime)",
              padding: "0.55rem 1.35rem",
              borderRadius: "9999px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(214, 244, 73, 0.15)",
              transition: "transform 0.2s, background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-4px)";
              e.currentTarget.style.background = "var(--lime)";
              e.currentTarget.style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.background = "rgba(214, 244, 73, 0.08)";
              e.currentTarget.style.color = "var(--lime)";
            }}
          >
            <span style={{ fontSize: "0.95rem" }}>←</span>
            <span>{cleanBackText}</span>
          </NextLink>
        </div>

        {children}
      </article>

      <style jsx>{`
        @media (max-width: 640px) {
          .case-study-floating-pill {
            bottom: 1.25rem !important;
            padding: 0.55rem 1.15rem !important;
            font-size: 0.68rem !important;
          }
        }
      `}</style>
    </div>
  );
}
