import ProjectCardGrid from "../../components/ProjectList/ProjectCardGrid/ProjectCardGrid.tsx";
import ProjectListHero from "../../components/ProjectList/ProjectListHero/ProjectListHero.tsx";
import styles from "./ProjectList.page.module.css";

const ProjectListPage = () => {
  return (
    <div className={styles["projects"]}>
      <ProjectListHero />
      <ProjectCardGrid />
    </div>
  );
};

export default ProjectListPage;
