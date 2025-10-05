// components/SearchBar/SearchBar.jsx
import React from 'react'
import './SearchBar.css'

const SearchBar = ({ placeholder, onSearch, value }) => {
  const handleChange = (e) => {
    onSearch(e.target.value)
  }

  const handleClear = () => {
    onSearch('')
  }

  return (
    <div className="search-bar">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="search-input"
      />
      {value && (
        <button 
          type="button" 
          className="clear-btn"
          onClick={handleClear}
          aria-label="Limpar busca"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  )
}

export default SearchBar