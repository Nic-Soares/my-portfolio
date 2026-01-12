import ConnectedButtonGroup from "@/components/ui/ConnectedButtonGroup/ConnectedButtonGroup";
import styles from "./ProjectsListHero.module.css";
import SearchBar from "@/components/ui/SearchBar/SearchBar";

const options = [
  { label: "Todos" },
  { label: "Favoritos" },
  { label: "Recentes", disabled: true },
  { label: "Arquivados" },
];

const ProjectsListHero = () => {
  return (
    <header className={styles["projects__header"]}>
      <h1 className={styles["projects__title"]}>Projects</h1>
      <div className={styles["projects__actions"]}>
        <div className={styles["projects__button-group"]}>
          <ConnectedButtonGroup options={options} />
        </div>
        <div className={styles["projects__search-bar"]}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default ProjectsListHero;
