import type { ProjectData } from "../project-data.types.ts";
import { spotifyWebMedia as media } from "./spotify-web.media.ts";

// pt-BR translation of spotify-clone.data.ts
export const projectsDataPt: ProjectData[] = [
  {
    slug: "spotify-clone",
    name: "Spotify Web",
    description:
      "Um catálogo e player de música full-stack — front end em React, API em Express + MongoDB, com deploy ponta a ponta no Render.",
    areas: ["Frontend", "Backend"],
    context: "Projeto pessoal",
    facts: [
      {
        label: "Função",
        value: "Desenvolvedor solo — design, front end, back end, deploy",
      },
      { label: "Stack", value: "React · TypeScript · Express · MongoDB" },
      { label: "Ano", value: "2025" },
      { label: "Tipo", value: "Projeto pessoal" },
    ],
    hero: {
      type: "image",
      ...media.hero,
      alt: "Ilustração de um homem de fones de ouvido cuidando de um canteiro, cercado por notas musicais",
    },
    tabs: [
      {
        id: "overview",
        title: "Visão geral",
        sidebarItems: [
          { label: "Função & stack", anchorId: "role-stack" },
          { label: "Telas", anchorId: "screens" },
        ],
        content: [
          {
            type: "intro",
            id: "role-stack",
            text: "Spotify Web é um catálogo e player de música full-stack construído de ponta a ponta: uma biblioteca curada de 20 artistas brasileiros e 200 músicas, navegável por artista ou faixa, com um player de áudio próprio para a reprodução. O que começou como um clone só de front end foi reconstruído em torno de uma API real em Express e MongoDB, para praticar a entrega de uma fatia completa — UI, API, banco de dados e deploy — como um único produto funcionando.",
          },
          { type: "header", level: 2, text: "Telas", id: "screens" },
          {
            type: "paragraph",
            text: "Três telas principais: navegar pelos artistas, explorar a discografia de um artista e tocar uma faixa no player de áudio próprio.",
          },
          {
            type: "columns",
            columns: [
              [
                {
                  type: "image",
                  ...media.screenHome,
                  alt: "Tela inicial com os principais artistas e músicas",
                  aspectRatio: "3 / 2",
                  caption: "Início — principais artistas & músicas",
                },
              ],
              [
                {
                  type: "image",
                  ...media.screenArtist,
                  alt: "Tela do artista com a discografia",
                  aspectRatio: "3 / 2",
                  caption: "Artista — discografia",
                },
              ],
              [
                {
                  type: "image",
                  ...media.screenPlayer,
                  alt: "Tela do player com a faixa tocando agora",
                  aspectRatio: "3 / 2",
                  caption: "Player — tocando agora",
                },
              ],
            ],
          },
        ],
      },
      {
        id: "architecture",
        title: "Arquitetura",
        sidebarItems: [
          { label: "Fluxo de requisições", anchorId: "request-flow" },
          { label: "Stack técnica", anchorId: "tech-stack" },
          { label: "Modelo de dados", anchorId: "data-model" },
        ],
        content: [
          {
            type: "header",
            level: 2,
            text: "Arquitetura & stack",
            id: "request-flow",
          },
          {
            type: "paragraph",
            text: "Um único processo atende os dois lados: o Express expõe dois endpoints de leitura apoiados no MongoDB Atlas e, para todas as outras rotas, devolve o build compilado do React — assim as rotas do lado do cliente sobrevivem a um refresh completo.",
          },
          {
            type: "image",
            ...media.architecture,
            alt: "Diagrama de arquitetura: o navegador carrega o build do React, que chama a API em Express; o Express lê as coleções de artistas e músicas do MongoDB Atlas e devolve o index.html para as rotas do lado do cliente",
            aspectRatio: "3 / 2",
          },
          {
            type: "table",
            id: "tech-stack",
            headers: ["Camada", "Tecnologia"],
            rows: [
              ["Front end", "React 19 · TypeScript · Vite · React Router"],
              ["Back end", "Node.js · Express 4 · TypeScript"],
              ["Banco de dados", "MongoDB Atlas"],
              ["Hospedagem", "Render (serviço único, front end + API)"],
            ],
          },
          {
            type: "header",
            level: 3,
            text: "Modelo de dados",
            id: "data-model",
          },
          {
            type: "paragraph",
            text: "Duas coleções MongoDB planas e desnormalizadas — sem joins, sem relações. O front end busca as duas por completo e faz toda a filtragem no cliente.",
          },
          {
            type: "columns",
            columns: [
              [
                {
                  type: "code",
                  title: "artists",
                  language: "json",
                  code: `{
  "_id": ObjectId,
  "name": "Henrique & Juliano",
  "image": "https://...",
  "banner": "https://..."
}`,
                },
              ],
              [
                {
                  type: "code",
                  title: "songs",
                  language: "json",
                  code: `{
  "_id": ObjectId,
  "name": "Última Saudade",
  "duration": "02:30",
  "artist": "Henrique & Juliano",
  "audio": "https://....mp3"
}`,
                },
              ],
            ],
          },
        ],
      },
      {
        id: "repository",
        title: "Repositório",
        sidebarItems: [
          { label: "Setup & links", anchorId: "setup-links" },
          { label: "Decisões-chave", anchorId: "key-decisions" },
          { label: "Próximos passos", anchorId: "next-steps" },
        ],
        content: [
          {
            type: "header",
            level: 2,
            text: "Setup & links",
            id: "setup-links",
          },
          {
            type: "paragraph",
            text: "O projeto inteiro — front end e back end — fica em um único repositório, como dois projetos Node independentes, orquestrados por um package.json na raiz para que um único par build/start cubra os dois.",
          },
          {
            type: "list",
            items: [
              'Demo ao vivo — <a href="https://spotify-web-ehgp.onrender.com" target="_blank" rel="noopener noreferrer">spotify-web-ehgp.onrender.com</a>',
              // PENDING: the repository URL (waiting on Nicolas)
              "Código-fonte — repositório no GitHub",
            ],
          },
          {
            type: "columns",
            columns: [
              [
                {
                  type: "code",
                  title: "back-end",
                  language: "bash",
                  code: `cd back-end
npm install
npm run dev
# http://localhost:3001`,
                },
              ],
              [
                {
                  type: "code",
                  title: "front-end",
                  language: "bash",
                  code: `cd front-end
npm install
npm run dev
# http://localhost:5173`,
                },
              ],
            ],
          },
          {
            type: "header",
            level: 2,
            text: "Decisões-chave & resultado",
            id: "key-decisions",
          },
          {
            type: "list",
            items: [
              "Carregamento antecipado dos dados: todo o catálogo de artistas e músicas é carregado uma vez na inicialização e filtrado em memória no cliente — simples com 20 artistas / 200 músicas, um trade-off deliberado que exigiria paginação e busca para escalar mais.",
              "Player de áudio próprio construído diretamente sobre o elemento &lt;audio&gt;: play/pause, uma barra de progresso atualizada por polling e próxima/anterior que pula para uma faixa aleatória do mesmo artista, em vez de uma fila fixa.",
              "Um único serviço Express serve tanto a API quanto o front end compilado, então um só deploy no Render cobre a stack inteira, em vez de dois.",
            ],
          },
          {
            type: "paragraph",
            text: "O resultado é um app funcionando e publicado, com catálogo real, páginas de detalhe de artistas e músicas e um player próprio funcional — além de um documento de arquitetura escrito por mim que aponta suas próprias lacunas (sem autenticação, sem busca, configurações que deveriam ir para variáveis de ambiente) como próximos passos concretos, em vez de escondê-las.",
          },
          {
            type: "header",
            level: 3,
            text: "Próximos passos",
            id: "next-steps",
          },
          {
            type: "list",
            items: [
              "Paginação e busca quando o catálogo deixar de ser pequeno o bastante para ficar em memória",
              "Estados de carregamento e de erro para as chamadas à API",
              "Uma fila de reprodução de verdade, em vez do shuffle aleatório",
              "Configuração via variáveis de ambiente, em vez de valores fixos no código",
            ],
          },
        ],
      },
    ],
  },
];
