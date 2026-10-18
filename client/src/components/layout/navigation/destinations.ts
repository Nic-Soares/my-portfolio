// Top-level destinations, shared by every navigation pattern (rail, bar).
export interface Destination {
  label: string;
  icon: string; // Material Symbols name
  path: string;
}

export const DESTINATIONS: Destination[] = [
  { label: "Home", icon: "home", path: "/" },
  // The About Me page is EP-07; until then /about shows Under Construction.
  { label: "About Me", icon: "person", path: "/about" },
  { label: "Projects", icon: "folder", path: "/projects" },
];
