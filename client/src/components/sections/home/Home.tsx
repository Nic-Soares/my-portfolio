import HeroSection from "./HeroSection"
import ExperienceSection from "./ExperienceSection";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>

      <HeroSection className={styles.heroSection}/>
      <ExperienceSection className={styles.experienceSection}/>
      <ProjectCarousel className={styles.projectCarousel}/>

    </div>
  );
}

export default Home;
