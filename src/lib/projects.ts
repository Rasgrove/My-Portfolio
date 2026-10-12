export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  linkedin: string;
}

export interface Project {
  slug: string;
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  hasTestimonial?: boolean;
}

export const projects: Project[] = [
  {
    slug: "sistema-orientacion-ureal",
    image: "/images/projects/sistema-orientacion-ureal.png",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5", "CSS3"],
    githubUrl:
      "https://github.com/Rasgrove/Vocational-Orientation-and-Test-System-for-UREAL---Bolivia-",
    hasTestimonial: true,
  },
  {
    slug: "instrum-la-paz",
    image: "/images/projects/instrum-la-paz.png",
    tech: ["React", "Framer Motion", "Decap CMS", "Vite", "CSS"],
    liveUrl: "https://instrumlapaz.netlify.app/",
  },
  {
    slug: "valdivia-asociados",
    image: "/images/projects/valdivia-asociados.png",
    tech: ["React", "Vite", "CSS", "SEO Técnico", "Decap CMS"],
    liveUrl: "https://valdivia-asociados.netlify.app/",
  },
  {
    slug: "sistema-panaderia",
    image: "/images/projects/sistema-panaderia.png",
    tech: ["React", "Supabase", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "portfolio-anterior",
    image: "/images/projects/portfolio-anterior.png",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
    liveUrl: "https://yamilalarconportfolio.netlify.app/",
    githubUrl: "https://github.com/Rasgrove",
  },
  {
    slug: "crm-freelance",
    image: "/images/projects/crm-freelance.png",
    tech: ["React", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://freelancecrm-ya.netlify.app/",
  },
];

export const testimonial: Testimonial = {
  quote:
    "El sistema desarrollado por Yamil cumplió con nuestras expectativas técnicas. Logramos reemplazar un proceso completamente manual por una plataforma funcional, estable y fácil de administrar.",
  name: "Ing. Franco Céspedes",
  role: "Jefe de TIC's — Universidad Real · Cámara Nacional de Comercio",
  linkedin: "https://www.linkedin.com/in/franco-cespedes-19062ba9/",
};

export const testimonialEn: Testimonial = {
  quote:
    "The system developed by Yamil accomplished our technical expectations. We successfully replaced a fully manual process with a functional, stable, and easy-to-manage platform.",
  name: "Eng. Franco Céspedes",
  role: "Head of IT — Universidad Real · National Chamber of Commerce",
  linkedin: "https://www.linkedin.com/in/franco-cespedes-19062ba9/",
};
