import HeroSection from "./HeroSection"
import CollaborateSection from "./CollaborateSection";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>

      <HeroSection/>

      <div className={styles.main_content}>
        <CollaborateSection/>
        <ProjectCarousel/>
      </div>
    </div>
  );
}

export default Home;
