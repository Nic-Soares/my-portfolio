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
  };
}
