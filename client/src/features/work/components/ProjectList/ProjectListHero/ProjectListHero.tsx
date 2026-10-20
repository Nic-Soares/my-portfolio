import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup.tsx";
import SearchBar from "@/components/ui/SearchBar/SearchBar.tsx";
import type { WorkArea } from "../../../data/project-data.types.ts";
import styles from "./ProjectListHero.module.css";

interface ProjectListHeroProps {
  total: number;
  areas: { area: WorkArea; count: number }[];
  area: WorkArea | null;
  onAreaChange: (area: WorkArea | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

// Projects header: title, the area filter ("All" + areas with their
// counts; the group shows up to 5 segments) and the search
const ProjectListHero = ({
  total,
  areas,
  area,
  onAreaChange,
  query,
  onQueryChange,
}: ProjectListHeroProps) => {
  const shown = areas.slice(0, 4);
  const options = [
    { label: `All · ${total}` },
    ...shown.map((entry) => ({ label: `${entry.area} · ${entry.count}` })),
  ];
  const selectedIndex = area
    ? shown.findIndex((entry) => entry.area === area) + 1
    : 0;

  return (
    <header className={styles["projects__header"]}>
      <h1 className={styles["projects__title"]}>Projects</h1>
      <div className={styles["projects__actions"]}>
        <div className={styles["projects__button-group"]}>
          <ConnectedButtonGroup
            options={options}
            selectedIndex={selectedIndex}
            allowDeselect={false}
            onSelectionChange={(index) =>
              onAreaChange(index <= 0 ? null : shown[index - 1].area)
            }
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
