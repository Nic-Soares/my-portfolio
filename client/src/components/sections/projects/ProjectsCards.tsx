import styles from './ProjectsCards.module.css';
import ProjectCard from '@/components/common/project-card/ProjectCard';

const ProjectsCards = () => {
	return (
	<div className={styles['projects__cards']}>
    <div className={styles['projects__card']}><ProjectCard /></div>
    <div className={styles['projects__card']}><ProjectCard /></div>
    <div className={styles['projects__card']}><ProjectCard /></div>
    <div className={styles['projects__card']}><ProjectCard /></div>
  </div>
	)
}

export default ProjectsCards
