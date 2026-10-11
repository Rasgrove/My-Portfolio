"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface TopBarProps {
  locale: string;
}

export default function TopBar({ locale }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    router.push(pathname.replace(`/${locale}`, `/${next}`));
  };

  const waText = encodeURIComponent(
    locale === "es"
      ? "Hola Yamil, me gustaría hablar sobre un proyecto."
      : "Hi Yamil, I'd like to talk about a project."
  );

  const iconBtnStyle: React.CSSProperties = {
    width: "34px",
    height: "34px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    border: "1px solid rgba(242, 237, 230, 0.14)",
    background: "rgba(255, 255, 255, 0.03)",
    color: "rgba(242, 237, 230, 0.85)",
    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <header className="topbar" role="banner" style={{ color: "#fff" }}>
      {/* Brand logo */}
      <Link
        href={`/${locale}`}
        aria-label="Yamil Alarcon — Home"
        style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
      >
        <Image
          src="/images/ya-logo.webp"
          alt="Y.A."
          width={88}
          height={32}
          style={{ height: 32, width: "auto", objectFit: "contain" }}
          priority
        />
      </Link>

      {/* Social & Contact Icon Cluster — Editorial Luxury */}
      <nav style={{ display: "flex", alignItems: "center", gap: "0.45rem" }} aria-label="Social and language">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/59177258517?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp (+591 77258517)"
          aria-label="WhatsApp (+591 77258517)"
          style={iconBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#25D366";
            e.currentTarget.style.color = "#25D366";
            e.currentTarget.style.background = "rgba(37, 211, 102, 0.12)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242, 237, 230, 0.14)";
            e.currentTarget.style.color = "rgba(242, 237, 230, 0.85)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:elyamilalarcon.111@gmail.com"
          title="Email (elyamilalarcon.111@gmail.com)"
          aria-label="Email (elyamilalarcon.111@gmail.com)"
          style={iconBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#EA4335";
            e.currentTarget.style.color = "#EA4335";
            e.currentTarget.style.background = "rgba(234, 67, 53, 0.12)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242, 237, 230, 0.14)";
            e.currentTarget.style.color = "rgba(242, 237, 230, 0.85)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
          style={iconBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#0A66C2";
            e.currentTarget.style.color = "#38bdf8";
            e.currentTarget.style.background = "rgba(10, 102, 194, 0.12)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242, 237, 230, 0.14)";
            e.currentTarget.style.color = "rgba(242, 237, 230, 0.85)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74v-8.37H5.06v8.37h2.8z" />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Rasgrove"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          aria-label="GitHub Profile"
          style={iconBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--lime)";
            e.currentTarget.style.color = "var(--lime)";
            e.currentTarget.style.background = "rgba(214, 244, 73, 0.1)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242, 237, 230, 0.14)";
            e.currentTarget.style.color = "rgba(242, 237, 230, 0.85)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        </a>

        {/* Minimal Divider */}
        <span
          style={{
            display: "inline-block",
            width: "1px",
            height: "18px",
            background: "rgba(242, 237, 230, 0.16)",
            margin: "0 0.15rem",
          }}
          aria-hidden="true"
        />

        {/* Locale toggle */}
        <button
          onClick={toggleLocale}
          aria-label={`Switch to ${locale === "es" ? "English" : "Español"}`}
          style={{
            height: "34px",
            padding: "0 0.65rem",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(242, 237, 230, 0.18)",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--lime)",
            fontWeight: 700,
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--lime)";
            e.currentTarget.style.background = "rgba(214, 244, 73, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(242, 237, 230, 0.18)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
          }}
        >
          {locale === "es" ? "EN" : "ES"}
        </button>
      </nav>
    </header>
  );
}
