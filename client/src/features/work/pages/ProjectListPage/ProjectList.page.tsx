import ProjectCardGrid from "../../components/ProjectList/ProjectCardGrid/ProjectCardGrid.tsx";
import ProjectListHero from "../../components/ProjectList/ProjectListHero/ProjectListHero.tsx";
import { useProjectData } from "../../hooks/useProjectData.ts";
import { useProjectFilters } from "../../hooks/useProjectFilters.ts";
import styles from "./ProjectList.page.module.css";

const ProjectListPage = () => {
  const projectsData = useProjectData().getAllProjects();
  const filters = useProjectFilters(projectsData);

  return (
    <div className={styles.projects}>
      <ProjectListHero
        total={projectsData.length}
        areas={filters.areas}
        selectedAreas={filters.selectedAreas}
        onAreasChange={filters.setAreas}
        query={filters.query}
        onQueryChange={filters.setQuery}
      />
      <ProjectCardGrid
        projects={filters.filtered}
        onClearFilters={filters.clear}
      />
    </div>
  );
};

export default ProjectListPage;
