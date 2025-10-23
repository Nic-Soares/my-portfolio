import React, { useState } from 'react'
import styles from './SearchBar.module.css'
import IconButton from '../buttons/icon-button/IconButton'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  className = ""
}) => {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setQuery("")
    onSearch?.("")
  }

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <div className={styles.searchBar__container}>
        <IconButton type='round' size='medium' style='standard' width='default' icon='search'/>
        <div className={styles.searchBar__content}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className={styles.searchBar__input}
          />
        </div>
        <IconButton type='round' size='medium' style='standard' width='default' icon='close' onClick={handleClear}/>
      </div>
    </div>
  )
}

export default SearchBar
