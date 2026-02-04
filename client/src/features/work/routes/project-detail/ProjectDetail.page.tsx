import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetailHero from "../../components/project-detail/project-detail-hero/ProjectDetailHero";
import styles from "./ProjectDetail.page.module.css";
import NotFound from "@/app/pages/NotFound/NotFound";
import TabbedNavigation from "@/components/layout/navigation/tabbed-navigation/TabbedNavigation";
import { BlockRenderer } from "../../components/project-detail/block-render/BlockRender";
import { projectsData } from "../../data/projects.data";

const ContentLayout: React.FC<{
  rightSidebar?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ rightSidebar, children }) => {
  return (
    <div className={styles.contentLayout}>
      <div className={styles.contentMain}>{children}</div>
      {rightSidebar && (
        <aside className={styles.contentAside}>{rightSidebar}</aside>
      )}
    </div>
  );
};

const SummaryNav: React.FC<{
  title?: string;
  items?: { label: string; anchorId: string }[];
}> = ({ title, items }) => (
  <nav className={styles.summaryNav}>
    {title && <h4>{title}</h4>}
    <ul>
      {(items || []).map((it, i) => (
        <li key={i}>
          <a href={`#${it.anchorId}`}>{it.label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = projectsData.find((p) => p.slug === slug);

  const [selectedTabId, setSelectedTabId] = useState<string | undefined>(
    project?.tabs[0]?.id,
  );

  if (!project) {
    return <NotFound />;
  }

  const currentTab =
    project.tabs.find((tab) => tab.id === selectedTabId) || project.tabs[0];

  const tabItems = project.tabs.map((tab) => ({
    id: tab.id,
    label: tab.title,
    visible: true,
  }));

  return (
    <div
      className={`${styles["page-content"]} ${styles["page-content-height"]}`}
    >
      <div className={styles["content-conteiner"]}>
        <div className={styles["article-page"]}>
          <main className={styles["main-content"]}>
            <ProjectDetailHero
              title={project.name}
              description={project.description}
              hero={project.hero}
            />

            <TabbedNavigation
              buttonStyle="text"
              tabs={tabItems}
              selectedId={selectedTabId}
              onSelect={setSelectedTabId}
            />

            <ContentLayout
              rightSidebar={
                <SummaryNav
                  title="Nesta página"
                  items={currentTab.sidebarItems}
                />
              }
            >
              {currentTab.content.map((block, index) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </ContentLayout>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
