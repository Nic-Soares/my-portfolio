import React from 'react'
import styles from './CarouselSlide.module.css'

interface SlideData {
  id: number
  title: string
  description: string
}

interface CarouselSlideProps {
  slide: SlideData
  status: 'active' | 'next' | 'prev' | 'hidden'
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, status }) => {
  let slideClassName = `${styles.carousel_slide_base}`

  if (status === 'active') {
    slideClassName += ` ${styles.carousel_slide_active}`
  } else if (status === 'next') {
    slideClassName += ` ${styles.carousel_slide_next}`
  } else if (status === 'prev') {
    slideClassName += ` ${styles.carousel_slide_prev}`
  } else {
    slideClassName += ` ${styles.carousel_slide_hidden}`
  }

  return (
    <div key={slide.id} className={slideClassName}>
      <div className={styles.carousel_slide_content}>
        <div className={styles.shapes}>
          <div className={`${styles.shape} ${styles.triangle}`} />
          <div className={`${styles.shape} ${styles.gear}`} />
          <div className={`${styles.shape} ${styles.rounded}`} />
        </div>
        <div className={styles.text_content}>
          <h4>{slide.title}</h4>
          <p>{slide.description}</p>
        </div>
        {status === 'active' && (
          <md-filled-button>
            More
          </md-filled-button>
        )}
      </div>
    </div>
  )
}

export default CarouselSlide