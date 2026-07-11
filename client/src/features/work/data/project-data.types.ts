// Define todos os tipos de blocos que nosso sistema aceita
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

// Define a estrutura do menu lateral
export interface SidebarItem {
  label: string;
  anchorId: string;
}

// Define a estrutura de uma Aba (Visão Geral, Arquitetura, etc)
export interface ProjectTab {
  id: string;
  title: string;
  sidebarItems: SidebarItem[];
  content: ContentBlock[];
}

// Define a estrutura do Projeto completo
export interface ProjectData {
  slug: string; // ex: 'spotify-clone' (usado na URL)
  name: string; // Nome do projeto
  description: string; // Descrição curta
  hero?: {
    // Hero opcional (imagem ou vídeo)
    type: "image" | "video";
    src: string;
    alt?: string; // Para imagens
  };
  tabs: ProjectTab[]; // Lista de abas
}
