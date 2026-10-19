import GlowBackdrop from "../GlowBackdrop/GlowBackdrop.tsx";
import Shape from "../Shape/Shape.tsx";
import styles from "./HeroDecor.module.css";

// Figma "HeroDecor": fills the hero (which clips it) behind the content.
// Two blurred glows, a Very sunny accent in the corner and an outline ring.
const HeroDecor = () => (
  <div className={styles.decor} aria-hidden="true">
    <GlowBackdrop
      color="primary-container"
      opacity={0.8}
      className={styles.glowPrimary}
    />
    <GlowBackdrop
      color="tertiary-container"
      opacity={0.45}
      className={styles.glowTertiary}
    />
    <Shape shape="very-sunny" className={styles.accent} />
    <div className={styles.ring} />
  </div>
);

export default HeroDecor;
