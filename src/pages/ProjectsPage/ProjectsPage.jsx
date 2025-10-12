// pages/ProjectsPage/ProjectsPage.jsx
import React, { useState, useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Pagination from '../../components/Pagination/Pagination'
import { useProjects } from '../../hooks/useProjects'
import './ProjectsPage.css'

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  const {
    projects,
    loading,
    error,
    pagination,
    fetchProjects,
    searchProjects,
    changePage
  } = useProjects()

  // Carregar projetos quando o componente montar
  React.useEffect(() => {
    fetchProjects({ status: 'open' })
  }, []) // Executa apenas uma vez

  // Debounce para pesquisa
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Executar busca quando debouncedSearch mudar
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      searchProjects(debouncedSearch)
    }
  }, [debouncedSearch])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setDebouncedSearch('')
  }

  const handleRefresh = () => {
    fetchProjects({ status: 'open', search: debouncedSearch })
  }

  const handlePageChange = (page) => {
    changePage(page)
    // Scroll para o topo quando mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className="projects-page fade-in">
        <div className="container">
          <div className="error-state">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Erro ao carregar projetos</h3>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={handleRefresh}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projects-page fade-in">
      <div className="container">
        <div className="page-header">
          <div className="header-row">
            <div>
              <h1>Projetos Disponíveis</h1>
              <p>Encontre oportunidades que combinam com suas habilidades</p>
            </div>
            <button 
              className="btn btn-outline refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
            >
              <i className="fas fa-sync-alt"></i>
              {loading ? ' Carregando...' : ' Atualizar'}
            </button>
          </div>
        </div>
        
        <div className="search-section">
          <SearchBar 
            placeholder="Buscar projetos por título, descrição ou habilidades..."
            onSearch={handleSearch}
            value={searchTerm}
            onClear={handleClearSearch}
          />
        </div>
        
        {loading && <LoadingSpinner />}
        
        {!loading && (
          <>
            <div className="results-info">
              <span>
                {pagination.total} projeto{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
                {debouncedSearch && ` para "${debouncedSearch}"`}
              </span>
              
              {pagination.totalPages > 1 && (
                <span className="page-info">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
              )}
            </div>
            
            <div className="projects-grid">
              {projects.map(project => (
                <ProjectCard key={project._id || project.id} project={project} />
              ))}
            </div>

            {/* Paginação */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
            
            {projects.length === 0 && !loading && (
              <div className="empty-state">
                <i className="fas fa-search"></i>
                <h3>
                  {debouncedSearch ? 'Nenhum projeto encontrado' : 'Nenhum projeto disponível'}
                </h3>
                <p>
                  {debouncedSearch 
                    ? 'Tente ajustar os termos da sua busca' 
                    : 'No momento não há projetos abertos para propostas'
                  }
                </p>
                <button 
                  className="btn btn-outline"
                  onClick={handleRefresh}
                >
                  <i className="fas fa-sync-alt"></i>
                  Recarregar Projetos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage