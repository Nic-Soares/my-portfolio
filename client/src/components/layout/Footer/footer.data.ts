import type { Messages } from "@/i18n/messages.ts";

// Footer links (Figma "Footer" / "Footer Link Column"). Labels come from the
// layout.footer catalog, except brand and project names, which stay as they
// are. Internal links use the router; "#" marks a URL that is still pending.
type FooterMessages = Messages["layout"]["footer"];

export interface FooterLink {
  // A key in layout.footer.links, or a literal name (brands, projects)
  label: { key: keyof FooterMessages["links"] } | { name: string };
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  title: keyof FooterMessages["columns"];
  links: FooterLink[];
}

export const footerOwner = "Nicolas Soares";

export const footerColumns: FooterColumn[] = [
  {
    title: "social",
    links: [
      { label: { name: "GitHub" }, href: "#", external: true },
      { label: { name: "LinkedIn" }, href: "#", external: true },
      { label: { name: "Telegram" }, href: "#", external: true },
      { label: { key: "email" }, href: "#", external: true },
    ],
  },
  {
    title: "navigation",
    links: [
      { label: { key: "about" }, href: "/about" },
      { label: { key: "work" }, href: "/projects" },
      { label: { key: "contact" }, href: "/about" },
    ],
  },
  {
    title: "resources",
    links: [
      { label: { key: "resume" }, href: "#", external: true },
      { label: { name: "Spotify Web" }, href: "/projects/spotify-clone" },
    ],
  },
];
