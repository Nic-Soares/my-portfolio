import type { ReactNode } from "react"
import styles from './Container.module.css'

type ContainerProps = {
  children: ReactNode
  // Adicionadas propriedades opcionais para cor de fundo, borda e classe CSS
  background_color?: string;
  border_radius?: string;
  className?: string;
}

// Componente Container agora recebe background_color, border e className
export default function Container({ children, background_color, border_radius, className }: ContainerProps) {
  // Cria um objeto de estilo dinâmico
  const containerStyle = {
    backgroundColor: background_color || '#F0F0F0', // Define um background padrão se não for fornecido
    borderRadius: border_radius ,
  };

  return (
    // Aplica os estilos dinâmicos, os estilos do módulo CSS e o className passado
    <section className={`${styles.container} ${className || ''}`} style={containerStyle}>
      {children}
    </section>
  )
}
