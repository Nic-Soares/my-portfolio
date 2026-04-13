// components/layout/ContentLayout.tsx
import { ReactNode } from "react";
import styles from "./ContentLayout.module.css";

interface ContentLayoutProps {
  children: ReactNode; // O conteúdo principal (Texto, código, imagens)
  rightSidebar: ReactNode; // O que vai na coluna da direita (Sumário)
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
