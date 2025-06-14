import HeroSection from "./HeroSection"
import CollaborateSection from "./CollaborateSection";
import TestimonialSection from "./TestimonialSection";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      
      <HeroSection/>

      <div className={styles.main_content}>
        <CollaborateSection/>
        <TestimonialSection/>
      </div>
    </div>
  );
}

export default Home;
