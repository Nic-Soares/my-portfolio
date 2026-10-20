import ProjectCardGrid from "../../components/ProjectList/ProjectCardGrid/ProjectCardGrid.tsx";
import ProjectListHero from "../../components/ProjectList/ProjectListHero/ProjectListHero.tsx";
import { projectsData } from "../../data/projects/index.ts";
import { useProjectFilters } from "../../hooks/useProjectFilters.ts";
import styles from "./ProjectList.page.module.css";

const ProjectListPage = () => {
  const filters = useProjectFilters(projectsData);

  return (
    <div className={styles["projects"]}>
      <ProjectListHero
        total={projectsData.length}
        areas={filters.areas}
        area={filters.area}
        onAreaChange={filters.setArea}
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
