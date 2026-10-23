// Absolute origin for canonical, Open Graph and the sitemap. Set
// VITE_SITE_URL once the domain exists (EP-18); until then the local preview
// origin keeps the URLs well formed.
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "http://localhost:4173"
).replace(/\/+$/, "");
