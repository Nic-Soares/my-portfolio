import { useCallback } from "react";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import { projectsByLocale } from "../data/projects/index.ts";

// Projects in the current locale
export function useProjectData() {
  const { locale } = useI18n();
  const projectsData = projectsByLocale[locale];

  const getAllProjects = useCallback(() => projectsData, [projectsData]);

  const getProjectBySlug = useCallback(
    (slug: string) => projectsData.find((project) => project.slug === slug),
    [projectsData],
  );

  // Neighbors in the data order (the project list order); null at the ends
  const getAdjacentProjects = useCallback(
    (slug: string) => {
      const index = projectsData.findIndex((project) => project.slug === slug);
      if (index === -1) return { previous: null, next: null };
      return {
        previous: projectsData[index - 1] ?? null,
        next: projectsData[index + 1] ?? null,
      };
    },
    [projectsData],
  );

  return {
    getAllProjects,
    getProjectBySlug,
    getAdjacentProjects,
  };
}
