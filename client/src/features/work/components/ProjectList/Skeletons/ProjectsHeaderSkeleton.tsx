import Skeleton from "@/components/ui/Skeleton/Skeleton.tsx";
import styles from "./ProjectsHeaderSkeleton.module.css";

// Figma "Header Skeleton": title, filter chips and search (Large), fewer
// chips and no search below Large
const ProjectsHeaderSkeleton = () => (
  <div className={styles.header} aria-hidden="true">
    <Skeleton tone="highest" className={styles.header__title} />
    <div className={styles.header__filters}>
      {[0, 1, 2, 3, 4].map((index) => (
        <Skeleton
          key={index}
          className={`${styles.header__chip} ${index >= 3 ? styles["header__chip--large-only"] : ""} ${index === 2 ? styles["header__chip--medium-up"] : ""}`}
        />
      ))}
      <Skeleton className={styles.header__search} />
    </div>
  </div>
);

export default ProjectsHeaderSkeleton;
