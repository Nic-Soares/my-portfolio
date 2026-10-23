// Defines every content block type supported by the system.
export type ContentBlock =
  | {
      type: "header";
      level: 1 | 2 | 3;
      text: string;
      id?: string;
      snug?: boolean;
    }
  | { type: "paragraph"; text: string; id?: string; snug?: boolean }
  // Overview intro: the project facts beside this lead paragraph
  | { type: "intro"; text: string; id?: string }
  | {
      type: "image";
      src: string;
      srcSet?: string; // width variants, with sizes
      sizes?: string;
      alt: string;
      id?: string;
      className?: string;
      aspectRatio?: string;
      caption?: string;
      snug?: boolean;
    }
  | {
      type: "code";
      code: string;
      language: string;
      title?: string;
      id?: string;
      snug?: boolean;
    }
  | {
      type: "list";
      items: string[];
      ordered?: boolean;
      id?: string;
      snug?: boolean;
    }
  | {
      type: "video";
      src: string;
      alt?: string;
      id?: string;
      className?: string;
      aspectRatio?: string;
      caption?: string;
      snug?: boolean;
    }
  | { type: "content-group"; html: string; id?: string; snug?: boolean }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      id?: string;
      snug?: boolean;
    }
  | {
      type: "columns";
      columns: ContentBlock[][];
      layout?: string;
      id?: string;
      snug?: boolean;
    };

// Defines the sidebar navigation structure.
export interface SidebarItem {
  label: string;
  anchorId: string;
}

// Defines a project tab, such as Overview or Architecture.
export interface ProjectTab {
  id: string;
  title: string;
  sidebarItems: SidebarItem[];
  content: ContentBlock[];
}

// Work areas a project belongs to; they drive the Projects filter and the
// card tags.
export type WorkArea =
  | "Data"
  | "Frontend"
  | "Backend"
  | "Automation"
  | "DevOps"
  | "Design";

// One row of the project facts table, e.g. { label: "Year", value: "2025" }.
export interface ProjectFact {
  label: string;
  value: string;
}

// Defines the complete project structure.
export interface ProjectData {
  slug: string; // e.g. "spotify-clone", used in the URL.
  name: string; // Project name.
  description: string; // Short description.
  areas: WorkArea[]; // At least one; first is the main one.
  context: string; // Card subtitle, e.g. "Personal project" or a company.
  facts?: ProjectFact[]; // Figma "Project Facts": Role / Stack / Year / Type.
  hero?: {
    // Optional hero image or video.
    type: "image" | "video";
    src: string;
    srcSet?: string; // width variants (images), with sizes
    sizes?: string;
    alt?: string; // Image alternative text.
  };
  tabs: ProjectTab[]; // Project tabs.
  noindex?: boolean; // Kept out of search engines and the sitemap.
}

// An image with width variants for srcset
export interface ResponsiveImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}
