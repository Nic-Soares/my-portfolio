import styles from './CarouselSlide.module.css'

interface Project {
  id: number
  title: string
  description: string
}

interface CarouselSlideProps {
  project: Project
  isActive: boolean
  onSlideClick: (projectId: number) => void
  position?: 'middle' | 'lateral'
}

const CarouselSlide = ({ project, isActive, onSlideClick, position }: CarouselSlideProps) => {
  const handleClick = () => {
    onSlideClick(project.id)
  }

  const getSlideClass = () => {
    let className = styles.slide
    if (isActive) className += ` ${styles.active}`
    if (position) className += ` ${styles[position]}`
    return className
  }

  return (
    <div
      className={getSlideClass()}
      onClick={handleClick}
    >
      <h4>{project.title}</h4>
      <p>{project.description}</p>
    </div>
  )
}

export default CarouselSlide
