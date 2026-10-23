import type { AboutData } from "./about.types.ts";

// Spanish translation of about.data.ts
export const aboutDataEs: AboutData = {
  name: "Nicolas Soares",
  eyebrow: "¡Hola, hola! Soy",
  role: "Analista de Datos e Ingeniero de IA Aplicada",
  location: "Belo Horizonte, Brasil",
  bio: "Convierto datos desordenados en respuestas claras y grandes ideas en sistemas que no se caen. Amable con los stakeholders, estricto con los esquemas — y dibujo diagramas de sistemas por diversión.",
  quickFacts: [
    "Belo Horizonte, Brasil",
    "Analista de Datos e Ingeniero de IA Aplicada",
    "Disponible para proyectos remotos",
  ],
  experience: [
    {
      role: "Analista de Datos",
      company: "Verde Analytics",
      summary:
        "Dashboards y modelos de pronóstico que guían decisiones en 12 equipos de producto.",
      period: "2024—actualidad",
    },
    {
      role: "Arquitecto de Software",
      company: "Horizonte Tech",
      summary:
        "Columna vertebral orientada a eventos que redujo a la mitad el tiempo de integración.",
      period: "2022—24",
    },
  ],
  stack: [
    {
      area: "Datos y Analítica",
      skills: ["SQL", "Python", "dbt", "Power BI", "PostgreSQL"],
    },
    { area: "Nube e Infraestructura", skills: ["AWS", "Docker", "Airflow"] },
  ],
  education: [
    {
      title: "Especialización en Arquitectura de Software",
      school: "PUC Minas",
      period: "2025—actualidad",
    },
    {
      title: "MBA en Ciencia de Datos y Analítica",
      school: "USP/Esalq",
      period: "2023—24",
    },
    {
      title: "Licenciatura en Ciencias de la Computación",
      school: "UFMG",
      period: "2018—22",
    },
  ],
  certifications: [
    "PL-300 · Power BI Data Analyst",
    "AWS Cloud Practitioner",
    "dbt Fundamentals",
    "Google Data Analytics",
  ],
  languages: ["Portugués — nativo", "Inglés — profesional"],
  contact: {
    email: "nicolas.soares@email.com",
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Instagram", href: "#" },
    ],
    cvHref: "#",
  },
  pending: [
    "experience (companies and results)",
    "education (schools and years)",
    "certifications",
    "contact.email",
    "contact.social links",
    "contact.cvHref",
  ],
};
