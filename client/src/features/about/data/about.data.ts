import type { AboutData } from "./about.types.ts";

// Copied from the Figma About Me frames. Companies, schools, email, social
// links and the CV are placeholders (listed in `pending`) until Nicolas
// sends the real ones.
export const aboutData: AboutData = {
  name: "Nicolas Soares",
  eyebrow: "Hello hello! I’m",
  role: "Data Analyst & Applied AI Engineer",
  location: "Belo Horizonte, Brazil",
  bio: "I turn messy data into clear answers and big ideas into systems that don’t fall over. Friendly with stakeholders, strict with schemas — and I draw system diagrams for fun.",
  quickFacts: [
    "Belo Horizonte, Brazil",
    "Data Analyst & Applied AI Engineer",
    "Available for remote projects",
  ],
  experience: [
    {
      role: "Data Analyst",
      company: "Verde Analytics",
      summary:
        "Dashboards and forecasting models that guide decisions across 12 product teams.",
      period: "2024—now",
    },
    {
      role: "Software Architect",
      company: "Horizonte Tech",
      summary: "Event-driven backbone that cut integration time in half.",
      period: "2022—24",
    },
  ],
  stack: [
    {
      area: "Data & Analytics",
      skills: ["SQL", "Python", "dbt", "Power BI", "PostgreSQL"],
    },
    { area: "Cloud & Infrastructure", skills: ["AWS", "Docker", "Airflow"] },
  ],
  education: [
    {
      title: "Software Architecture Specialization",
      school: "PUC Minas",
      period: "2025—now",
    },
    {
      title: "MBA in Data Science & Analytics",
      school: "USP/Esalq",
      period: "2023—24",
    },
    { title: "B.Sc. Computer Science", school: "UFMG", period: "2018—22" },
  ],
  certifications: [
    "PL-300 · Power BI Data Analyst",
    "AWS Cloud Practitioner",
    "dbt Fundamentals",
    "Google Data Analytics",
  ],
  languages: ["Portuguese — native", "English — professional"],
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
