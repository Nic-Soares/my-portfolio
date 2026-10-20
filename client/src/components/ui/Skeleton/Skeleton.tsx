import type { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  // Figma Shape: pill for text, chips and search; rect for media
  shape?: "pill" | "rect";
  // Figma Tone: high for most blocks, highest for titles
  tone?: "high" | "highest";
  width?: number | string;
  height?: number | string;
  className?: string;
}

// Figma "Skeleton": a loading placeholder block. Decorative; the page's
// LinearProgress is what announces the loading.
const Skeleton = ({
  shape = "pill",
  tone = "high",
  width,
  height,
  className,
}: SkeletonProps) => (
  <div
    className={[
      styles.skeleton,
      styles[`skeleton--${shape}`],
      styles[`skeleton--${tone}`],
      className ?? "",
    ].join(" ")}
    style={{ width, height } as CSSProperties}
    aria-hidden="true"
  />
);

export default Skeleton;
