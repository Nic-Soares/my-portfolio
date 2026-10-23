import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "@/app/pages/NotFound/NotFound.tsx";
import Footer from "@/components/layout/Footer/Footer.tsx";
import TabbedNavigation from "@/components/layout/navigation/TabbedNavigation/TabbedNavigation.tsx";
import {
  BlockRenderer,
  ContentLayout,
  ProjectPager,
  SummaryNav,
} from "../../components/ProjectDetail/index.ts";
import ProjectDetailHero from "../../components/ProjectDetail/ProjectDetailHero/ProjectDetailHero.tsx";
import ProjectIntro from "../../components/ProjectDetail/ProjectIntro/ProjectIntro.tsx";
import type { ContentBlock } from "../../data/project-data.types.ts";
import { adjacentProjects, useProjects } from "../../hooks/useProjectData.ts";
import { useProjectDetail } from "./hooks/useProjectDetail.ts";
import styles from "./ProjectDetail.page.module.css";

// Keyed by slug: moving to another project (the pager) starts fresh, on its
// first tab and at the top of the page
const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ProjectDetail key={slug} slug={slug ?? ""} />;
};

const ProjectDetail = ({ slug }: { slug: string }) => {
  const projects = useProjects();

  // biome-ignore lint/correctness/useExhaustiveDependencies: runs once per project (the component is keyed by slug)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { project, selectedTabId, setSelectedTabId, currentTab, tabItems } =
    useProjectDetail(slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className={styles["page-content"]}>
      <div className={styles["content-conteiner"]}>
        <div className={styles["article-page"]}>
          {/* The site shell is the <main> landmark */}
          <div className={styles["main-content"]}>
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
              {currentTab.content.map((block: ContentBlock, index: number) =>
                // The intro needs the project's facts, which blocks don't see
                block.type === "intro" ? (
                  <ProjectIntro
                    key={index}
                    id={block.id}
                    facts={project.facts ?? []}
                    text={block.text}
                  />
                ) : (
                  <BlockRenderer key={index} block={block} />
                ),
              )}
            </ContentLayout>

            <ProjectPager {...adjacentProjects(projects, project.slug)} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
