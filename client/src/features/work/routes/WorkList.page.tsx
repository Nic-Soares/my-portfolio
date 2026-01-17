import styles from "./WorkListPage.module.css";
import ProjectGrid from "../components/WorkGrid";
import WorkListPageHero from "../components/WorkListHero";

interface WorkListPageProps {
  onProjectSelect: (projectId: string) => void;
}

const WorkListPage = ({ onProjectSelect }: WorkListPageProps) => {
  return (
    <div className={styles["projects"]}>
      <WorkListPageHero />
      <ProjectGrid onProjectSelect={onProjectSelect} />
    </div>
  );
};

export default WorkListPage;
