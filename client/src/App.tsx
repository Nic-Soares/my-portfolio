import { useState } from "react";
import "./style/global.css";
import "./style/normalize.css";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import Home from "@/components/pages/home/Home";
import UnderConstruction from "@/components/pages/under-construction/UnderConstruction";

// Updated imports
import ProjectDetail from "./components/pages/projects/ProjectDetail";
import ProjectsList from "@/components/pages/projects/ProjectsList";
import type { PageType } from "@shared/types/types";

function App() {
  const [activePage, setActivePage] = useState<PageType>("Home");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActivePage("ProjectDetail");
  };

  const renderContent = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Projects":
        return <ProjectsList onProjectSelect={handleProjectSelect} />;
      case "ProjectDetail":
        return <ProjectDetail projectId={selectedProjectId} />;
      case "Services":
        return <UnderConstruction />;
      case "About me":
        return <UnderConstruction />;
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
