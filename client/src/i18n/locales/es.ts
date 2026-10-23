import type { Messages } from "../messages.ts";

// Español
export const es: Messages = {
  layout: {
    skipToContent: "Saltar al contenido",
    home: "Inicio",
    mainNav: "Principal",
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
    },
    language: "Idioma",
    darkTheme: "Tema oscuro",
    tabs: "Navegación por pestañas",
    footer: {
      nav: "Pie de página",
      tagline:
        "Convierto datos en respuestas claras e IA en herramientas que la gente usa de verdad.",
      role: "Analista de Datos e Ingeniero de IA Aplicada",
      copyright: "Derechos de autor",
      copyrightLine: (year, owner, role) => `${year} ${owner}. ${role}`,
      columns: {
        social: "Redes",
        navigation: "Navegación",
        resources: "Recursos",
      },
      links: {
        email: "Correo",
        about: "Sobre mí",
        work: "Proyectos",
        contact: "Contacto",
        resume: "Currículum",
      },
    },
  },
  ui: {
    search: "Buscar...",
    searchInput: "Campo de búsqueda",
    clearSearch: "Borrar búsqueda",
    remove: (label) => `Quitar ${label}`,
    loading: "Cargando",
  },
  home: {
    eyebrow: "¡Hola!",
    headlineBefore: "Soy ",
    headlineAfter: ",",
    headlineLine2:
      "convierto datos en experiencias visuales que impulsan decisiones inteligentes.",
    skills: "Habilidades",
    skillYears: "3+ años en datos",
    skillAi: "IA aplicada",
    seeProjects: "Ver mis proyectos",
    contactMe: "Contáctame",
    services: "Servicios",
    automationTitle: "Automatización de sistemas y procesos",
    automationText:
      "Automatizo procesos, integro sistemas y convierto tareas manuales en flujos eficientes y confiables.",
    dataTitle: "Ingeniería y análisis de datos",
    dataText:
      "Del dato en bruto al dashboard: aporto claridad, automatización e insights.",
    companies: "Empresas con las que he trabajado",
    projects: "Proyectos",
    carousel: "carrusel",
    slide: "diapositiva",
    slideOf: (number, total) => `${number} de ${total}`,
    more: "Más",
    showProject: (number, name) => `Mostrar proyecto ${number}: ${name}`,
  },
  work: {
    title: "Proyectos",
    all: (total) => `Todos · ${total}`,
    searchProjects: "Buscar proyectos",
    closeSearch: "Cerrar búsqueda",
    closeFilter: "Cerrar filtro",
    filter: "Filtro",
    filterCount: (count) => `Filtro · ${count}`,
    search: "Búsqueda",
    searchActive: "Búsqueda · 1",
    areas: {
      Data: "Datos",
      Frontend: "Frontend",
      Backend: "Backend",
      Automation: "Automatización",
      DevOps: "DevOps",
      Design: "Diseño",
    },
    noProjects: "No se encontraron proyectos",
    noProjectsText:
      "No encontramos proyectos con estos filtros. Prueba otra combinación o borra la búsqueda.",
    clearFilters: "Borrar filtros",
    loadingProjects: "Cargando proyectos",
    moreProjects: "Más proyectos",
    previousProject: "Proyecto anterior",
    nextProject: "Proyecto siguiente",
    onThisPage: "En esta página",
    copyLink: "Copiar enlace a la sección",
    mediaUnavailable: "Contenido multimedia no disponible",
    mediaError: "No se pudo cargar el contenido multimedia.",
    openInNewTab: "Abrir en una pestaña nueva",
    mediaContent: "Contenido multimedia",
  },
  about: {
    title: "Sobre mí",
    experience: "Experiencia laboral",
    atAGlance: "En resumen",
    quickFacts: "Datos rápidos",
    stack: "Stack",
    education: "Formación",
    certifications: "Certificaciones",
    speaks: "Idiomas",
    sayHi: "¡Saluda!",
    downloadCv: "Descargar CV",
  },
  seo: {
    projectsDescription:
      "Casos de estudio en datos, automatización y desarrollo full-stack, de la interfaz a la base de datos.",
  },
  system: {
    backHome: "Volver al inicio",
    viewProjects: "Ver proyectos",
    notFound: "Página no encontrada",
    notFoundText:
      "El enlace que seguiste no existe o se movió. Revisa la dirección o vuelve al inicio.",
    error: "Algo salió mal",
    errorText:
      "No pudimos cargar este contenido ahora. Inténtalo de nuevo en un momento.",
    tryAgain: "Intentar de nuevo",
    underConstruction: "En construcción",
    underConstructionText:
      "Esta página todavía está en construcción. Pronto estará aquí — mientras tanto, echa un vistazo a los proyectos.",
  },
};
