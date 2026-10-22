// English catalog: the source of truth for the keys. pt and es are typed
// against it (see messages.ts), so a missing key fails the typecheck.
export const en = {
  layout: {
    skipToContent: "Skip to content",
    home: "Home",
    mainNav: "Main",
    nav: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
    },
    language: "Language",
    darkTheme: "Dark theme",
    tabs: "Tabbed navigation",
    footer: {
      nav: "Footer",
      tagline:
        "Full-stack developer building real products end-to-end — from interface to database.",
      role: "Fullstack Developer",
      copyright: "Copyright",
      copyrightLine: (year: number, owner: string, role: string) =>
        `${year} ${owner}. ${role}`,
      columns: {
        social: "Social",
        navigation: "Navigation",
        resources: "Resources",
      },
      links: {
        email: "Email",
        about: "About",
        work: "Work",
        contact: "Contact",
        resume: "Résumé",
      },
    },
  },
  ui: {
    search: "Search...",
    searchInput: "Search input",
    clearSearch: "Clear search",
    remove: (label: string) => `Remove ${label}`,
    loading: "Loading",
  },
  home: {
    eyebrow: "Hello there!",
    // The name is styled apart, so the headline comes in pieces
    headlineBefore: "I’m ",
    headlineAfter: ",",
    headlineLine2:
      "I turn data into visual experiences that drive smart decisions.",
    skills: "Skills",
    skillYears: "3+ Years in Data",
    skillAi: "Applied AI",
    seeProjects: "See My Projects",
    contactMe: "Contact me",
    services: "Services",
    automationTitle: "Systems & Process Automation",
    automationText:
      "I automate processes, integrate systems and turn manual tasks into efficient, reliable flows.",
    dataTitle: "Data Engineering & Analysis",
    dataText:
      "From raw data to dashboards: I deliver clarity, automation and insights.",
    companies: "Companies I've worked with",
    projects: "Projects",
    carousel: "carousel",
    slide: "slide",
    slideOf: (number: string, total: string) => `${number} of ${total}`,
    more: "More",
    showProject: (number: string, name: string) =>
      `Show project ${number}: ${name}`,
  },
  work: {
    title: "Projects",
    all: (total: number) => `All · ${total}`,
    searchProjects: "Search projects",
    closeSearch: "Close search",
    closeFilter: "Close filter",
    filter: "Filter",
    filterCount: (count: number) => `Filter · ${count}`,
    search: "Search",
    searchActive: "Search · 1",
    areas: {
      Data: "Data",
      Frontend: "Frontend",
      Backend: "Backend",
      Automation: "Automation",
      DevOps: "DevOps",
      Design: "Design",
    },
    noProjects: "No projects found",
    noProjectsText:
      "We couldn't find any projects with these filters. Try another combination or clear the search.",
    clearFilters: "Clear filters",
    loadingProjects: "Loading projects",
    moreProjects: "More projects",
    previousProject: "Previous project",
    nextProject: "Next project",
    onThisPage: "On this page",
    copyLink: "Copy link to section",
    mediaUnavailable: "Media unavailable",
    mediaError: "Unable to load media.",
    openInNewTab: "Open in a new tab",
    mediaContent: "Media content",
  },
  about: {
    title: "About Me",
    experience: "Work Experience",
    atAGlance: "At a glance",
    quickFacts: "Quick facts",
    stack: "Stack",
    education: "Education",
    certifications: "Certifications",
    speaks: "Speaks",
    sayHi: "Say hi!",
    downloadCv: "Download CV",
  },
  system: {
    backHome: "Back to home",
    viewProjects: "View projects",
    notFound: "Page not found",
    notFoundText:
      "The link you followed doesn't exist or has moved. Check the address or head back home.",
    error: "Something went wrong",
    errorText:
      "We couldn't load this content right now. Try again in a moment.",
    tryAgain: "Try again",
    underConstruction: "Under construction",
    underConstructionText:
      "This page is still being built. It'll be here soon — in the meantime, take a look at the projects.",
  },
};
