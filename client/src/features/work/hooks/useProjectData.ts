import { useCallback } from "react";
import { projectsData } from "../data/projects";

export function useProjectData() {
  const getAllProjects = useCallback(() => {
    return projectsData;
  }, []);

  const getProjectBySlug = useCallback((slug: string) => {
    return projectsData.find((project) => project.slug === slug);
  }, []);

  return {
    getAllProjects,
    getProjectBySlug,
  };
}
