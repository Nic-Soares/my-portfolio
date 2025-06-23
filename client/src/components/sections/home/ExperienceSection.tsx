import CompanyLogo from '../../common/company-logo/CompanyLogo';
import Container from '../../layout/container/Container'
import styles from './ExperienceSection.module.css'
import { CoreOSLogo, AlphaWaveLogo, BoltshiftLogo } from '../../common/company-logo/CompanyLogo';

// Mock data

const expertiseCards = [
  { id: '1', title: 'Data Analysis', description: 'Advanced analytics and insights', icon: '📊' },
  { id: '2', title: 'Machine Learning', description: 'AI-powered solutions', icon: '🤖' },
  { id: '3', title: 'Data Visualization', description: 'Interactive dashboards', icon: '📈' },
]

const trustedCompanies = [
  { id: '1', name: 'CoreOS', logo: <CoreOSLogo />, alt: 'CoreOS logo' },
  { id: '2', name: 'AlphaWave', logo: <AlphaWaveLogo />, alt: 'AlphaWave logo' },
  { id: '3', name: 'CoreOS', logo: <BoltshiftLogo />, alt: 'CoreOS logo' },
  { id: '4', name: 'AlphaWave', logo: <CoreOSLogo />, alt: 'AlphaWave logo' },
];

const ExpertiseCards = () => {
  return (
    <Container className={styles["expertise-cards"]}>
      {expertiseCards.map((expertise) => (
        <div key={expertise.id} className={styles["expertise-card"]}>
          <div className={styles["expertise-icon"]}>{expertise.icon}</div>
          <h3 className={styles["expertise-title"]}>{expertise.title}</h3>
          <p className={styles["expertise-description"]}>{expertise.description}</p>
        </div>
      ))}
    </Container>
  );
};

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
      <ExpertiseCards/>
      <TrustedCompanies/>
    </section>
  );
};

export default ExperienceSection
