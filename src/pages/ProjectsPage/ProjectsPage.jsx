// pages/ProjectsPage/ProjectsPage.jsx
import React, { useState, useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Pagination from '../../components/Pagination/Pagination'
import { useProjects } from '../../hooks/useProjects'
import styles from './ProjectsPage.module.css'

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
      <div className={`${styles.projectsPage} ${styles.fadeIn}`}>
        <div className="container">
          <div className={styles.errorState}>
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Erro ao carregar projetos</h3>
            <p>{error}</p>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
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
    <div className={`${styles.projectsPage} ${styles.fadeIn}`}>
      <div className="container">
        <div className={styles.pageHeader}>
          <div className={styles.headerRow}>
            <div>
              <h1>Projetos Disponíveis</h1>
              <p>Encontre oportunidades que combinam com suas habilidades</p>
            </div>
            <button 
              className={`${styles.btn} ${styles.btnOutline} ${styles.refreshBtn}`}
              onClick={handleRefresh}
              disabled={loading}
            >
              <i className="fas fa-sync-alt"></i>
              {loading ? ' Carregando...' : ' Atualizar'}
            </button>
          </div>
        </div>
        
        <div className={styles.searchSection}>
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
            <div className={styles.resultsInfo}>
              <span>
                {pagination.total} projeto{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
                {debouncedSearch && ` para "${debouncedSearch}"`}
              </span>
              
              {pagination.totalPages > 1 && (
                <span className={styles.pageInfo}>
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
              )}
            </div>
            
            <div className={styles.projectsGrid}>
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
              <div className={styles.emptyState}>
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
                  className={`${styles.btn} ${styles.btnOutline}`}
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