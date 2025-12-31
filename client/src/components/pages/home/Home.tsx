import HeroSection from "./HeroSection";
import ExperienceSection from "./ExperienceSection";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles['home__hero-section']}>
        <HeroSection/>
      </div>
      <div className={styles['home__experience']}>
        <ExperienceSection />
      </div>
      <div className={styles['home__carousel']}>
        <ProjectCarousel />
      </div>
    </div>
  );
}

export default Home;
