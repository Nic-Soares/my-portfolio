import StateIllustration from "@/components/layout/StateLayout/StateIllustration.tsx";
import StateLayout from "@/components/layout/StateLayout/StateLayout.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";

interface NoProjectsFoundProps {
  onClearFilters: () => void;
}

// Figma "Projects — No results": the empty state in place of the card grid,
// under the header so the filters stay at hand
const NoProjectsFound = ({ onClearFilters }: NoProjectsFoundProps) => {
  const { t } = useI18n();
  return (
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
      headline={t.work.noProjects}
      supportingText={t.work.noProjectsText}
      actions={[{ label: t.work.clearFilters, onClick: onClearFilters }]}
    />
  );
};

export default NoProjectsFound;
