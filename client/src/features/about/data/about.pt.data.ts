import type { AboutData } from "./about.types.ts";

// pt-BR translation of about.data.ts. Companies, schools, email, social
// links and the CV are placeholders (listed in `pending`).
export const aboutDataPt: AboutData = {
  name: "Nicolas Soares",
  eyebrow: "Olá, olá! Eu sou",
  role: "Analista de Dados & Arquiteto de Software",
  location: "Belo Horizonte, Brasil",
  bio: "Transformo dados bagunçados em respostas claras e grandes ideias em sistemas que não desmoronam. Amigável com stakeholders, rigoroso com schemas — e desenho diagramas de sistemas por diversão.",
  quickFacts: [
    "Belo Horizonte, Brasil",
    "Analista de Dados & Arquiteto de Software",
    "Disponível para projetos remotos",
  ],
  experience: [
    {
      role: "Analista de Dados",
      company: "Verde Analytics",
      summary:
        "Dashboards e modelos de previsão que orientam decisões em 12 times de produto.",
      period: "2024—atual",
    },
    {
      role: "Arquiteto de Software",
      company: "Horizonte Tech",
      summary:
        "Backbone orientado a eventos que reduziu pela metade o tempo de integração.",
      period: "2022—24",
    },
  ],
  stack: [
    {
      area: "Dados & Analytics",
      skills: ["SQL", "Python", "dbt", "Power BI", "PostgreSQL"],
    },
    { area: "Cloud & Infraestrutura", skills: ["AWS", "Docker", "Airflow"] },
  ],
  education: [
    {
      title: "Especialização em Arquitetura de Software",
      school: "PUC Minas",
      period: "2025—atual",
    },
    {
      title: "MBA em Data Science & Analytics",
      school: "USP/Esalq",
      period: "2023—24",
    },
    {
      title: "Bacharelado em Ciência da Computação",
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
  languages: ["Português — nativo", "Inglês — profissional"],
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
