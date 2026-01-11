import styles from "./ProjectsList.module.css";
import ProjectGrid from "./ProjectGrid";
import ProjectsListHero from "./ProjectsListHero";

interface ProjectsListProps {
  onProjectSelect: (projectId: string) => void;
}

const ProjectsList = ({ onProjectSelect }: ProjectsListProps) => {
  return (
    <div className={styles["projects"]}>
      <ProjectsListHero />
      <ProjectGrid onProjectSelect={onProjectSelect} />
    </div>
  );
};

export default ProjectsList;
