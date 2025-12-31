import styles from "./ProjectsCards.module.css";
import ProjectCard from "@/components/common/project-card/ProjectCard";

const ProjectsCards = () => {
  return (
    <div className={styles["cards"]}>
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
};

export default ProjectsCards;
