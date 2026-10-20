import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button/Button.tsx";
import type { ProjectData } from "../../../data/project-data.types.ts";
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

  // Interim empty state until EP-10's StateLayout exists
  if (projects.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <p className="title-large">No projects match these filters.</p>
        <Button
          size="small"
          style="tonal"
          icon={null}
          label="Clear filters"
          onClick={onClearFilters}
        />
      </div>
    );
  }

  return (
    <div className={styles["cards"]}>
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
