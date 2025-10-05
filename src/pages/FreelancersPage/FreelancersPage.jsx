// pages/FreelancersPage/FreelancersPage.jsx
import React, { useState } from 'react'
import FreelancerCard from '../../components/FreelancerCard/FreelancerCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import { freelancers } from '../../data/mockData'
import './FreelancersPage.css'

const FreelancersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers)

  const handleSearch = (term) => {
    setSearchTerm(term)
    
    if (!term.trim()) {
      setFilteredFreelancers(freelancers)
      return
    }
    
    const filtered = freelancers.filter(freelancer => 
      freelancer.name.toLowerCase().includes(term.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(term.toLowerCase()) ||
      freelancer.skills.some(skill => 
        skill.toLowerCase().includes(term.toLowerCase())
      )
    )
    
    setFilteredFreelancers(filtered)
  }

  return (
    <div className="freelancers-page fade-in">
      <div className="container">
        <div className="page-header">
          <h1>Freelancers Talentosos</h1>
          <p>Encontre o profissional perfeito para seu projeto</p>
        </div>
        
        <div className="search-section">
          <SearchBar 
            placeholder="Buscar freelancers por nome, título ou habilidades..."
            onSearch={handleSearch}
            value={searchTerm}
          />
        </div>
        
        <div className="results-info">
          <span>
            {filteredFreelancers.length} freelancer{filteredFreelancers.length !== 1 ? 's' : ''} encontrado{filteredFreelancers.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
          </span>
        </div>
        
        <div className="freelancers-grid">
          {filteredFreelancers.map(freelancer => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
        
        {filteredFreelancers.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-users"></i>
            <h3>Nenhum freelancer encontrado</h3>
            <p>Tente ajustar os termos da sua busca</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FreelancersPage