import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetailHero from "../../components/ProjectDetail/ProjectDetailHero/ProjectDetailHero.tsx";
import styles from "./ProjectDetail.page.module.css";
import NotFound from "@/app/pages/NotFound/NotFound.tsx";
import TabbedNavigation from "@/components/layout/navigation/TabbedNavigation/TabbedNavigation.tsx";
import {
  BlockRenderer,
  ContentLayout,
  SummaryNav,
} from "../../components/ProjectDetail/index.ts";
import { useProjectDetail } from "./hooks/useProjectDetail.ts";
import type { ContentBlock } from "../../data/project-data.types.ts";

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { project, selectedTabId, setSelectedTabId, currentTab, tabItems } =
    useProjectDetail(slug);

  if (!project) {
    return <NotFound />;
  }

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
                  title={currentTab.title}
                  items={currentTab.sidebarItems || []}
                />
              }
            >
              {currentTab.content.map((block: ContentBlock, index: number) => (
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
