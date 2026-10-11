// Static imports — Turbopack cannot resolve dynamic template literal imports
import esMessages from "../../../messages/es.json";
import enMessages from "../../../messages/en.json";

import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import WorkflowSection from "@/components/WorkflowSection";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const msgs = locale === "en" ? enMessages : esMessages;

  return (
    <>
      <Hero locale={locale} />
      <ProjectsSection locale={locale} msgs={msgs as any} />
      <WorkflowSection locale={locale} />
      <AboutSection locale={locale} msgs={msgs as any} />
      <StackSection locale={locale} msgs={msgs as any} />
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
