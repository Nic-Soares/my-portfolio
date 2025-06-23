import styles from  './ExpertiseCard.module.css'
import type { Expertise } from '@shared/types/types'
import Container from '../../layout/container/Container'

interface Props {
  expertise: Expertise
}

const ExpertiseCard = ({ expertise }: Props) => {
	return (
    <Container className={styles['expertise-card']}>
				<div>
				  {expertise.icon}
				</div>
				<h3>
				  {expertise.title}
				</h3>
				<p>
				  {expertise.description}
				</p>
		</Container>
	)
}

export default ExpertiseCard
