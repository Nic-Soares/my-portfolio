import ExpertiseCard from '@/components/common/expertise-card/ExpertiseCard';
import Container from '../../layout/container/Container'
import styles from './ExperienceSection.module.css'
import CompanyLogo from '@/components/common/company-logo/CompanyLogo';

const ExperienceSection = () => {
  return (
    <div className={styles['experience-section']}>
      <Container className={styles['experience-grid']} background_color='#EFEEE2' border_radius='20px 20px 0 0'>

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
      <Container className={styles['experience-companies']}  background_color='#EFEEE2' border_radius='0 0 20px 20px'>

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
