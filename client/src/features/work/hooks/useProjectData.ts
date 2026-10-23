import { useI18n } from "@/i18n/I18nProvider.tsx";
import type {
  ProjectData,
  ProjectSummary,
} from "../data/project-data.types.ts";
import {
  projectRequest,
  projectsRequest,
  type Request,
} from "../data/projectsApi.ts";

// These suspend while loading (the nearest Suspense shows its fallback) and
// throw to the nearest error boundary when the API fails. Settled data is
// returned at once. Suspending by throwing the pending promise (not use()):
// use() re-suspends a page whose router update runs as a transition.
function read<T>(request: Request<T>): T {
  if (request.status === "fulfilled") return request.value as T;
  if (request.status === "rejected") throw request.error;
  throw request.promise;
}

// Every published project in the current locale, in display order
export function useProjects(): ProjectSummary[] {
  const { locale } = useI18n();
  return read(projectsRequest(locale));
}

// One project in the current locale, or null when the slug doesn't exist
export function useProject(slug: string): ProjectData | null {
  const { locale } = useI18n();
  return read(projectRequest(slug, locale));
}

// Neighbours in the list order; null at the ends
export function adjacentProjects(projects: ProjectSummary[], slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}
