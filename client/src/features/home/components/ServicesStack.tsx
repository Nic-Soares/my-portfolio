import CompanyLogo from "@/components/ui/CompanyLogo/CompanyLogo.tsx";
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
const ServicesStack = () => (
  <section className={styles.stack} aria-label="Services">
    <ServiceCard
      title="Systems & Process Automation"
      description="I automate processes, integrate systems and turn manual tasks into efficient, reliable flows."
      tone="secondary"
      mediaSide="start"
      shapes={["gem", "burst", "pill"]}
    />
    <ServiceCard
      title="Data Engineering & Analysis"
      description="From raw data to dashboards: I deliver clarity, automation and insights."
      tone="tertiary"
      mediaSide="end"
      shapes={["diamond", "12-sided-cookie", "circle"]}
    />

    {/* Logos drift slowly to the left in a loop; the second copy only fills
        the gap and is hidden from assistive tech */}
    <div className={styles.companies}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <ul className={styles.logos} aria-label="Companies I've worked with">
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

export default ServicesStack;
