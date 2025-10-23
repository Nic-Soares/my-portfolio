import { ReactNode, useState } from 'react'
import styles from './IconButton.module.css'

interface IconButtonProps {
  type?: 'round' | 'square'
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  style?: 'filled' | 'tonal' | 'outline' | 'standard'
  width?: 'narrow' | 'default' | 'wide'
  icon?: string // nome do ícone Material Symbols
  selectedIcon?: string // nome do ícone quando selecionado (opcional)
  onClick?: (selected?: boolean) => void
  disabled?: boolean
  selected?: boolean
  toggleable?: boolean
  children?: ReactNode // fallback para SVG ou conteúdo customizado
}

const IconButton = ({
  type = 'round',
  size = 'medium',
  style = 'filled',
  width = 'default',
  icon,
  selectedIcon,
  onClick,
  disabled = false,
  selected: initialSelected = false,
  toggleable = false,
  children,
}: IconButtonProps) => {
  const [internalSelected, setInternalSelected] = useState(initialSelected)

  // Se for toggleable, usa estado interno; senão usa a prop diretamente
  const isSelected = toggleable ? internalSelected : initialSelected

  const className = [
    styles['icon-button'],
    styles[`icon-button--${type}`],
    styles[`icon-button--${size}`],
    styles[`icon-button--${style}`],
    styles[`icon-button--${width}`],
    isSelected ? styles['icon-button--selected'] : ''
  ].join(' ')

  // Renderiza o ícone Material Symbols se fornecido, senão children (SVG)
  const renderIcon = () => {
    const iconName = isSelected && selectedIcon ? selectedIcon : icon

    if (iconName) {

      return (
        <span
          className="material-symbols-outlined"
        >
          {iconName}
        </span>
      )
    }

    return children
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
      <div className={styles['icon-button__content']}>
        <div className={styles['icon-button__state-layer']}>
          {renderIcon()}
        </div>
      </div>
    </button>
  )
}

export default IconButton
