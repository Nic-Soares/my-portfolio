import LinearProgress from "@/components/ui/LinearProgress/LinearProgress.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import ProjectGridSkeleton from "./ProjectGridSkeleton.tsx";
import styles from "./ProjectListSkeleton.module.css";
import ProjectsHeaderSkeleton from "./ProjectsHeaderSkeleton.tsx";

// Figma "Loading" screens: header skeleton, an indeterminate progress bar
// (the only part assistive tech hears) and the card grid skeleton
const ProjectListSkeleton = () => {
  const { t } = useI18n();
  return (
    <div className={styles.loading}>
      <ProjectsHeaderSkeleton />
      <LinearProgress label={t.work.loadingProjects} />
      <ProjectGridSkeleton className={styles.loading__grid} />
    </div>
  );
};

export default ProjectListSkeleton;
