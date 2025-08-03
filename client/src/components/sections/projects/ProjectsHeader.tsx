import styles from './ProjectsHeader.module.css'
import ConnectedButtonGroup from '@/components/common/connected-button-group/ConnectedButtonGroup'
import SearchBar from '@/components/common/search-bar/SearchBar'

const options = [
  { label: 'Todos' },
  { label: 'Favoritos' },
  { label: 'Recentes', disabled: true },
  { label: 'Arquivados' }
];

const ProjectsHeader = () => {
  return (
    <header className={styles['projects__header']}>
      <h1 className={styles['projects__title']}>Projects</h1>
      <div className={styles['projects__actions']}>
        <div className={styles['projects__button-group']}>
          <ConnectedButtonGroup
            options={options}
            size="medium"
            allowDeselect={true}
          />
        </div>
        <div className={styles['projects__search-bar']}>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}

export default ProjectsHeader
