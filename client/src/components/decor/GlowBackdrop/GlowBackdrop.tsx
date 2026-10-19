import type { CSSProperties } from "react";
import type { ShapeColor } from "../Shape/Shape.tsx";
import styles from "./GlowBackdrop.module.css";

interface GlowBackdropProps {
  color: ShapeColor;
  opacity?: number;
  className?: string; // the parent places and sizes the glow
  style?: CSSProperties;
}

// Figma "Glow": an ellipse on a solid token with Layer Blur. The blur stays
// on a solid color because gradient stops can't hold tokens (dark mode).
const GlowBackdrop = ({
  color,
  opacity = 1,
  className = "",
  style,
}: GlowBackdropProps) => (
  <div
    className={`${styles.glow} ${className}`.trim()}
    style={{
      background: `var(--md-sys-color-${color})`,
      opacity,
      ...style,
    }}
  />
);

export default GlowBackdrop;
