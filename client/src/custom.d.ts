// Type declarations for importing media files
// Allows: import video from './file.mp4';
declare module "*.mp4" {
  const src: string;
  export default src;
}

// Project env vars on top of Vite's (DEV, PROD, MODE come from vite/client)
interface ImportMetaEnv {
  // Site origin for canonical, Open Graph and the sitemap (see app/seo)
  readonly VITE_SITE_URL?: string;
}
