import styles from "./ProjectDetailHero.module.css";
import InfoSection from "@/features/work/components/InfoSection/InfoSection";

const WorkDetailHero = () => {
  return (
    <header>
      <div className={styles.splitAsset}>
        <InfoSection
          container_title="Detalhes do Projeto"
          container_description="Esta é uma visualização temporária do componente ProjectDetailView. Aqui serão exibidos os detalhes completos de cada projeto."
        />
        <InfoSection
          container_title="Detalhes do Projeto"
          container_description="Esta é uma visualização temporária do componente ProjectDetailView. Aqui serão exibidos os detalhes completos de cada projeto."
        />
      </div>
    </header>
  );
};

export default WorkDetailHero;
