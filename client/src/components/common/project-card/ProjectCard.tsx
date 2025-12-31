import ConnectedButtonGroup from '../connected-button-group/ConnectedButtonGroup';
import styles from './ProjectCard.module.css';

type ProjectCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Data' | 'DevOps' | 'Design';

interface ProjectCardProps {
  categories?: ProjectCategory[];
  title?: string;
  lastUpdate?: string;
  imageUrl?: string;
}

const ProjectCard = ({
  categories = ['Frontend', 'Backend', 'Data'],
  title = 'Project Title',
  lastUpdate = 'Updated today',
  imageUrl
}: ProjectCardProps) => {
  return (
    <div className={styles['project-card']}>

      <div className={styles["project-card__content"]}>
        <div className={styles['project-card__preview']}>
          {imageUrl && <img src={imageUrl} alt={title} />}
        </div>
        <div className={styles["project-card__info"]}>
          <ConnectedButtonGroup
            options={categories.map(category => ({
              label: category
            }))}
            size="small"
            selectable={false}
          />
          <h3 className={styles["project-card__title"]}>{title}</h3>
          <p className={styles["project-card__update"]}>{lastUpdate}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;