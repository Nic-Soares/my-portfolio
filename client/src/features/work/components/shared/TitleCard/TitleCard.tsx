import Container from "@/components/layout/container/Container.tsx";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import { useFitText } from "@/hooks/useFitText.ts";
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
  // The hero panel has a fixed height: a long title or description shrinks
  const wrapperRef = useFitText<HTMLDivElement>();
  const sizeClass =
    size === "md" ? styles.sizeMd : size === "sm" ? styles.sizeSm : "";

  return (
    <Container
      variant="hero" // Semantically aligned with the card's purpose.
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <div
        ref={wrapperRef}
        className={`fit-text ${styles.wrapper} ${sizeClass}`}
      >
        {date && <span className={styles.date}>{date}</span>}

        <div className={styles.titleGroup}>
          <FitLines as="h1" lines={2} className={styles.title}>
            {title}
          </FitLines>
          {subtitle && (
            <FitLines
              lines={{ "extra-large": 2, large: 2, medium: 4, compact: 4 }}
              className={styles.description}
            >
              {subtitle}
            </FitLines>
          )}
        </div>
      </div>
    </Container>
  );
}
