import React from "react";
import WorkDetailHero from "../components/WorkDetailHero";
import WorkMeta from "../components/WorkMeta/WorkMeta";
import styles from "./WorkDetail.page.module.css";
import NotFound from "@/app/pages/NotFound/NotFound";


interface WorkDetailProps {
  projectId?: string | null;
}

const WorkDetailPage: React.FC<WorkDetailProps> = ({ projectId }) => {
  if (!projectId) return <NotFound />;

  /* sectionOptions removed — not used */

  return (
    <main className={styles["page-content"]}>
      <div className={styles["landing-page"]}>
        <WorkDetailHero />
        <nav className="article-tab-list">
          <div className="navigation-container">
            <div className={styles["tabbed-navigation"]}>
              <div className={styles["tab"]}></div>
            </div>
          </div>
        </nav>

        <div className={styles["content-conteiner"]}>
          <WorkMeta
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

export default WorkDetailPage;
