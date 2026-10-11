"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface TopBarProps { locale: string; }

export default function TopBar({ locale }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    router.push(pathname.replace(`/${locale}`, `/${next}`));
  };

  const waText = encodeURIComponent(
    locale === "es"
      ? "Hola Yamil, me gustaria hablar sobre un proyecto."
      : "Hi Yamil, I'd like to talk about a project."
  );

  return (
    <header
      className="topbar"
      role="banner"
      style={{ color: "#fff" }}
    >
      {/* Logo mark — text-based, no image needed for blend mode to work */}
      <Link href={`/${locale}`} aria-label="Yamil Alarcon — Home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Image
          src="/images/ya-logo.webp"
          alt="Y.A."
          width={88}
          height={32}
          style={{ height: 32, width: "auto", objectFit: "contain" }}
          priority
        />
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <a
          href={`https://wa.me/59177258517?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
        >
          WhatsApp
        </a>
        <a
          href="https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Rasgrove"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
        >
          GitHub
        </a>
        <button
          onClick={toggleLocale}
          aria-label={`Switch to ${locale === "es" ? "English" : "Espanol"}`}
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "inherit" }}
        >
          {locale === "es" ? "EN" : "ES"}
        </button>
      </nav>
    </header>
  );
}
