import ExpertiseCard from '@/components/common/expertise-card/ExpertiseCard';
import Container from '@/components/layout/container/Container';
import styles from './ExperienceSection.module.css';
import CompanyLogo from '@/components/common/company-logo/CompanyLogo';

const ExperienceSection = () => {
  return (
    <div className={styles['experience-section']}>
      <Container
        className={styles['experience-section__grid']}
        background_color="var(--md-sys-color-surface-container)"
        border_radius="20px 20px 0 0"
      >
        <ExpertiseCard
          expertise={{
            icon: 'mobile_layout',
            title: 'Design & Creativity',
            description:
              'Creating layouts that balance aesthetics and functionality, always aligned with user experience and business goals.',
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'web',
            title: 'Frontend Engineering',
            description:
              'Building responsive, accessible interfaces with performance and maintainability in mind.',
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'bar_chart',
            title: 'Data Visualization',
            description:
              'Turning complex datasets into clear visual stories that support decision-making.',
          }}
        />

        <ExpertiseCard
          expertise={{
            icon: 'integration_instructions',
            title: 'Systems Thinking',
            description:
              'Designing components and flows that scale across products and teams.',
          }}
        />
      </Container>

      <Container
        className={styles['experience-section__companies']}
        background_color="var(--md-sys-color-surface-container)"
        border_radius="0 0 20px 20px"
      >
        <CompanyLogo
          company={{
            name: 'Boltshift',
            logo: 'boltshift',
            alt: 'Boltshift logo',
          }}
        />

        <CompanyLogo
          company={{
            name: 'Acme Labs',
            logo: 'acme',
            alt: 'Acme Labs logo',
          }}
        />

        <CompanyLogo
          company={{
            name: 'Nimbus',
            logo: 'nimbus',
            alt: 'Nimbus logo',
          }}
        />

        <CompanyLogo
          company={{
            name: 'Vertex',
            logo: 'vertex',
            alt: 'Vertex logo',
          }}
        />
      </Container>
    </div>
  );
};

export default ExperienceSection;
