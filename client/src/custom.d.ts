// Type declarations for importing media files
// Allows: import video from './file.mp4';
declare module "*.mp4" {
  const src: string;
  export default src;
}

// Vite's compile-time env flags (statically replaced at build time)
interface ImportMeta {
  readonly env: {
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
    // Site origin for canonical, Open Graph and the sitemap (see app/seo)
    readonly VITE_SITE_URL?: string;
  };
}
