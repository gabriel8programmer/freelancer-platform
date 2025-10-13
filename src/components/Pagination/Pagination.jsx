// components/Pagination/Pagination.jsx
import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showNumbers = true,
  showNavigation = true 
}) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    // Sempre incluir primeira página
    rangeWithDots.push(1)

    // Calcular range de páginas ao redor da atual
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    // Adicionar ellipsis antes do range se necessário
    if (currentPage - delta > 2) {
      rangeWithDots.push('...')
    }

    // Adicionar range de páginas
    rangeWithDots.push(...range)

    // Adicionar ellipsis depois do range se necessário
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...')
    }

    // Sempre incluir última página se houver mais de uma página
    if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  // CORREÇÃO: Função para verificar se a página está ativa
  const isPageActive = (page) => {
    return currentPage === page
  }

  // CORREÇÃO: Função para verificar se o botão está desabilitado
  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  return (
    <div className={styles.pagination}>
      {showNavigation && (
        <button
          className={`${styles.paginationBtn} ${isPreviousDisabled ? styles.paginationBtnDisabled : ''}`}
          onClick={() => !isPreviousDisabled && onPageChange(currentPage - 1)}
          disabled={isPreviousDisabled}
        >
          <i className="fas fa-chevron-left"></i>
          <span>Anterior</span>
        </button>
      )}

      {showNumbers && (
        <div className={styles.paginationNumbers}>
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className={styles.paginationEllipsis}>...</span>
              ) : (
                <button
                  className={`${styles.paginationNumber} ${isPageActive(page) ? styles.paginationNumberActive : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {showNavigation && (
        <button
          className={`${styles.paginationBtn} ${isNextDisabled ? styles.paginationBtnDisabled : ''}`}
          onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
        >
          <span>Próxima</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  )
}

export default Pagination