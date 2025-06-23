import styles from './CompanyLogo.module.css';
import type { Company } from '@shared/types/types';
import CoreOsLogoSvg from '@assets/logos/CoreOS.svg?react'
import AlphaWaveLogoSvg from '@assets/logos/AlphaWave.svg?react'
import BoltshiftLogoSvg from '@assets/logos/Boltshift.svg?react'

// Logo components
export const CoreOSLogo = () => <CoreOsLogoSvg />;
export const AlphaWaveLogo = () => <AlphaWaveLogoSvg />;
export const BoltshiftLogo = () => <BoltshiftLogoSvg />;

interface Props {
  company: Company
}

const CompanyLogo = ({ company }: Props) => {
  return (
    <div className={styles['company-logo']}>
      {company.logo}
    </div>
  );
};

export default CompanyLogo;
