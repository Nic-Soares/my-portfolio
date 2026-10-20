import { useState } from "react";
import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import SearchBar from "@/components/ui/SearchBar/SearchBar.tsx";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import type { WorkArea } from "../../../data/project-data.types.ts";
import styles from "./ProjectListHero.module.css";

interface ProjectListHeroProps {
  total: number;
  areas: { area: WorkArea; count: number }[];
  selectedAreas: WorkArea[];
  onAreasChange: (areas: WorkArea[]) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

// Below Large the header shows one tool at a time (Figma Projects 744/402):
// "selector" (Filter / Search buttons), then the search or the filter with
// a back button
type Mode = "selector" | "search" | "filter";

// Projects header: title, the area filter ("All" + areas with their
// counts; the group shows up to 5 segments; several areas can be on, and
// "All" clears them) and the search
const ProjectListHero = ({
  total,
  areas,
  selectedAreas,
  onAreasChange,
  query,
  onQueryChange,
}: ProjectListHeroProps) => {
  const sizeClass = useSizeClass();
  const desktop = sizeClass === "large" || sizeClass === "extra-large";
  const compact = sizeClass === "compact";
  const [mode, setMode] = useState<Mode>("selector");

  const shown = areas.slice(0, 4);
  const options = [
    { label: `All · ${total}` },
    ...shown.map((entry) => ({ label: `${entry.area} · ${entry.count}` })),
  ];
  const selectedIndices = selectedAreas.length
    ? shown
        .map((entry, i) => (selectedAreas.includes(entry.area) ? i + 1 : -1))
        .filter((i) => i > 0)
    : [0];

  const handleChange = (indices: number[]) => {
    // Turning "All" on (or everything off) clears the areas
    const allTurnedOn = indices.includes(0) && !selectedIndices.includes(0);
    const next = indices.filter((i) => i > 0).map((i) => shown[i - 1].area);
    onAreasChange(allTurnedOn ? [] : next);
  };

  const filter = (
    <ConnectedButtonGroup
      options={options}
      selectionMode="multiple"
      selectedIndices={selectedIndices}
      onSelectedIndicesChange={handleChange}
    />
  );

  const search = (autoFocus: boolean) => (
    <SearchBar
      placeholder="Search projects"
      value={query}
      onChange={onQueryChange}
      autoFocus={autoFocus}
    />
  );

  if (desktop) {
    return (
      <header className={styles["projects__header"]}>
        <h1 className={styles["projects__title"]}>Projects</h1>
        <div className={styles["projects__actions"]}>
          <div className={styles["projects__button-group"]}>{filter}</div>
          <div className={styles["projects__search-bar"]}>{search(false)}</div>
        </div>
      </header>
    );
  }

  // Figma: tonal back button on Medium, outline on Compact
  const back = (
    <IconButton
      size="small"
      style={compact ? "outline" : "tonal"}
      icon="arrow_back"
      ariaLabel={mode === "search" ? "Close search" : "Close filter"}
      onClick={() => setMode("selector")}
    />
  );
  const active = selectedAreas.length + (query.trim() ? 1 : 0);

  return (
    <header
      className={`${styles["projects__header"]} ${styles["projects__header--bar"]}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && mode !== "selector") setMode("selector");
      }}
    >
      <div className={styles["projects__row"]}>
        <h1 className={styles["projects__title"]}>Projects</h1>

        {mode === "selector" && (
          <ConnectedButtonGroup
            className={styles["projects__selector"]}
            options={[
              {
                label:
                  active && !query.trim() ? `Filter · ${active}` : "Filter",
                icon: "filter_list",
              },
              { label: query.trim() ? "Search · 1" : "Search", icon: "search" },
            ]}
            selectedIndex={-1}
            onSelectionChange={(index) =>
              setMode(index === 0 ? "filter" : "search")
            }
          />
        )}

        {mode === "filter" && (
          <div className={styles["projects__tool"]}>
            {back}
            {/* Figma "Filter chips carousel": scrolls sideways if needed */}
            <div className={styles["projects__carousel"]}>{filter}</div>
          </div>
        )}

        {mode === "search" && !compact && (
          <div className={styles["projects__tool"]}>
            {back}
            <div className={styles["projects__grow"]}>{search(true)}</div>
          </div>
        )}

        {mode === "search" && compact && back}
      </div>

      {/* Compact: the search bar takes its own full-width row */}
      {mode === "search" && compact && search(true)}
    </header>
  );
};

export default ProjectListHero;
