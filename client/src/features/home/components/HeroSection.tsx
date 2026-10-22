import { useNavigate } from "react-router-dom";
import HeroDecor from "@/components/decor/HeroDecor/HeroDecor.tsx";
import Shape from "@/components/decor/Shape/Shape.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import Chip from "@/components/ui/Chip/Chip.tsx";
import ChipRow from "@/components/ui/Chip/ChipRow.tsx";
import { FitLines } from "@/components/ui/FitLines/FitLines.tsx";
import { useFitText } from "@/hooks/useFitText.ts";
import { useSizeClass } from "@/hooks/useSizeClass.ts";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import styles from "./HeroSection.module.css";

// Figma "HeroSection": copy and CTAs beside the profile photo on desktop,
// stacked and centered below Large, over HeroDecor.
const HeroSection = () => {
  const navigate = useNavigate();
  const sizeClass = useSizeClass();
  const { t } = useI18n();
  // The hero has the viewport's height on desktop: a long headline shrinks
  const headingRef = useFitText<HTMLDivElement>();
  const skills = [
    "#Python",
    t.home.skillYears,
    "Power BI · SQL",
    "TypeScript",
    t.home.skillAi,
  ];
  const desktop = sizeClass === "large" || sizeClass === "extra-large";

  // Figma HeroActions: Round Large on desktop, Square Large on Medium,
  // Square Small on Compact
  const buttonType = desktop ? "round" : "square";
  const buttonSize = sizeClass === "compact" ? "small" : "large";

  // Figma text styles per frame (the typescale tokens shrink on their own)
  const eyebrowStyle = desktop ? "title-medium" : "title-small-emphasized";
  const headlineStyle = {
    "extra-large": "display-large-emphasized",
    large: "display-medium-emphasized",
    medium: "headline-large-emphasized",
    compact: "headline-small-emphasized",
  }[sizeClass];

  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <HeroDecor />

      <div className={styles.copy}>
        <div ref={headingRef} className={`fit-text ${styles.heading}`}>
          <p className={`${eyebrowStyle} ${styles.eyebrow}`}>
            {t.home.eyebrow}
          </p>
          <FitLines
            as="h1"
            lines={3}
            id="hero-headline"
            className={`${headlineStyle} ${styles.headline}`}
          >
            {t.home.headlineBefore}
            <span className={styles.name}>Nicolas Soares</span>
            {t.home.headlineAfter}
            <br />
            {t.home.headlineLine2}
          </FitLines>
          <ChipRow ariaLabel={t.home.skills}>
            {skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </ChipRow>
        </div>

        <div className={styles.actions}>
          <Button
            type={buttonType}
            size={buttonSize}
            style="filled"
            icon={null}
            label={t.home.seeProjects}
            onClick={() => navigate("/projects")}
          />
          <Button
            type={buttonType}
            size={buttonSize}
            style="tonal"
            icon={null}
            label={t.home.contactMe}
            onClick={() => navigate("/about")}
          />
        </div>
      </div>

      <div className={styles.media}>
        {/* Figma "Profile photo": a Primary 12-sided cookie until the photo
            is ready */}
        <Shape
          shape="12-sided-cookie"
          color="primary"
          className={styles.photo}
        />
      </div>
    </section>
  );
};

export default HeroSection;
