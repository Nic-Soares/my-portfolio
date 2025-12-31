
import styles from './Projects.module.css';
import ProjectsCards from './ProjectsCards';
import ProjectsHeader from './ProjectsHeader';

const Projects = () => {
	return (
		<div className={styles['projects']}>
  		<ProjectsHeader/>
  		<ProjectsCards/>
		</div>
	);
}

export default Projects;
