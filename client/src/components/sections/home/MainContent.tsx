import styles from './MainContent.module.css'

import CollaborateSection from "./CollaborateSection"
import TestimonialSection from "./TestimonialsSection"

const MainContent = () => {
  return (
    <div className={styles['main_content']}>
      <CollaborateSection/>
      <TestimonialSection/>
    </div>
  )
}

export default MainContent
