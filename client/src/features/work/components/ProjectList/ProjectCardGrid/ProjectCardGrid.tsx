import { useNavigate } from "react-router-dom";
import type { ProjectData } from "../../../data/project-data.types.ts";
import NoProjectsFound from "../NoProjectsFound/NoProjectsFound.tsx";
import ProjectCard from "../ProjectCard/ProjectCard.tsx";
import styles from "./ProjectCardGrid.module.css";

interface ProjectCardGridProps {
  projects: ProjectData[];
  onClearFilters: () => void;
}

const ProjectCardGrid = ({
  projects,
  onClearFilters,
}: ProjectCardGridProps) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return <NoProjectsFound onClearFilters={onClearFilters} />;
  }

  return (
    <div className={styles.cards}>
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          title={project.name}
          categories={project.areas}
          company={project.context}
          buttonGroupSize="small"
          selectable={false}
          interactive={true}
          onClick={() => navigate(`/projects/${project.slug}`)}
        />
      ))}
    </div>
  );
};

export default ProjectCardGrid;
