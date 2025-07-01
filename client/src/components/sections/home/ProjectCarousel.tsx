import { useState } from 'react'
import styles from './ProjectCarousel.module.css'
import CarouselSlide from '@/components/common/carousel/CarouselSlide'

interface Project {
  id: number
  title: string
  description: string
}

const projects: Project[] = [
  {
    id: 1,
    title: '01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam.',
  },
  {
    id: 2,
    title: '02',
    description: 'Outro conteúdo para segundo item.',
  },
  {
    id: 3,
    title: '03',
    description: 'Mais conteúdo para terceiro item.',
  },
]

interface ProjectCarouselProps {
  className?: string
}

const ProjectCarousel = ({ className }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideClick = (projectId: number) => {
    const index = projects.findIndex(project => project.id === projectId)
    setCurrentIndex(index)
  }

  const getVisibleSlides = () => {
    if (currentIndex === 0) {
      return [0, 1]
    } else if (currentIndex === projects.length - 1) {
      return [currentIndex - 1, currentIndex]
    } else {
      return [currentIndex - 1, currentIndex, currentIndex + 1]
    }
  }

  const getLayoutClass = () => {
    if (currentIndex === 0) return styles.first_active
    if (currentIndex === projects.length - 1) return styles.last_active
    return styles.middle_active
  }

  return (
    <section className={`${styles.projects_carousel} ${className || ''}`}>
      <div className={`${styles.slides_container} ${getLayoutClass()}`}>
        {getVisibleSlides().map((slideIndex) => {
          const project = projects[slideIndex]
          const isActive = slideIndex === currentIndex
          const position = isActive ? 'middle' : 'lateral'
          
          return (
            <CarouselSlide
              key={project.id}
              project={project}
              isActive={isActive}
              onSlideClick={handleSlideClick}
              position={position}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProjectCarousel