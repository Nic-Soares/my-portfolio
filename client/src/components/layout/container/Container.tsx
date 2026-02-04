import { CSSProperties, ReactNode } from "react";
import styles from "./Container.module.css";

// Agora usamos 'hero' que é semanticamente correto para seções de destaque
export type ContainerVariant = "default" | "hero" | "media";

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function Container({
  children,
  variant = "default",
  backgroundColor,
  borderRadius,
  padding,
  className,
  style,
  id,
}: ContainerProps) {
  
  // Mapeamento atualizado
  const variantClass = 
    variant === "hero" ? styles.hero : 
    variant === "media" ? styles.media : "";

  const dynamicStyles: CSSProperties = {
    // Se for 'hero' ou 'media', não aplica cor padrão (o CSS ou o dev controlam)
    backgroundColor: backgroundColor || (variant === "default" ? "var(--md-sys-color-surface-container)" : undefined),
    borderRadius,
    ...(padding && { padding }),
    ...style,
  };

  return (
    <section 
      id={id} 
      className={`${styles.container} ${variantClass} ${className || ""}`} 
      style={dynamicStyles}
    >
      {children}
    </section>
  );
}