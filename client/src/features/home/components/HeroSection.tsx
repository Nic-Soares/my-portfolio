import Container from "@/components/layout/Container/Container.tsx";
import styles from "./HeroSection.module.css";
import IconButton from "@/components/ui/IconButton/IconButton.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import GithubIcon from "@/components/ui/GithubIcon/GithubIcon.tsx";

const HeroSection = () => {
  return (
    <Container borderRadius="20px" className={styles["hero-section"]}>
      <div className={styles["hero-section__content"]}>
        <div className={styles["hero-section__text-content"]}>
          <h4 className="headline-small-emphasized text-on-surface">
            Hello There!
          </h4>
          <p className="display-medium text-on-surface">
            I'm <span>Nicolas Soares</span>, <br /> I turn data into visual
            experiences that drive smart decisions.
          </p>
        </div>
        <div className={styles["hero-section__actions"]}>
          <Button size="large" type="square" style="tonal" label="About me" />
          <Button
            size="large"
            type="square"
            style="filled"
            label="See My Projects"
          />
        </div>
      </div>

      <div className={styles["hero-section__image-container"]}>
        <div className={styles["hero-section__clover-border"]}></div>
      </div>

      <div className={styles["hero-section__social-links"]}>
        <IconButton width="narrow" type="round" size="medium" style="filled">
          <GithubIcon />
        </IconButton>

        <IconButton
          width="narrow"
          type="round"
          size="medium"
          style="tonal"
          icon="mail"
        />
        <IconButton
          width="narrow"
          type="round"
          size="medium"
          style="outline"
          icon="description"
        />
        <IconButton
          width="narrow"
          type="round"
          size="medium"
          style="standard"
          icon="description"
        />
      </div>
    </Container>
  );
};

export default HeroSection;
