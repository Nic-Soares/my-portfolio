import styles from "./Container.module.css";
import type { ReactNode, CSSProperties } from "react";

interface ContainerProps {
  /**
   * Children to be rendered inside the container.
   */
  children: ReactNode;

  /**
   * Background color for the container.
   */
  background_color?: string;

  /**
   * Border radius applied to the container.
   */
  border_radius?: string;

  /**
   * Additional CSS class names to apply to the root element.
   */
  className?: string;

  /**
   * Inline styles to apply to the root element (merged with computed containerStyle).
   */
  style?: CSSProperties;

  /**
   * Optional id for the root element.
   */
  id?: string;

  /**
   * Optional role attribute for accessibility.
   */
  role?: string;
}

export default function Container({
  children,
  background_color,
  border_radius,
  className,
  style,
  id,
  role,
}: ContainerProps) {
  const containerStyle: CSSProperties = {
    backgroundColor:
      background_color || "var(--md-sys-color-surface-container)",
    borderRadius: border_radius,
    ...(style || {}),
  };

  return (
    <section
      id={id}
      role={role}
      className={`${styles.container} ${className || ""}`}
      style={containerStyle}
    >
      {children}
    </section>
  );
}
