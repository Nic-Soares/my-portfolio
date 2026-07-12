import { useState } from "react";
import { useProjectData } from "../../../hooks/useProjectData.ts";
import type { ProjectTab } from "../../../data/project-data.types.ts";

/**
 * Hook: useProjectDetail
 *
 * Normalizes names and shapes expected by the page component:
 * - selectedTabId / setSelectedTabId
 * - currentTab
 * - tabItems
 *
 * Accepts a projectSlug and returns the project and tab navigation state.
 */
export const useProjectDetail = (projectSlug: string | undefined) => {
  // Find the project from the aggregated projects data
  const { getProjectBySlug } = useProjectData();
  const project = getProjectBySlug(projectSlug as string);

  // Initial selected tab (first tab of the project, if any)
  const initialTabId = project?.tabs[0]?.id;

  // State: which tab is currently selected
  const [selectedTabId, setSelectedTabId] = useState<string | undefined>(
    initialTabId,
  );

  // Guard clause: if project not found, return a consistent empty shape
  if (!project) {
    return {
      project: null,
      selectedTabId: undefined,
      setSelectedTabId,
      currentTab: null,
      tabItems: [],
    };
  }

  // Determine current tab (fallback to the first tab if selectedTabId is missing)
  const currentTab: ProjectTab =
    project.tabs.find((tab) => tab.id === selectedTabId) || project.tabs[0];

  // Prepare items for the tab navigation UI
  const tabItems = project.tabs.map((tab) => ({
    id: tab.id,
    label: tab.title,
    visible: true,
  }));

  return {
    project,
    selectedTabId,
    setSelectedTabId,
    currentTab,
    tabItems,
  };
};
