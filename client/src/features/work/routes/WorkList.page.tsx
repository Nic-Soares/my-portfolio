import styles from "./WorkList.page.module.css";
import WorkGrid from "../components/WorkGrid";
import WorkListHero from "../components/WorkListHero";

interface WorkListPageProps {
  onProjectSelect?: (projectId: string) => void;
}

const WorkListPage = ({ onProjectSelect }: WorkListPageProps) => {
  return (
    <div className={styles["projects"]}>
      <WorkListHero />
      <WorkGrid onProjectSelect={onProjectSelect} />
    </div>
  );
};

export default WorkListPage;
