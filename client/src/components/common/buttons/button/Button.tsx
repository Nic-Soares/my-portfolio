import React, { ReactNode, useState } from 'react';
import styles from './Button.module.css'

interface ButtonProps {
  type?: 'round' | 'square'
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  style?: 'filled' | 'tonal' | 'outline' | 'standard'
  width?: 'narrow' | 'default' | 'wide'
  label?: string
  icon?: string
  selectedIcon?: string
  onClick?: (selected?: boolean) => void
  disabled?: boolean
  selected?: boolean
  toggleable?: boolean
  children?: ReactNode
  visible?: boolean
}

const Button = ({
  type = 'round',
  size = 'xsmall',
  style = 'filled',
  width = 'default',
  icon = 'stars',
  label,
  selectedIcon,
  onClick,
  disabled = false,
  selected: initialSelected = false,
  toggleable = false,
  children,
  visible = true, // padrão: aparece
}: ButtonProps) => {
  // SEMPRE chame hooks ANTES de qualquer return condicional!
  const [internalSelected, setInternalSelected] = useState(initialSelected)
  const isSelected = toggleable ? internalSelected : initialSelected

  if (!visible) return null // Agora está correto!

  const className = [
    styles['button'],
    styles[`button--${type}`],
    styles[`button--${size}`],
    styles[`button--${style}`],
    styles[`button--${width}`],
    isSelected ? styles['button--selected'] : ''
  ].join(' ')

  const renderIcon = () => {
    const iconName = isSelected && selectedIcon ? selectedIcon : icon
    if (iconName) {
      return (
        <span className="material-symbols-outlined">
          {iconName}
        </span>
      )
    }
    return null
  }

  return (
    <button
      className={className}
      onClick={() => {
        if (disabled) return
        if (toggleable) {
          const newState = !internalSelected
          setInternalSelected(newState)
          onClick?.(newState)
        } else {
          onClick?.(isSelected)
        }
      }}
      disabled={disabled}
    >
      <div className={styles['button__content']}>
        <div className={styles['button__state-layer']}>
          {renderIcon()}
          {label && <p className={styles['button__label']}>{label}</p>}
          {children}
        </div>
      </div>
    </button>
  )
}

export default Button
