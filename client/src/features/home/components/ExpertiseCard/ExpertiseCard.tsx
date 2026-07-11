import styles from "./ExpertiseCard.module.css";
import Container from "@/components/layout/Container/Container";

interface Expertise {
  icon: string;
  title: string;
  description: string;
}

interface ExpertiseCardProps {
  expertise: Expertise;
}

const ExpertiseCard = ({ expertise }: ExpertiseCardProps) => {
  return (
    <Container
      className={styles["expertise-card"]}
      backgroundColor="var(--md-sys-color-secondary-container)"
      borderRadius="12px"
    >
      <div className={styles["expertise-card__header"]}>
        <span
          className={`material-symbols-outlined ${styles["expertise-card__icon"]}`}
        >
          {expertise.icon}
        </span>
        <h3 className={styles["expertise-card__title"]}>{expertise.title}</h3>
      </div>
      <p className={styles["expertise-card__description"]}>
        {expertise.description}
      </p>
    </Container>
  );
};

export default ExpertiseCard;
