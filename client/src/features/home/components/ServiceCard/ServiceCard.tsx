import Shape from "@/components/decor/Shape/Shape.tsx";
import type { ShapeName } from "@/components/decor/Shape/shapePaths.ts";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  tone: "secondary" | "tertiary"; // container color role
  mediaSide: "start" | "end"; // where the illustration sits on wide layouts
  shapes: [ShapeName, ShapeName, ShapeName];
}

// Figma "ServiceCard": illustration and copy side by side (stacked on
// Compact, illustration on top), on a Secondary or Tertiary Container
const ServiceCard = ({
  title,
  description,
  tone,
  mediaSide,
  shapes,
}: ServiceCardProps) => {
  const sizeClass = useSizeClass();
  // Figma 1512 frame: Body Large Plus title on desktop; Title Large
  // Emphasized below. The description is Body Large everywhere.
  const desktop = sizeClass === "large" || sizeClass === "extra-large";
  const titleStyle = desktop ? "body-large-plus" : "title-large-emphasized";

  return (
    <article
      className={[
        styles.card,
        styles[`card--${tone}`],
        styles[`card--media-${mediaSide}`],
      ].join(" ")}
    >
      {/* Illustration: three Shape Set shapes in the card's color role */}
      <div className={styles.media} aria-hidden="true">
        {shapes.map((shape, index) => (
          <Shape
            // Fixed three-slot composition
            // biome-ignore lint/suspicious/noArrayIndexKey: positional slots
            key={index}
            shape={shape}
            color={tone}
            className={styles[`shape${index + 1}`]}
          />
        ))}
      </div>
      <div className={styles.content}>
        <h2 className={`${titleStyle} ${styles.title}`}>{title}</h2>
        <p className={`body-large ${styles.description}`}>{description}</p>
      </div>
    </article>
  );
};

export default ServiceCard;
