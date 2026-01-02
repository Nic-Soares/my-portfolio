import styles from "./Projects.module.css";
import ProjectGrid from "./ProjectGrid";
import ProjectsHero from "./ProjectsHero";

const Projects = () => {
  return (
    <div className={styles["projects"]}>
      <ProjectsHero />
      <ProjectGrid />
    </div>
  );
};

export default Projects;
