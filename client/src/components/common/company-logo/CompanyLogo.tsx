import styles from './CompanyLogo.module.css';
import type { CompanyLogoProps } from '@/types';
import CoreOsLogoSvg from "@assets/logos/CoreOS.svg?react";
import AlphaWaveLogoSvg from "@assets/logos/AlphaWave.svg?react";
import BoltshiftLogoSvg from "@assets/logos/Boltshift.svg?react";

// Logo components mapping
const logoComponents = {
  'coreos': CoreOsLogoSvg,
  'alphawave': AlphaWaveLogoSvg,
  'boltshift': BoltshiftLogoSvg,
};

// Exported logo components
export const CoreOSLogo = () => <CoreOsLogoSvg />;
export const AlphaWaveLogo = () => <AlphaWaveLogoSvg />;
export const BoltshiftLogo = () => <BoltshiftLogoSvg />;

const CompanyLogo = ({ company }: CompanyLogoProps) => {
  // If logo is already a React component, render it directly
  if (typeof company.logo === 'object' && company.logo !== null) {
    return (
      <div className={styles['company-logo']}>
        {company.logo}
      </div>
    );
  }

  // If logo is a string identifier, map it to the component
  const LogoComponent = logoComponents[company.logo as keyof typeof logoComponents];

  return (
    <div className={styles['company-logo']}>
      {LogoComponent ? <LogoComponent /> : <span>Logo not found</span>}
    </div>
  );
};

export default CompanyLogo;
