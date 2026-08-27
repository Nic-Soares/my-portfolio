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
  | {
      type: "image";
      src: string;
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

// Defines the complete project structure.
export interface ProjectData {
  slug: string; // e.g. "spotify-clone", used in the URL.
  name: string; // Project name.
  description: string; // Short description.
  hero?: {
    // Optional hero image or video.
    type: "image" | "video";
    src: string;
    alt?: string; // Image alternative text.
  };
  tabs: ProjectTab[]; // Project tabs.
}
