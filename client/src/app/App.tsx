import { useState } from "react";
import "../styles/global.css";
import "../styles/normalize.css";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import { HomePage as Home } from "@/features/home";

// Updated imports
import { WorkListPage, WorkDetailPage } from "@/features/work";

/**
 * Local PageType for the app (co-located in this file to avoid cross-module shared types)
 * Keeps the app self-contained while in early development.
 */
type PageType = "Home" | "Projects" | "ProjectDetail";

function App() {
  const [activePage, setActivePage] = useState<PageType>("Home");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePage("ProjectDetail");
  };

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Projects":
        return <WorkListPage onProjectSelect={handleProjectSelect} />;
      case "ProjectDetail":
        return <WorkDetailPage projectId={selectedProjectId} />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      {renderContent()}
    </>
  );
}

export default App;
