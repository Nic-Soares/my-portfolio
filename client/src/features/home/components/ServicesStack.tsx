import CompanyLogo from "@/components/ui/CompanyLogo/CompanyLogo.tsx";
import ServiceCard from "./ServiceCard/ServiceCard.tsx";
import styles from "./ServicesStack.module.css";

// Figma TrustedCompaniesBar still shows CoreOS four times (TK-06.2.2)
const COMPANIES = ["coreos", "alphawave", "boltshift", "coreos"];

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
    <ul className={styles.companies} aria-label="Companies I've worked with">
      {COMPANIES.map((logo, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: placeholder logos repeat
        <li key={index}>
          <CompanyLogo company={{ name: logo, logo }} />
        </li>
      ))}
    </ul>
  </section>
);

export default ServicesStack;
