// Footer content (Figma "Footer" / "Footer Link Column"). Internal links use
// the router; "#" marks a link whose real URL is still pending.
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerTagline =
  "Full-stack developer building real products end-to-end — from interface to database.";

export const footerOwner = "Nicolas Soares";
export const footerRole = "Fullstack Developer";

export const footerColumns: FooterColumn[] = [
  {
    title: "Social",
    links: [
      { label: "GitHub", href: "#", external: true },
      { label: "LinkedIn", href: "#", external: true },
      { label: "Telegram", href: "#", external: true },
      { label: "Email", href: "#", external: true },
    ],
  },
  {
    title: "Navigation",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/projects" },
      { label: "Contact", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Résumé", href: "#", external: true },
      { label: "Spotify Web", href: "/projects/spotify-clone" },
    ],
  },
];
