import ExpertiseCard from '@/components/common/expertise-card/ExpertiseCard';
import Container from '@/components/layout/container/Container';
import styles from './ExperienceSection.module.css';
import CompanyLogo from '@/components/common/company-logo/CompanyLogo';

const ExperienceSection = () => {
  return (
    <div className={styles['experience-section']}>
      <Container className={styles['experience-section__grid']} background_color='var(--md-sys-color-surface-container)' border_radius='20px 20px 0 0'>

        <ExpertiseCard
          expertise={{
            icon: 'mobile_layout',
            title: 'Design & Creativity',
            description: 'Creating layouts that balance aesthetics and functionality, always aligned with user experience and business goals.'
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'mobile_layout',
            title: 'Design & Creativity',
            description: 'Creating layouts that balance aesthetics and functionality, always aligned with user experience and business goals.'
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'mobile_layout',
            title: 'Design & Creativity',
            description: 'Creating layouts that balance aesthetics and functionality, always aligned with user experience and business goals.'
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'mobile_layout',
            title: 'Design & Creativity',
            description: 'Creating layouts that balance aesthetics and functionality, always aligned with user experience and business goals.'
          }}
        />

      </Container>
      <Container className={styles['experience-section__companies']} background_color='var(--md-sys-color-surface-container)' border_radius='0 0 20px 20px'>

        <CompanyLogo
          company={{
            name: 'Boltshift',
            logo: 'boltshift',
            alt: 'Boltshift logo'
          }}
        />

        <CompanyLogo
          company={{
            name: 'Boltshift',
            logo: 'boltshift',
            alt: 'Boltshift logo'
          }}
        />

        <CompanyLogo
          company={{
            name: 'Boltshift',
            logo: 'boltshift',
            alt: 'Boltshift logo'
          }}
        />

        <CompanyLogo
          company={{
            name: 'Boltshift',
            logo: 'boltshift',
            alt: 'Boltshift logo'
          }}
        />

      </Container>
    </div>
  );
};

export default ExperienceSection
