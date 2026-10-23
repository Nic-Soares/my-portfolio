import type { ProjectData } from "../project-data.types.ts";
import { spotifyWebMedia as media } from "./spotify-web.media.ts";

// Spanish translation of spotify-clone.data.ts
export const projectsDataEs: ProjectData[] = [
  {
    slug: "spotify-clone",
    name: "Spotify Web",
    description:
      "Un catálogo y reproductor de música full-stack — front end en React, API con Express + MongoDB, desplegado de punta a punta en Render.",
    areas: ["Frontend", "Backend"],
    context: "Proyecto personal",
    facts: [
      {
        label: "Rol",
        value: "Desarrollador único — diseño, front end, back end, deploy",
      },
      { label: "Stack", value: "React · TypeScript · Express · MongoDB" },
      { label: "Año", value: "2025" },
      { label: "Tipo", value: "Proyecto personal" },
    ],
    hero: {
      type: "image",
      ...media.hero,
      alt: "Ilustración de un hombre con audífonos cuidando un huerto, rodeado de notas musicales",
    },
    tabs: [
      {
        id: "overview",
        title: "Resumen",
        sidebarItems: [
          { label: "Rol y stack", anchorId: "role-stack" },
          { label: "Pantallas", anchorId: "screens" },
        ],
        content: [
          {
            type: "intro",
            id: "role-stack",
            text: "Spotify Web es un catálogo y reproductor de música full-stack construido de punta a punta: una biblioteca curada de 20 artistas brasileños y 200 canciones, navegable por artista o por canción, con un reproductor de audio propio. Lo que empezó como un clon solo de front end se reconstruyó alrededor de una API real con Express y MongoDB para practicar la entrega de una porción completa — UI, API, base de datos y despliegue — como un único producto funcional.",
          },
          { type: "header", level: 2, text: "Pantallas", id: "screens" },
          {
            type: "paragraph",
            text: "Tres pantallas principales: explorar artistas, profundizar en la discografía de un artista y reproducir una canción con el reproductor de audio propio.",
          },
          {
            type: "columns",
            columns: [
              [
                {
                  type: "image",
                  ...media.screenHome,
                  alt: "Pantalla de inicio con los artistas y canciones más populares",
                  aspectRatio: "3 / 2",
                  caption: "Inicio — artistas y canciones top",
                },
              ],
              [
                {
                  type: "image",
                  ...media.screenArtist,
                  alt: "Pantalla de artista con la discografía",
                  aspectRatio: "3 / 2",
                  caption: "Artista — discografía",
                },
              ],
              [
                {
                  type: "image",
                  ...media.screenPlayer,
                  alt: "Pantalla del reproductor con la canción en reproducción",
                  aspectRatio: "3 / 2",
                  caption: "Reproductor — sonando ahora",
                },
              ],
            ],
          },
        ],
      },
      {
        id: "architecture",
        title: "Arquitectura",
        sidebarItems: [
          { label: "Flujo de solicitudes", anchorId: "request-flow" },
          { label: "Stack tecnológico", anchorId: "tech-stack" },
          { label: "Modelo de datos", anchorId: "data-model" },
        ],
        content: [
          {
            type: "header",
            level: 2,
            text: "Arquitectura y stack",
            id: "request-flow",
          },
          {
            type: "paragraph",
            text: "Un solo proceso sirve ambos lados: Express expone dos endpoints de lectura respaldados por MongoDB Atlas y, para cualquier otra ruta, recurre al build compilado de React — así las rutas del lado del cliente sobreviven a una recarga completa.",
          },
          {
            type: "image",
            ...media.architecture,
            alt: "Diagrama de arquitectura: el navegador carga el build de React, que llama a la API de Express; Express lee las colecciones de artistas y canciones de MongoDB Atlas y recurre a index.html para las rutas del lado del cliente",
            aspectRatio: "3 / 2",
          },
          {
            type: "table",
            id: "tech-stack",
            headers: ["Capa", "Tecnología"],
            rows: [
              ["Front end", "React 19 · TypeScript · Vite · React Router"],
              ["Back end", "Node.js · Express 4 · TypeScript"],
              ["Base de datos", "MongoDB Atlas"],
              ["Hosting", "Render (un solo servicio, front end + API)"],
            ],
          },
          {
            type: "header",
            level: 3,
            text: "Modelo de datos",
            id: "data-model",
          },
          {
            type: "paragraph",
            text: "Dos colecciones de MongoDB planas y desnormalizadas — sin joins, sin relaciones. El front end obtiene ambas completas y hace todo el filtrado del lado del cliente.",
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
        title: "Repositorio",
        sidebarItems: [
          { label: "Configuración y enlaces", anchorId: "setup-links" },
          { label: "Decisiones clave", anchorId: "key-decisions" },
          { label: "Qué haría después", anchorId: "next-steps" },
        ],
        content: [
          {
            type: "header",
            level: 2,
            text: "Configuración y enlaces",
            id: "setup-links",
          },
          {
            type: "paragraph",
            text: "Todo el proyecto — front end y back end — vive en un solo repositorio como dos proyectos Node independientes, orquestados desde un package.json raíz para que un único par build/start cubra ambos.",
          },
          {
            type: "list",
            items: [
              "Demo en vivo — [spotify-web-ehgp.onrender.com](https://spotify-web-ehgp.onrender.com)",
              // PENDING: the repository URL (waiting on Nicolas)
              "Código fuente — repositorio en GitHub",
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
            text: "Decisiones clave y resultado",
            id: "key-decisions",
          },
          {
            type: "list",
            items: [
              "Carga anticipada de datos: todo el catálogo de artistas y canciones se carga una vez al iniciar y se filtra en memoria del lado del cliente — simple con 20 artistas / 200 canciones, una concesión deliberada que necesitaría paginación y búsqueda para escalar más.",
              "Reproductor de audio propio construido directamente sobre el elemento `<audio>`: reproducir/pausar, una barra de progreso por sondeo y siguiente/anterior que salta a una canción aleatoria del mismo artista en lugar de una cola fija.",
              "Un único servicio de Express sirve tanto la API como el front end compilado, así que un solo despliegue en Render cubre todo el stack en lugar de dos.",
            ],
          },
          {
            type: "paragraph",
            text: "El resultado es una app funcional y desplegada públicamente con un catálogo real, páginas de detalle de artistas y canciones, y un reproductor propio que funciona — además de un documento de arquitectura escrito por mí que nombra sus propias carencias (sin autenticación, sin búsqueda, configuración que debería pasar a variables de entorno) como próximos pasos concretos en lugar de ocultarlas.",
          },
          {
            type: "header",
            level: 3,
            text: "Qué haría después",
            id: "next-steps",
          },
          {
            type: "list",
            items: [
              "Paginación y búsqueda cuando el catálogo deje de ser lo bastante pequeño para mantenerlo en memoria",
              "Estados de carga y de error para las llamadas a la API",
              "Una cola de reproducción real en lugar de una reproducción aleatoria",
              "Configuración mediante variables de entorno en lugar de valores fijos en el código",
            ],
          },
        ],
      },
    ],
  },
];
