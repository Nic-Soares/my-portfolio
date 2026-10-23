import { Suspense } from "react";
import HeroSection from "../components/HeroSection.tsx";
import ProjectCarousel from "../components/ProjectCarousel.tsx";
import ServicesStack from "../components/ServicesStack.tsx";
import styles from "./Home.page.module.css";

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles["home__hero-section"]}>
        <HeroSection />
      </div>
      <div className={styles.home__experience}>
        <ServicesStack />
      </div>
      <div className={styles.home__carousel}>
        {/* The carousel's cell keeps its size while the projects load */}
        <Suspense fallback={null}>
          <ProjectCarousel />
        </Suspense>
      </div>
    </div>
  );
}

export default HomePage;
