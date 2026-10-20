import Skeleton from "@/components/ui/Skeleton/Skeleton.tsx";
import styles from "./ProjectCardSkeleton.module.css";

// Figma "Card Skeleton" (Size = Large / Medium / Compact by breakpoint):
// thumbnail, tag row, title and date. Fills its grid column like the card.
const ProjectCardSkeleton = () => (
  <div className={styles.card} aria-hidden="true">
    <Skeleton shape="rect" className={styles.card__thumbnail} />
    <div className={styles.card__content}>
      <div className={styles.card__tags}>
        <Skeleton tone="highest" className={styles.card__tag} />
        <Skeleton tone="highest" className={styles.card__tag} />
        <Skeleton tone="highest" className={styles.card__tag} />
        <Skeleton
          tone="highest"
          className={`${styles.card__tag} ${styles["card__tag--large-only"]}`}
        />
      </div>
      <Skeleton tone="highest" className={styles.card__title} />
      <Skeleton className={styles.card__date} />
    </div>
  </div>
);

export default ProjectCardSkeleton;
