// components/layout/ContentLayout.tsx
import { ReactNode } from 'react';
import styles from './ContentLayout.module.css'

interface ContentLayoutProps {
  children: ReactNode;      // O conteúdo principal (Texto, código, imagens)
  rightSidebar: ReactNode;  // O que vai na coluna da direita (Sumário)
}

export const ContentLayout = ({ children, rightSidebar }: ContentLayoutProps) => {
  return (
    <div className={styles["content-container"]}> {/* Grid principal */}
      
      <main className={styles["carbon-container"]}>
        <div className={styles["carbon-component"]}>
          <article>
            {children}
          </article>
        </div>
      </main>

      <aside className={styles["right-sidebar"]}>
        <div className={styles["sticky-wrapper"]}>
          {rightSidebar}
        </div>
      </aside>

    </div>
  );
};