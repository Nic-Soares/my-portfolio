import Shape from "@/components/decor/Shape/Shape.tsx";
import type { ShapeName } from "@/components/decor/Shape/shapePaths.ts";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import type { LineBudget } from "@/hooks/useFitLines.ts";
import { useFitText } from "@/hooks/useFitText.ts";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  title: string;
  description: string;
  tone: "secondary" | "tertiary"; // container color role
  mediaSide: "start" | "end"; // where the illustration sits on wide layouts
  shapes: [ShapeName, ShapeName, ShapeName];
  descriptionLines: LineBudget; // lines the English description uses
}

// Figma "ServiceCard": illustration and copy side by side (stacked on
// Compact, illustration on top), on a Secondary or Tertiary Container
const ServiceCard = ({
  title,
  description,
  tone,
  mediaSide,
  shapes,
  descriptionLines,
}: ServiceCardProps) => {
  const sizeClass = useSizeClass();
  // The cards share a fixed height on desktop: long copy shrinks to fit
  const contentRef = useFitText<HTMLDivElement>();
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
      <div ref={contentRef} className={`fit-text ${styles.content}`}>
        <FitLines as="h2" lines={1} className={`${titleStyle} ${styles.title}`}>
          {title}
        </FitLines>
        <FitLines
          lines={descriptionLines}
          className={`body-large ${styles.description}`}
        >
          {description}
        </FitLines>
      </div>
    </article>
  );
};

export default ServiceCard;
