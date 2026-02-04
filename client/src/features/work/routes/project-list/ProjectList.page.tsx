import styles from "./ProjectList.page.module.css";
import ProjectCardGrid from "../../components/project-list/project-card-grid/ProjectCardGrid";
import ProjectListHero from "../../components/project-list/project-list-hero/ProjectListHero";

const ProjectListPage = () => {
  return (
    <div className={styles["projects"]}>
      <ProjectListHero />
      <ProjectCardGrid />
    </div>
  );
};

export default ProjectListPage;
