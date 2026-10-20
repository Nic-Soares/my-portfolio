import type { CSSProperties } from "react";
import { SHAPE_PATHS, type ShapeName } from "./shapePaths.ts";

// Scheme color roles a shape can take (`--md-sys-color-<role>`)
export type ShapeColor =
  | "primary"
  | "primary-container"
  | "secondary"
  | "secondary-container"
  | "tertiary"
  | "tertiary-container"
  | "error"
  | "error-container";

interface ShapeProps {
  shape: ShapeName;
  color?: ShapeColor;
  size?: number | string; // box side; the silhouette fills ~0.842 of it
  className?: string;
  style?: CSSProperties;
  title?: string; // accessible name; decorative (aria-hidden) without it
}

// M3 Shape Set silhouette, filled with a scheme token so it follows the theme
const Shape = ({
  shape,
  color = "primary-container",
  size = "100%",
  className,
  style,
  title,
}: ShapeProps) => (
  <svg
    viewBox="0 0 380 380"
    width={size}
    height={size}
    className={className}
    style={style}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
  >
    <path d={SHAPE_PATHS[shape]} fill={`var(--md-sys-color-${color})`} />
  </svg>
);

export default Shape;
