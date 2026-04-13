// Define todos os tipos de blocos que nosso sistema aceita
export type ContentBlock =
  | { type: "header"; level: 1 | 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string; id?: string }
  | { type: "image"; src: string; alt: string; id?: string }
  | {
      type: "code";
      code: string;
      language?: string;
      title?: string;
      id?: string;
    }
  | { type: "list"; items: string[]; id?: string }
  | { type: "content-group"; html: string; id?: string };

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
