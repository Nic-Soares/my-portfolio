import { useCallback } from "react";
import { projectsData } from "../data/projects/index.ts";

export function useProjectData() {
  const getAllProjects = useCallback(() => {
    return projectsData;
  }, []);

  const getProjectBySlug = useCallback((slug: string) => {
    return projectsData.find((project) => project.slug === slug);
  }, []);

  // Neighbors in the data order (the project list order); null at the ends
  const getAdjacentProjects = useCallback((slug: string) => {
    const index = projectsData.findIndex((project) => project.slug === slug);
    if (index === -1) return { previous: null, next: null };
    return {
      previous: projectsData[index - 1] ?? null,
      next: projectsData[index + 1] ?? null,
    };
  }, []);

  return {
    getAllProjects,
    getProjectBySlug,
    getAdjacentProjects,
  };
}
