// pages/ProjectsPage/ProjectsPage.jsx
import React, { useState } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import { projects } from '../../data/mockData'
import './ProjectsPage.css'

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleSearch = (term) => {
    setSearchTerm(term)
    
    if (!term.trim()) {
      setFilteredProjects(projects)
      return
    }
    
    const filtered = projects.filter(project => 
      project.title.toLowerCase().includes(term.toLowerCase()) ||
      project.description.toLowerCase().includes(term.toLowerCase()) ||
      project.skills.some(skill => 
        skill.toLowerCase().includes(term.toLowerCase())
      )
    )
    
    setFilteredProjects(filtered)
  }

  return (
    <div className="projects-page fade-in">
      <div className="container">
        <div className="page-header">
          <h1>Projetos Disponíveis</h1>
          <p>Encontre oportunidades que combinam com suas habilidades</p>
        </div>
        
        <div className="search-section">
          <SearchBar 
            placeholder="Buscar projetos por título, descrição ou habilidades..."
            onSearch={handleSearch}
            value={searchTerm}
          />
        </div>
        
        <div className="results-info">
          <span>
            {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
            {searchTerm && ` para "${searchTerm}"`}
          </span>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <h3>Nenhum projeto encontrado</h3>
            <p>Tente ajustar os termos da sua busca</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage