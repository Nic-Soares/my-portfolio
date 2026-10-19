import AlphaWaveLogoSvg from "@assets/logos/AlphaWave.svg?react";
import BoltshiftLogoSvg from "@assets/logos/Boltshift.svg?react";
import CoreOsLogoSvg from "@assets/logos/CoreOS.svg?react";
import GalileoLogoSvg from "@assets/logos/Galileo.svg?react";
import LightspeedLogoSvg from "@assets/logos/Lightspeed.svg?react";
import type { ReactNode } from "react";
import styles from "./CompanyLogo.module.css";

// Logo components mapping
const logoComponents = {
  coreos: CoreOsLogoSvg,
  alphawave: AlphaWaveLogoSvg,
  boltshift: BoltshiftLogoSvg,
  galileo: GalileoLogoSvg,
  lightspeed: LightspeedLogoSvg,
};

// Exported logo components
export const CoreOSLogo = () => <CoreOsLogoSvg />;
export const AlphaWaveLogo = () => <AlphaWaveLogoSvg />;
export const BoltshiftLogo = () => <BoltshiftLogoSvg />;

interface Company {
  name: string;
  logo: string | ReactNode;
  alt?: string;
}

interface CompanyLogoProps {
  company: Company;
}

const CompanyLogo = ({ company }: CompanyLogoProps) => {
  // If logo is already a React component, render it directly
  if (typeof company.logo === "object" && company.logo !== null) {
    return <div className={styles["company-logo"]}>{company.logo}</div>;
  }

  // If logo is a string identifier, map it to the component
  const LogoComponent =
    logoComponents[company.logo as keyof typeof logoComponents];

  return (
    <div
      className={styles["company-logo"]}
      role="img"
      aria-label={company.alt ?? company.name}
    >
      {LogoComponent ? (
        <LogoComponent aria-hidden="true" />
      ) : (
        // No SVG yet: the company name stands in as a wordmark
        <span
          className={`headline-medium-emphasized ${styles["company-logo__name"]}`}
        >
          {company.name}
        </span>
      )}
    </div>
  );
};

export default CompanyLogo;
