import styles from "./ProjectList.page.module.css";
import ProjectCardGrid from "../../components/project-list/ProjectCardGrid/ProjectCardGrid";
import ProjectListHero from "../../components/project-list/ProjectListHero/ProjectListHero";

const ProjectListPage = () => {
  return (
    <div className={styles["projects"]}>
      <ProjectListHero />
      <ProjectCardGrid />
    </div>
  );
};

export default ProjectListPage;
