import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import SearchBar from "@/components/ui/SearchBar/SearchBar.tsx";
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
    const areas = indices.filter((i) => i > 0).map((i) => shown[i - 1].area);
    onAreasChange(allTurnedOn ? [] : areas);
  };

  return (
    <header className={styles["projects__header"]}>
      <h1 className={styles["projects__title"]}>Projects</h1>
      <div className={styles["projects__actions"]}>
        <div className={styles["projects__button-group"]}>
          <ConnectedButtonGroup
            options={options}
            selectionMode="multiple"
            selectedIndices={selectedIndices}
            onSelectedIndicesChange={handleChange}
          />
        </div>
        <div className={styles["projects__search-bar"]}>
          <SearchBar
            placeholder="Search projects"
            value={query}
            onChange={onQueryChange}
          />
        </div>
      </div>
    </header>
  );
};

export default ProjectListHero;
