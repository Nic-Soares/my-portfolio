import type { ReactNode } from "react";
import styles from "./NavigationRail.module.css";

interface NavigationRailProps {
  children: ReactNode;
  className?: string;
}

export default function NavigationRail({
  children,
  className,
}: NavigationRailProps) {
  return (
    <div className={`${styles["nav-rail"]} ${className || ""}`}>{children}</div>
  );
}
