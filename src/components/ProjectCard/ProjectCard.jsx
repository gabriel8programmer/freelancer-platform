// components/ProjectCard/ProjectCard.jsx
import styles from './ProjectCard.module.css'

const ProjectCard = ({ project }) => {
  // Formatar orçamento
  const formatBudget = () => {
    if (!project.budget) return 'Orçamento não definido'
    
    const { min, max, currency = 'BRL' } = project.budget
    const currencySymbol = currency === 'BRL' ? 'R$' : currency
    
    if (min && max) {
      return `${currencySymbol} ${min.toLocaleString()} - ${currencySymbol} ${max.toLocaleString()}`
    } else if (min) {
      return `A partir de ${currencySymbol} ${min.toLocaleString()}`
    } else if (max) {
      return `Até ${currencySymbol} ${max.toLocaleString()}`
    }
    
    return 'Orçamento a combinar'
  }

  // Formatar nome do cliente
  const getClientName = () => {
    if (typeof project.client === 'object' && project.client !== null) {
      return project.client.name || 'Cliente'
    }
    return project.client || 'Cliente'
  }

  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada'
    
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hoje'
    if (diffDays === 2) return 'Ontem'
    if (diffDays <= 7) return `Há ${diffDays - 1} dias`
    if (diffDays <= 30) return `Há ${Math.floor(diffDays / 7)} semanas`
    
    return date.toLocaleDateString('pt-BR')
  }

  // Contar propostas
  const getProposalsCount = () => {
    if (Array.isArray(project.proposals)) {
      return project.proposals.length
    }
    return project.proposalsCount || 0
  }

  // Verificar se é para mostrar botão de proposta
  const showApplyButton = project.status === 'open'

  // Obter classe do status
  const getStatusClass = () => {
    switch (project.status) {
      case 'open':
        return styles.statusOpen
      case 'in_progress':
        return styles.statusInProgress
      case 'completed':
        return styles.statusCompleted
      case 'cancelled':
        return styles.statusCancelled
      default:
        return styles.statusOpen
    }
  }

  // Obter texto do status
  const getStatusText = () => {
    switch (project.status) {
      case 'open':
        return 'Aberto'
      case 'in_progress':
        return 'Em Andamento'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Aberto'
    }
  }

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <span className={`${styles.statusBadge} ${getStatusClass()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className={styles.projectCategory}>
        <i className="fas fa-folder"></i>
        <span>{project.category || 'Outro'}</span>
      </div>
      
      <p className={styles.projectDescription}>
        {project.description && project.description.length > 150 
          ? `${project.description.substring(0, 150)}...` 
          : project.description
        }
      </p>
      
      <div className={styles.projectClient}>
        <i className="fas fa-user"></i>
        <span>{getClientName()}</span>
      </div>

      <div className={styles.projectTimeline}>
        <i className="fas fa-clock"></i>
        <span>Prazo: {project.timeline || 'A combinar'}</span>
      </div>
      
      <div className={styles.projectSkills}>
        {project.skills && project.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className={styles.skillTag}>{skill}</span>
        ))}
        {project.skills && project.skills.length > 4 && (
          <span className={`${styles.skillTag} ${styles.moreSkills}`}>
            +{project.skills.length - 4}
          </span>
        )}
        {(!project.skills || project.skills.length === 0) && (
          <span className={`${styles.skillTag} ${styles.noSkills}`}>
            Sem habilidades definidas
          </span>
        )}
      </div>
      
      <div className={styles.projectFooter}>
        <div className={styles.projectMeta}>
          <span className={styles.postedTime}>
            <i className="fas fa-calendar"></i>
            {formatDate(project.createdAt || project.posted)}
          </span>
          <span className={styles.proposals}>
            <i className="fas fa-paper-plane"></i>
            {getProposalsCount()} proposta{getProposalsCount() !== 1 ? 's' : ''}
          </span>
          <span className={styles.budget}>
            <i className="fas fa-money-bill-wave"></i>
            {formatBudget()}
          </span>
        </div>
        
        {showApplyButton && (
          <button className={styles.btnApply}>
            <i className="fas fa-paper-plane"></i>
            Enviar Proposta
          </button>
        )}
        
        {!showApplyButton && (
          <button className={`${styles.btnApply} ${styles.btnApplyDisabled}`} disabled>
            {getStatusText()}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectCard