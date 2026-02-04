import React from "react";
import ProjectMetadata from "../../project-metadata/ProjectMetadata";

interface OverviewTabProps {
  projectId: string;
}

/**
 * OverviewTab
 *
 * Small wrapper that prepares and passes the metadata for the Overview tab.
 * Keeps the tab content isolated so WorkDetail.page can stay focused on layout.
 */
const OverviewTab: React.FC<OverviewTabProps> = ({ projectId }) => {
  return (
    <ProjectMetadata
      category="Frontend"
      year="2024"
      role="Lead Developer"
      client={projectId}
      description="Lorem ipsum..."
      techStack={["React", "TypeScript", "Vite", "CSS Modules"]}
    />
  );
};

export default OverviewTab;
