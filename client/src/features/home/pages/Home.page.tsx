import HeroSection from "../components/HeroSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectCarousel from "../components/ProjectCarousel";
import styles from "./Home.page.module.css";

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles["home__hero-section"]}>
        <HeroSection />
      </div>
      <div className={styles["home__experience"]}>
        <ExperienceSection />
      </div>
      <div className={styles["home__carousel"]}>
        <ProjectCarousel />
      </div>
    </div>
  );
}

export default HomePage;
