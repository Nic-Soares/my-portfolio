// components/layout/ContentLayout.tsx
import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;      // O conteúdo principal (Texto, código, imagens)
  rightSidebar: ReactNode;  // O que vai na coluna da direita (Sumário)
}

export const ContentLayout = ({ children, rightSidebar }: ContentLayoutProps) => {
  return (
    <div className="layout-container"> {/* Grid principal */}
      
      {/* 1. Coluna Principal (Esquerda/Centro) */}
      <main className="main-content">
        <div className="carbon-component">
          {children}
        </div>
      </main>

      {/* 2. Coluna Lateral (Direita) */}
      <aside className="right-sidebar">
        <div className="sticky-wrapper">
          {rightSidebar}
        </div>
      </aside>

    </div>
  );
};