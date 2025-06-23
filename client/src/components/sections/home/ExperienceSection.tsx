import CompanyLogo from '../../common/company-logo/CompanyLogo';
import Container from '../../layout/container/Container'
import styles from './ExperienceSection.module.css'
import { CoreOSLogo, AlphaWaveLogo, BoltshiftLogo } from '../../common/company-logo/CompanyLogo';

// Mock data
const trustedCompanies = [
  { id: '1', name: 'CoreOS', logo: <CoreOSLogo />, alt: 'CoreOS logo' },
  { id: '2', name: 'AlphaWave', logo: <AlphaWaveLogo />, alt: 'AlphaWave logo' },
  { id: '3', name: 'CoreOS', logo: <BoltshiftLogo />, alt: 'CoreOS logo' },
  { id: '4', name: 'AlphaWave', logo: <CoreOSLogo />, alt: 'AlphaWave logo' },
];

// const ExpertiseGrid = () => {
//   return (
//     <Container className="expertise-card">
//       <h3 className="expertise-card__title">Trusted by</h3>
//       <div className="expertise__grid">
//         {trustedCompanies.map((company) => (
//           <CompanyLogo key={company.id} company={company} />
//         ))}
//       </div>
//     </Container>
//   );
// };

const TrustedCompanies = () => {
  return (
    <Container className={styles['trusted_companies']}>
      {trustedCompanies.map((company) => (
        <CompanyLogo key={company.id} company={company} />
      ))}
    </Container>
  );
};


const ExperienceSection = () => {
  return (
    <section className={styles['experience-section']}>
      <TrustedCompanies className/>
    </section>
  );
};

export default ExperienceSection
