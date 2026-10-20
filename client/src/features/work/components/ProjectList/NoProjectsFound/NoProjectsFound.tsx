import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";

interface NoProjectsFoundProps {
  onClearFilters: () => void;
}

// Figma "Projects — No results": the empty state in place of the card grid,
// under the header so the filters stay at hand
const NoProjectsFound = ({ onClearFilters }: NoProjectsFoundProps) => (
  <StateLayout
    inline
    headingLevel="h2"
    illustration={
      <StateIllustration
        shape="12-sided-cookie"
        color="surface-container-high"
        decor={[
          {
            shape: "4-sided-cookie",
            color: "secondary-container",
            x: 268,
            y: -12,
            size: 88,
          },
          {
            shape: "circle",
            color: "tertiary-container",
            x: -18,
            y: 272,
            size: 58,
          },
        ]}
        mark={<span className="material-symbols-outlined">search</span>}
        markColor="on-surface-variant"
      />
    }
    headline="No projects found"
    supportingText="We couldn't find any projects with these filters. Try another combination or clear the search."
    actions={[{ label: "Clear filters", onClick: onClearFilters }]}
  />
);

export default NoProjectsFound;
