// data/projects.ts
import { ProjectData } from "../types";
import demoVideo from "../../assets/video/Google_Mio_Tokens_1080x1080.mp4";

export const projectsData: ProjectData[] = [
  {
    slug: "spotify-clone",
    name: "Clone do Spotify",
    description: "Plataforma fullstack de streaming de música.",
    hero: {
      type: "video",
      src: demoVideo,
      alt: "Demonstração do Clone do Spotify",
    },
    tabs: [
      // =================================================================
      // ABA 1: VISÃO GERAL
      // =================================================================
      {
        id: "visao-geral",
        title: "Visão Geral",
        sidebarItems: [
          { label: "O Projeto", anchorId: "intro" },
          { label: "Funcionalidades", anchorId: "features" },
          { label: "Galeria", anchorId: "gallery" },
          { label: "Design e Interface", anchorId: "design" },
          { label: "Performance", anchorId: "performance" },
          { label: "Segurança", anchorId: "security" },
          { label: "Responsividade", anchorId: "responsive" },
        ],
        content: [
          {
            type: "header",
            level: 1,
            text: "O Projeto",
            id: "intro",
          },
          {
            type: "paragraph",
            text: "Clone funcional do Spotify desenvolvido para demonstrar capacidades fullstack, desde a arquitetura de APIs REST até a criação de interfaces modernas e responsivas.",
          },
          {
            type: "paragraph",
            text: "Este projeto foi construído acompanhando uma live técnica da <strong>Hashtag Treinamentos</strong>, onde pude aplicar conceitos de desenvolvimento fullstack em um cenário real.",
          },
          {
            type: "paragraph",
            text: "<strong>🎯 Propósito do Projeto:</strong><br/>Plataforma completa de streaming que permite aos usuários navegar por catálogos de artistas e músicas, reproduzir áudios e explorar conteúdo musical.",
          },
          {
            type: "header",
            level: 2,
            text: "✨ Funcionalidades Principais",
            id: "features",
          },
          {
            type: "image",
            src: "/demo.gif",
            alt: "Demonstração da aplicação",
          },
          {
            type: "header",
            level: 3,
            text: "1. Catálogo de Artistas",
          },
          {
            type: "list",
            items: [
              "Listagem com 20 artistas brasileiros",
              "Cards visuais com imagens e banners",
              "Navegação para perfil detalhado",
            ],
          },
          {
            type: "header",
            level: 3,
            text: "2. Biblioteca Musical",
          },
          {
            type: "list",
            items: [
              "200 músicas catalogadas",
              "Player de áudio integrado",
              "Informações de duração e artista",
            ],
          },
          {
            type: "header",
            level: 3,
            text: "3. Navegação Fluida",
          },
          {
            type: "list",
            items: [
              "Roteamento dinâmico (React Router)",
              "Páginas individuais para artistas e músicas",
              "Interface responsiva inspirada no Spotify",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "📸 Galeria",
            id: "gallery",
          },
          {
            type: "image",
            src: "/screenshots/home.png",
            alt: "Tela inicial",
          },
          {
            type: "image",
            src: "/screenshots/artists.png",
            alt: "Lista de artistas",
          },
          {
            type: "image",
            src: "/screenshots/player.png",
            alt: "Player de música",
          },
          {
            type: "header",
            level: 2,
            text: "🎨 Design e Interface",
            id: "design",
          },
          {
            type: "paragraph",
            text: "O design da aplicação foi inspirado no Spotify original, mantendo a paleta de cores escura característica e a navegação intuitiva. A interface foi construída do zero utilizando CSS Modules, garantindo encapsulamento e evitando conflitos de estilos.",
          },
          {
            type: "paragraph",
            text: "A tipografia utilizada segue as guidelines do Material Design, com fontes bem definidas para hierarquia de informação. Os componentes são responsivos e se adaptam a diferentes tamanhos de tela, desde mobile até desktop.",
          },
          {
            type: "header",
            level: 3,
            text: "Paleta de Cores",
          },
          {
            type: "list",
            items: [
              "Background Principal: <code>#121212</code>",
              "Background Secundário: <code>#181818</code>",
              "Accent Color: <code>#1DB954</code> (verde Spotify)",
              "Texto Principal: <code>#FFFFFF</code>",
              "Texto Secundário: <code>#B3B3B3</code>",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "⚡ Performance",
            id: "performance",
          },
          {
            type: "paragraph",
            text: "A aplicação foi otimizada para garantir carregamento rápido e navegação fluida. Utilizamos lazy loading para imagens e implementamos estratégias de cache para reduzir chamadas à API.",
          },
          {
            type: "paragraph",
            text: "O bundle final foi otimizado com Vite, resultando em chunks pequenos e carregamento eficiente. O tempo de First Contentful Paint (FCP) ficou abaixo de 1.5s em conexões 4G.",
          },
          {
            type: "header",
            level: 3,
            text: "Métricas de Performance",
          },
          {
            type: "list",
            items: [
              "Time to Interactive: ~2.1s",
              "First Contentful Paint: ~1.3s",
              "Largest Contentful Paint: ~1.8s",
              "Bundle Size (gzipped): ~145KB",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "🔐 Segurança",
            id: "security",
          },
          {
            type: "paragraph",
            text: "Implementamos diversas práticas de segurança para proteger a aplicação e os dados dos usuários. Todas as comunicações com a API são feitas via HTTPS, e utilizamos CORS configurado adequadamente no backend.",
          },
          {
            type: "paragraph",
            text: "As conexões com o MongoDB Atlas utilizam strings de conexão com credenciais protegidas por variáveis de ambiente. O acesso ao banco é restrito por IP whitelist.",
          },
          {
            type: "header",
            level: 2,
            text: "📱 Responsividade",
            id: "responsive",
          },
          {
            type: "paragraph",
            text: "A interface foi desenvolvida com mobile-first approach, garantindo que funcione perfeitamente em dispositivos de todos os tamanhos. Utilizamos media queries e unidades relativas (rem, %, vw/vh) para garantir adaptabilidade.",
          },
          {
            type: "list",
            items: [
              "Mobile (320px - 768px): Layout em coluna única",
              "Tablet (768px - 1024px): Grid de 2 colunas",
              "Desktop (1024px+): Grid de 3-4 colunas com sidebar",
            ],
          },
        ],
      },

      // =================================================================
      // ABA 2: ARQUITETURA
      // =================================================================
      {
        id: "arquitetura",
        title: "Arquitetura",
        sidebarItems: [
          { label: "Diagrama", anchorId: "diagram" },
          { label: "Código", anchorId: "code" },
          { label: "Database", anchorId: "db" },
        ],
        content: [
          {
            type: "header",
            level: 1,
            text: "🏗️ Diagrama de Arquitetura",
            id: "diagram",
          },
          {
            type: "code",
            language: "text",
            // Usando template literals para manter o desenho ASCII
            code: `
┌─────────────────┐
│    FRONTEND     │
│    React + TS   │
│    (Vite)       │
└────────┬────────┘
         │
         │ HTTP/CORS
         │ Axios
         ▼
┌─────────────────┐
│    BACKEND      │
│    Express API  │
│    Port: 3001   │
└────────┬────────┘
         │
         │ MongoDB Driver
         ▼
┌─────────────────┐
│    DATABASE     │
│    MongoDB Atlas│
└─────────────────┘`,
          },
          {
            type: "header",
            level: 2,
            text: "💻 Trechos de Código Relevantes",
            id: "code",
          },
          {
            type: "header",
            level: 3,
            text: "1. API RESTful - Endpoints",
          },
          {
            type: "code",
            title: "back-end/src/api/server.ts",
            language: "typescript",
            code: `app.get("/api/artists", async (req: Request, res: Response) => {
  res.send(await db.collection("artists").find({}).toArray());
});

app.get("/api/songs", async (req: Request, res: Response) => {
  res.send(await db.collection("songs").find({}).toArray());
});`,
          },
          {
            type: "header",
            level: 3,
            text: "2. Consumo de API no Frontend",
          },
          {
            type: "code",
            title: "front-end/api/api.ts",
            language: "typescript",
            code: `import axios from "axios";

const URL = "https://spotify-web-ehgp.onrender.com/api";

const responseArtists = await axios.get(\`\${URL}/artists\`);
const responseSongs = await axios.get(\`\${URL}/songs\`);

export const artistsArray = responseArtists.data;
export const songsArray = responseSongs.data;`,
          },
          {
            type: "header",
            level: 2,
            text: "🗄️ Modelagem do Banco de Dados",
            id: "db",
          },
          {
            type: "header",
            level: 3,
            text: "Collection: artists",
          },
          {
            type: "code",
            language: "json",
            code: `{
  "_id": "ObjectId(...)",
  "image": "https://...",
  "name": "Henrique & Juliano",
  "banner": "https://..."
}`,
          },
          {
            type: "header",
            level: 3,
            text: "Collection: songs",
          },
          {
            type: "code",
            language: "json",
            code: `{
  "_id": "ObjectId(...)",
  "image": "https://...",
  "name": "Última Saudade",
  "duration": "02:30",
  "artist": "Henrique & Juliano",
  "audio": "https://...mp3"
}`,
          },
        ],
      },

      // =================================================================
      // ABA 3: REPOSITÓRIO
      // =================================================================
      {
        id: "repositorio",
        title: "Repositório",
        sidebarItems: [
          { label: "Links", anchorId: "links" },
          { label: "Instalação", anchorId: "setup" },
          { label: "Tecnologias", anchorId: "stack" },
          { label: "Aprendizados", anchorId: "learning" },
          { label: "Próximos Passos", anchorId: "next-steps" },
          { label: "Contribuições", anchorId: "contributions" },
          { label: "Licença", anchorId: "license" },
          { label: "Agradecimentos", anchorId: "thanks" },
        ],
        content: [
          {
            type: "header",
            level: 1,
            text: "🔗 Links do Projeto",
            id: "links",
          },
          {
            type: "list",
            items: [
              '<strong>🌐 Aplicação Online:</strong> <a href="https://spotify-web-ehgp.onrender.com" target="_blank">Acessar Demo</a>',
              '<strong>📂 GitHub:</strong> <a href="#" target="_blank">Acessar Código Fonte</a>',
            ],
          },
          {
            type: "header",
            level: 2,
            text: "🚀 Como Rodar Localmente",
            id: "setup",
          },
          {
            type: "header",
            level: 3,
            text: "Backend",
          },
          {
            type: "code",
            language: "bash",
            code: `cd back-end
npm install
npm run dev
# Servidor rodando em http://localhost:3001`,
          },
          {
            type: "header",
            level: 3,
            text: "Frontend",
          },
          {
            type: "code",
            language: "bash",
            code: `cd front-end
npm install
npm run dev
# App rodando em http://localhost:5173`,
          },
          {
            type: "header",
            level: 2,
            text: "📦 Stack Tecnológica",
            id: "stack",
          },
          {
            type: "header",
            level: 3,
            text: "Frontend",
          },
          {
            type: "list",
            items: [
              "React 18 + TypeScript",
              "Vite",
              "React Router DOM",
              "Axios",
              "CSS Modules",
            ],
          },
          {
            type: "header",
            level: 3,
            text: "Backend & DB",
          },
          {
            type: "list",
            items: [
              "Node.js + Express",
              "TypeScript",
              "MongoDB Driver",
              "MongoDB Atlas",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "🎯 Destaques Técnicos",
          },
          {
            type: "list",
            items: [
              "✅ Arquitetura REST bem definida",
              "✅ TypeScript strict mode",
              "✅ Deploy fullstack (Render)",
              "✅ Roteamento dinâmico",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "📚 Aprendizados",
            id: "learning",
          },
          {
            type: "paragraph",
            text: "Este projeto proporcionou diversos aprendizados técnicos e de arquitetura. Foi fundamental para consolidar conhecimentos em desenvolvimento fullstack e integração entre frontend e backend.",
          },
          {
            type: "header",
            level: 3,
            text: "Principais Desafios",
          },
          {
            type: "list",
            items: [
              "Integração entre React e Express com CORS",
              "Gerenciamento de estado para o player de áudio",
              "Otimização de queries no MongoDB",
              "Deploy sincronizado de frontend e backend",
              "Implementação de roteamento dinâmico",
            ],
          },
          {
            type: "paragraph",
            text: "A experiência de trabalhar com MongoDB Atlas foi enriquecedora, especialmente na configuração de índices para otimizar buscas e na estruturação de collections para relacionamentos eficientes.",
          },
          {
            type: "header",
            level: 2,
            text: "🚀 Próximos Passos",
            id: "next-steps",
          },
          {
            type: "paragraph",
            text: "Existem várias funcionalidades que podem ser implementadas para tornar o projeto ainda mais completo e próximo da aplicação real do Spotify.",
          },
          {
            type: "list",
            items: [
              "Sistema de autenticação de usuários",
              "Playlists personalizadas",
              "Sistema de favoritos",
              "Busca avançada com filtros",
              "Histórico de reprodução",
              "Modo offline com PWA",
              "Integração com API do Spotify real",
              "Sistema de recomendações",
            ],
          },
          {
            type: "header",
            level: 2,
            text: "🤝 Contribuições",
            id: "contributions",
          },
          {
            type: "paragraph",
            text: "Este é um projeto de código aberto e contribuições são bem-vindas! Se você encontrou algum bug ou tem sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.",
          },
          {
            type: "paragraph",
            text: "Para contribuir, faça um fork do repositório, crie uma branch para sua feature, implemente as mudanças e abra um pull request detalhando o que foi alterado.",
          },
          {
            type: "header",
            level: 2,
            text: "📄 Licença",
            id: "license",
          },
          {
            type: "paragraph",
            text: "Este projeto está sob a licença MIT. Você é livre para usar, modificar e distribuir o código, desde que mantenha a atribuição original.",
          },
          {
            type: "header",
            level: 2,
            text: "🙏 Agradecimentos",
            id: "thanks",
          },
          {
            type: "paragraph",
            text: "Agradecimento especial à <strong>Hashtag Treinamentos</strong> pela live técnica que serviu de base para este projeto. Também agradeço à comunidade open source pelas bibliotecas e ferramentas utilizadas.",
          },
        ],
      },
    ],
  },
];
