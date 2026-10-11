import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TopBar from "@/components/TopBar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "../globals.css";

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-text-loaded",
  display: "swap",
});

type Locale = "es" | "en";

const metaMap: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Yamil Alarcon — Freelancer Web Development Bolivia",
    description:
      "Freelancer Full-Stack en Bolivia. Landings, CRMs y web apps para tu negocio. Contacta ahora.",
  },
  en: {
    title: "Yamil Alarcon — Freelancer Web Development Bolivia",
    description:
      "Full-Stack Freelancer in Bolivia. Landings, CRMs and web apps for your business. Fluent English.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (routing.locales.includes(locale as Locale) ? locale : "es") as Locale;
  const m = metaMap[l];
  const base = "https://yamilalarconportfolio.netlify.app";

  return {
    title: m.title,
    description: m.description,
    icons: { icon: "/favicon.ico" },
    alternates: {
      canonical: `${base}/${l}`,
      languages: { es: `${base}/es`, en: `${base}/en` },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${base}/${l}`,
      siteName: "Yamil Alarcon Portfolio",
      locale: l === "es" ? "es_BO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yamil Alarcon",
  jobTitle: "Full-Stack Developer & Systems Engineer",
  sameAs: [
    "https://github.com/Rasgrove",
    "https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/",
  ],
  knowsLanguage: ["es", "en"],
  address: { "@type": "PostalAddress", addressCountry: "BO" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${jetBrains.variable} ${jakarta.variable}`}
    >
      <head>
        {/* Unbounded via CDN — Turbopack compat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {locale === "es" ? "Ir al contenido principal" : "Skip to main content"}
        </a>
        <TopBar locale={locale} />
        <SmoothScroll />
        <CustomCursor />
        <main id="main-content">{children}</main>
        <FloatingWhatsApp locale={locale} />
      </body>
    </html>
  );
}
