import styles from './Container.module.css';
import type { ContainerProps } from '@/types';

export default function Container({ children, background_color, border_radius, className }: ContainerProps) {
  const containerStyle = {
    backgroundColor: background_color || 'var(--md-sys-color-surface-container)',
    borderRadius: border_radius,
  };

  return (
    <section className={`${styles.container} ${className || ''}`} style={containerStyle}>
      {children}
    </section>
  );
}
