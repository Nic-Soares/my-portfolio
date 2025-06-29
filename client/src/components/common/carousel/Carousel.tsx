import { useState } from 'react'
import styles from './Carousel.module.css'
import CarouselSlide from './CarouselSlide'

interface Slide {
  id: number
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: '01',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam.',
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

const getStatus = (index: number, current: number, length: number) => {
  if (index === current) return 'active'
  if (index === (current + 1) % length) return 'next'
  if (index === (current - 1 + length) % length) return 'prev'
  return 'hidden'
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev: number) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev: number) =>
      prev === 0 ? slides.length - 1 : prev - 1
    )
  }

  return (
    <>
      {/* Botão esquerdo */}
      <button
        onClick={handlePrev}
        className={styles.nav_button_left}
      >
        ◀
      </button>

      {/* Slides posicionados */}
      <div className={styles.slides_container}>
        {slides.map((slide, index) => {
          const status = getStatus(index, currentIndex, slides.length)
          return (
            <CarouselSlide key={slide.id} slide={slide} status={status} />
          )
        })}
      </div>

      {/* Botão direito */}
      <button
        onClick={handleNext}
        className={styles.nav_button_right}
      >
        ▶
      </button>
    </>
  )
}

export default Carousel