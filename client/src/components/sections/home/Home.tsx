import HeroSection from "./HeroSection"
import ExperienceSection from "./ExperienceSection";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>

      <HeroSection/>

      <div className={styles.main_content}>
        <ExperienceSection/>
        <ProjectCarousel/>
      </div>
    </div>
  );
}

export default Home;
