import GlowBackdrop from "../GlowBackdrop/GlowBackdrop.tsx";
import Shape from "../Shape/Shape.tsx";
import styles from "./HeroDecor.module.css";

interface HeroDecorProps {
  // Each Figma hero hand-tunes its own geometry
  variant?: "home" | "about";
}

// Figma "HeroDecor": fills the hero (which clips it) behind the content.
// Two blurred glows, a Very sunny accent in the corner and an outline ring;
// the About hero adds a small circle and pill by the copy.
const HeroDecor = ({ variant = "home" }: HeroDecorProps) => {
  const about = variant === "about";

  return (
    <div
      className={`${styles.decor} ${about ? styles["decor--about"] : ""}`}
      aria-hidden="true"
    >
      <GlowBackdrop
        color="primary-container"
        opacity={about ? 0.85 : 0.8}
        className={styles.glowPrimary}
      />
      <GlowBackdrop
        color="tertiary-container"
        opacity={about ? 0.5 : 0.45}
        className={styles.glowTertiary}
      />
      <Shape shape="very-sunny" className={styles.accent} />
      <div className={styles.ring} />
      {about && (
        <>
          <div className={styles.dot} />
          <Shape
            shape="pill"
            color="tertiary-container"
            className={styles.pill}
          />
        </>
      )}
    </div>
  );
};

export default HeroDecor;
