// components/ProjectCard/ProjectCard.jsx
import './ProjectCard.css'

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

  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className={`status-badge status-${project.status || 'open'}`}>
          {project.status === 'open' && 'Aberto'}
          {project.status === 'in_progress' && 'Em Andamento'}
          {project.status === 'completed' && 'Concluído'}
          {project.status === 'cancelled' && 'Cancelado'}
        </span>
      </div>

      <div className="project-category">
        <i className="fas fa-folder"></i>
        <span>{project.category || 'Outro'}</span>
      </div>
      
      <p className="project-description">
        {project.description && project.description.length > 150 
          ? `${project.description.substring(0, 150)}...` 
          : project.description
        }
      </p>
      
      <div className="project-client">
        <i className="fas fa-user"></i>
        <span>{getClientName()}</span>
      </div>

      <div className="project-timeline">
        <i className="fas fa-clock"></i>
        <span>Prazo: {project.timeline || 'A combinar'}</span>
      </div>
      
      <div className="project-skills">
        {project.skills && project.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {project.skills && project.skills.length > 4 && (
          <span className="skill-tag more-skills">+{project.skills.length - 4}</span>
        )}
        {(!project.skills || project.skills.length === 0) && (
          <span className="skill-tag no-skills">Sem habilidades definidas</span>
        )}
      </div>
      
      <div className="project-footer">
        <div className="project-meta">
          <span className="posted-time">
            <i className="fas fa-calendar"></i>
            {formatDate(project.createdAt || project.posted)}
          </span>
          <span className="proposals">
            <i className="fas fa-paper-plane"></i>
            {getProposalsCount()} proposta{getProposalsCount() !== 1 ? 's' : ''}
          </span>
          <span className="budget">
            <i className="fas fa-money-bill-wave"></i>
            {formatBudget()}
          </span>
        </div>
        
        {showApplyButton && (
          <button className="btn-apply">
            <i className="fas fa-paper-plane"></i>
            Enviar Proposta
          </button>
        )}
        
        {!showApplyButton && (
          <button className="btn-apply disabled" disabled>
            {project.status === 'in_progress' && 'Em Andamento'}
            {project.status === 'completed' && 'Concluído'}
            {project.status === 'cancelled' && 'Cancelado'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectCard