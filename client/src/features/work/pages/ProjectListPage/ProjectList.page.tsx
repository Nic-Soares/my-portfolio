import styles from "./ProjectList.page.module.css";
import ProjectCardGrid from "../../components/ProjectList/ProjectCardGrid/ProjectCardGrid";
import ProjectListHero from "../../components/ProjectList/ProjectListHero/ProjectListHero";

const ProjectListPage = () => {
  return (
    <div className={styles["projects"]}>
      <ProjectListHero />
      <ProjectCardGrid />
    </div>
  );
};

export default ProjectListPage;
