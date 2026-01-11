import React from "react";
import ProjectDetailHero from "./ProjectDetailHero";
import { ProjectMeta } from "@/components/common/project-meta/ProjectMeta";
import styles from "./ProjectDetail.module.css";
import NotFound from "@/components/pages/not-found/NotFound";

interface ProjectDetailProps {
  projectId: string | null;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  if (!projectId) return <NotFound />;

  const sectionOptions = [
    { label: "Intro" },
    { label: "Desafio" },
    { label: "Visual" },
    { label: "Construção" },
    { label: "Técnico" },
  ];

  return (
    <main className={styles["page-content"]}>
      <div className={styles["landing-page"]}>
        <ProjectDetailHero />
        <nav className="article-tab-list">
          <div className="navigation-container">
            <div className={styles["tabbed-navigation"]}>
              <div className={styles["tab"]}></div>
            </div>
          </div>
        </nav>

        <div className={styles["content-conteiner"]}>
          <ProjectMeta
            category="Frontend"
            year="2024"
            role="Lead Developer"
            client={projectId}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            techStack={["React", "TypeScript", "Vite", "CSS Modules"]}
          />
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;
