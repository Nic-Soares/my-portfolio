// Content of the About Me page (Figma "About Me"). Anything still marked
// `pending` is Figma placeholder text and must be replaced before publishing.

export interface Experience {
  role: string;
  company: string;
  summary: string;
  period: string; // e.g. "2024—now"
}

export interface StackGroup {
  area: string;
  skills: string[];
}

export interface Degree {
  title: string;
  school: string;
  period: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface AboutData {
  name: string;
  eyebrow: string;
  role: string;
  location: string;
  bio: string;
  quickFacts: string[];
  experience: Experience[];
  stack: StackGroup[];
  education: Degree[];
  certifications: string[];
  languages: string[];
  contact: {
    email: string;
    social: SocialLink[];
    cvHref: string;
  };
  // Fields still holding Figma placeholder content
  pending: string[];
}
