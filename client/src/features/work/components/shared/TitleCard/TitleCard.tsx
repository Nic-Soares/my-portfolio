import Container from "@/components/layout/container/Container.tsx";
import styles from "./TitleCard.module.css";

type TitleCardProps = {
  title: string;
  subtitle?: string;
  date?: string;
  size?: "default" | "sm" | "md";
  backgroundColor?: string;
  borderRadius?: string;
};

export default function TitleCard({
  title,
  subtitle,
  date,
  size = "default",
  backgroundColor,
  borderRadius,
}: TitleCardProps) {
  const sizeClass =
    size === "md" ? styles.sizeMd : size === "sm" ? styles.sizeSm : "";

  return (
    <Container
      variant="hero" // Semantically aligned with the card's purpose.
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <div className={`${styles.wrapper} ${sizeClass}`}>
        {date && <span className={styles.date}>{date}</span>}

        <div className={styles.titleGroup}>
          <h1>{title}</h1>
          {subtitle && <p className={styles.description}>{subtitle}</p>}
        </div>
      </div>
    </Container>
  );
}
