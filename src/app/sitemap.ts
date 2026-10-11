import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const baseUrl = "https://yamilalarconportfolio.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["es", "en"];
  const now = new Date();

  const homeRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1.0,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  }));

  const projectRoutes = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${baseUrl}/${locale}/proyectos/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }))
  );

  return [...homeRoutes, ...projectRoutes];
}
