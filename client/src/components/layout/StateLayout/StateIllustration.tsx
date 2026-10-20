import type { CSSProperties, ReactNode } from "react";
import Shape, { type ShapeColor } from "@/components/decor/Shape/Shape.tsx";
import type { ShapeName } from "@/components/decor/Shape/shapePaths.ts";
import styles from "./StateIllustration.module.css";

// Geometry in Figma px on the 340 box; the CSS turns it into percentages
// so the whole illustration scales with the box (340 / 260 / 200)
export interface StateDecor {
  shape: ShapeName;
  color: ShapeColor;
  x: number;
  y: number;
  size: number;
}

interface StateIllustrationProps {
  shape: ShapeName;
  color: ShapeColor;
  // Small shapes off the top-right and bottom-left corners
  decor: [StateDecor, StateDecor];
  // Centered over the main shape: a numeral, a glyph or an icon
  mark?: ReactNode;
  markColor?: `on-${string}`; // scheme role, e.g. "on-primary-container"
}

const StateIllustration = ({
  shape,
  color,
  decor,
  mark,
  markColor = "on-primary-container",
}: StateIllustrationProps) => (
  <div className={styles.illustration} aria-hidden="true">
    <Shape shape={shape} color={color} />
    {decor.map((d) => (
      <Shape
        key={`${d.shape}-${d.x}-${d.y}`}
        shape={d.shape}
        color={d.color}
        className={styles.illustration__decor}
        style={
          {
            "--decor-x": d.x,
            "--decor-y": d.y,
            "--decor-size": d.size,
          } as CSSProperties
        }
      />
    ))}
    {mark && (
      <div
        className={styles.illustration__mark}
        style={
          {
            "--state-mark-color": `var(--md-sys-color-${markColor})`,
          } as CSSProperties
        }
      >
        {mark}
      </div>
    )}
  </div>
);

export default StateIllustration;
