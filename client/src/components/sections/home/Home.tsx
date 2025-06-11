import HeroSection from "./HeroSection"
import CollaborateSection from "./CollaborateSection";
import TestimonialSection from "./TestimonialSection";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <HeroSection/>

      <div className={styles.main_content}>
        <CollaborateSection/>
        <TestimonialSection/>
      </div>
    </>
  );
}

export default Home;
