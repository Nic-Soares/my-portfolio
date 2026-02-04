// Type declarations for importing media files
// Allows: import video from './file.mp4';
declare module '*.mp4' {
  const src: string;
  export default src;
}
