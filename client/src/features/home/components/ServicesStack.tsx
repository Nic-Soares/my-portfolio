import CompanyLogo from "@/components/ui/CompanyLogo/CompanyLogo.tsx";
import { useI18n } from "@/i18n/I18nProvider.tsx";
import ServiceCard from "./ServiceCard/ServiceCard.tsx";
import styles from "./ServicesStack.module.css";

// Pluxee shows its name until its SVG logo is added; the rest are the
// Figma "Company logo" placeholders
const COMPANIES = [
  { name: "Pluxee", logo: "pluxee" },
  { name: "Galileo", logo: "galileo" },
  { name: "CoreOS", logo: "coreos" },
  { name: "Lightspeed", logo: "lightspeed" },
  { name: "AlphaWave", logo: "alphawave" },
  { name: "Boltshift", logo: "boltshift" },
];

// Figma "ServicesStack": two service cards over the trusted companies bar
const ServicesStack = () => {
  const { t } = useI18n();
  return (
    <section className={styles.stack} aria-label={t.home.services}>
      <ServiceCard
        title={t.home.automationTitle}
        description={t.home.automationText}
        tone="secondary"
        mediaSide="start"
        shapes={["gem", "burst", "pill"]}
        descriptionLines={{ "extra-large": 2, large: 3, medium: 3, compact: 2 }}
      />
      <ServiceCard
        title={t.home.dataTitle}
        description={t.home.dataText}
        tone="tertiary"
        mediaSide="end"
        shapes={["diamond", "12-sided-cookie", "circle"]}
        descriptionLines={2}
      />

      {/* Logos drift slowly to the left in a loop; the second copy only fills
        the gap and is hidden from assistive tech */}
      <div className={styles.companies}>
        <div className={styles.viewport}>
          <div className={styles.track}>
            <ul className={styles.logos} aria-label={t.home.companies}>
              {COMPANIES.map((company) => (
                <li key={company.logo}>
                  <CompanyLogo company={company} />
                </li>
              ))}
            </ul>
            <ul className={styles.logos} aria-hidden="true">
              {COMPANIES.map((company) => (
                <li key={company.logo}>
                  <CompanyLogo company={company} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesStack;
