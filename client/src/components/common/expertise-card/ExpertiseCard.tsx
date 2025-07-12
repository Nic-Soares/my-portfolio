import styles from './ExpertiseCard.module.css';
import type { ExpertiseCardProps } from '@/types';
import Container from '@/components/layout/container/Container';

const ExpertiseCard = ({ expertise }: ExpertiseCardProps) => {
	return (
    <Container className={styles['expertise-card']} background_color='var(--md-sys-color-secondary-container)' border_radius='12px'>
      <div className={styles['expertise-card__header']}>
        <span className={`material-symbols-outlined ${styles['expertise-card__icon']}`}>
				  {expertise.icon}
        </span>
        <h3 className={styles['expertise-card__title']}>
          {expertise.title}
        </h3>
      </div>
      <p className={styles['expertise-card__description']}>
        {expertise.description}
      </p>
    </Container>
  );
};

export default ExpertiseCard;
