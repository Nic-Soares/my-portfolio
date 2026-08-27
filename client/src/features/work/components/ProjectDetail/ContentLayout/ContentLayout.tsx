// components/layout/ContentLayout.tsx
import type { ReactNode } from "react";
import styles from "./ContentLayout.module.css";

interface ContentLayoutProps {
  children: ReactNode; // Main content: text, code, and images.
  rightSidebar: ReactNode; // Content displayed in the right-hand summary column.
}

export const ContentLayout = ({
  children,
  rightSidebar,
}: ContentLayoutProps) => {
  return (
    <div className={styles["content-container"]}>
      {rightSidebar}
      <div className={styles["carbon-container"]}>
        <div className={styles["carbon-component"]}>
          <article>{children}</article>
        </div>
      </div>
    </div>
  );
};
