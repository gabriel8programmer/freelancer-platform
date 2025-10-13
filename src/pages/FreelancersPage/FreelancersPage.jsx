// pages/FreelancersPage/FreelancersPage.jsx
import React, { useState, useEffect } from 'react'
import FreelancerCard from '../../components/FreelancerCard/FreelancerCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Pagination from '../../components/Pagination/Pagination'
import { useFreelancers } from '../../hooks/useFreelancers'
import styles from './FreelancersPage.module.css'

const FreelancersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  const {
    freelancers,
    loading,
    error,
    pagination,
    fetchFreelancers,
    searchFreelancers,
    changePage
  } = useFreelancers()

  // Carregar freelancers quando o componente montar
  React.useEffect(() => {
    fetchFreelancers()
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
      searchFreelancers(debouncedSearch)
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
    fetchFreelancers({ search: debouncedSearch })
  }

  const handlePageChange = (page) => {
    changePage(page)
    // Scroll para o topo quando mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className={`${styles.freelancersPage} ${styles.fadeIn}`}>
        <div className="container">
          <div className={styles.errorState}>
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Erro ao carregar freelancers</h3>
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
    <div className={`${styles.freelancersPage} ${styles.fadeIn}`}>
      <div className="container">
        <div className={styles.pageHeader}>
          <div className={styles.headerRow}>
            <div>
              <h1>Freelancers Talentosos</h1>
              <p>Encontre o profissional perfeito para seu projeto</p>
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
            placeholder="Buscar freelancers por nome, título ou habilidades..."
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
                {pagination.total} freelancer{pagination.total !== 1 ? 's' : ''} encontrado{pagination.total !== 1 ? 's' : ''}
                {debouncedSearch && ` para "${debouncedSearch}"`}
              </span>
              
              {pagination.totalPages > 1 && (
                <span className={styles.pageInfo}>
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
              )}
            </div>
            
            <div className={styles.freelancersGrid}>
              {freelancers.map(freelancer => (
                <FreelancerCard key={freelancer._id || freelancer.id} freelancer={freelancer} />
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
            
            {freelancers.length === 0 && !loading && (
              <div className={styles.emptyState}>
                <i className="fas fa-users"></i>
                <h3>
                  {debouncedSearch ? 'Nenhum freelancer encontrado' : 'Nenhum freelancer disponível'}
                </h3>
                <p>
                  {debouncedSearch 
                    ? 'Tente ajustar os termos da sua busca' 
                    : 'No momento não há freelancers cadastrados'
                  }
                </p>
                <button 
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={handleRefresh}
                >
                  <i className="fas fa-sync-alt"></i>
                  Recarregar Freelancers
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FreelancersPage