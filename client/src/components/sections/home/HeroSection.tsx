import Container from "@/components/layout/container/Container";
import styles from "./HeroSection.module.css";
import IconButton from "@/components/common/buttons/icon-button/IconButton";
import Button from "@/components/common/buttons/button/Button";
import innerBackground from "@assets/images/inner-background.png";
import personPopout from "@assets/images/person-popout.png";

const githubIcon = (
  <svg viewBox="0 0 24 24" fill="">
    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
  </svg>
);

const HeroSection = () => {
  return (
    <Container border_radius="20px" className={styles["hero-section"]}>
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
        {/*<div
          className={styles["hero-section__inner-background"]}
          style={{ backgroundImage: `url(${innerBackground})` }}
        ></div>*/}

        <div className={styles["hero-section__clover-border"]}></div>

        {/*<img
          src={personPopout}
          alt="Nicolas Soares"
          className={styles["hero-section__person-popout"]}
        />*/}

        {/*<div className={styles["hero-section__corner-cover"]}></div>*/}

        {/*<div className={styles["hero-section__clover-border--front"]}></div>*/}
      </div>

      <div className={styles["hero-section__social-links"]}>
        <IconButton width="narrow" type="round" size="medium" style="filled">
          {githubIcon}
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
