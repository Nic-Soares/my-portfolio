import LinearProgress from "@/components/ui/LinearProgress/LinearProgress.tsx";
import ProjectGridSkeleton from "./ProjectGridSkeleton.tsx";
import styles from "./ProjectListSkeleton.module.css";
import ProjectsHeaderSkeleton from "./ProjectsHeaderSkeleton.tsx";

// Figma "Loading" screens: header skeleton, an indeterminate progress bar
// (the only part assistive tech hears) and the card grid skeleton
const ProjectListSkeleton = () => (
  <div className={styles.loading}>
    <ProjectsHeaderSkeleton />
    <LinearProgress label="Loading projects" />
    <ProjectGridSkeleton className={styles.loading__grid} />
  </div>
);

export default ProjectListSkeleton;
