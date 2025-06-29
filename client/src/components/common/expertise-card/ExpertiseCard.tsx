import styles from  './ExpertiseCard.module.css'
import type { Expertise } from '@shared/types/types'
import Container from '../../layout/container/Container'

interface Props {
  expertise: Expertise
}

const ExpertiseCard = ({ expertise }: Props) => {
	return (
    <Container className={styles['expertise-card']} background_color='#D9EB99' border_radius='12px'>
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
	)
}

export default ExpertiseCard
