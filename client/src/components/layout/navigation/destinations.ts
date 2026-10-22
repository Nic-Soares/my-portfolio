// Top-level destinations, shared by every navigation pattern (rail, bar).
import type { Messages } from "@/i18n/messages.ts";

export interface Destination {
  label: keyof Messages["layout"]["nav"]; // key in the layout.nav catalog
  icon: string; // Material Symbols name
  path: string;
}

export const DESTINATIONS: Destination[] = [
  { label: "home", icon: "home", path: "/" },
  // The About Me page is EP-07; until then /about shows Under Construction.
  { label: "about", icon: "person", path: "/about" },
  { label: "projects", icon: "folder", path: "/projects" },
];
