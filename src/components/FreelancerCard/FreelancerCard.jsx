// components/FreelancerCard/FreelancerCard.jsx
import './FreelancerCard.css'

const FreelancerCard = ({ freelancer }) => {
  // Formatar nome - usar name ou username
  const getDisplayName = () => {
    return freelancer.name || freelancer.username || 'Freelancer'
  }

  // Formatar título/tagline
  const getTitle = () => {
    return freelancer.title || freelancer.tagline || freelancer.specialization || 'Freelancer'
  }

  // Obter rating
  const getRating = () => {
    return freelancer.rating || freelancer.averageRating || 0
  }

  // Obter projetos concluídos
  const getCompletedProjects = () => {
    return freelancer.completedProjects || freelancer.projectsCompleted || 0
  }

  // Obter habilidades
  const getSkills = () => {
    return freelancer.skills || freelancer.expertise || []
  }

  // Obter avatar
  const getAvatar = () => {
    return freelancer.avatar || freelancer.profileImage || `/avatars/default-avatar.jpg`
  }

  return (
    <div className="freelancer-card">
      <div className="freelancer-header">
        <div className="freelancer-avatar">
          <img src={getAvatar()} alt={getDisplayName()} />
        </div>
        <div className="freelancer-info">
          <h3 className="freelancer-name">{getDisplayName()}</h3>
          <p className="freelancer-title">{getTitle()}</p>
          <div className="freelancer-rating">
            <i className="fas fa-star"></i>
            <span>{getRating().toFixed(1)}</span>
            <span className="projects-count">({getCompletedProjects()} projetos)</span>
          </div>
        </div>
      </div>

      <div className="freelancer-skills">
        {getSkills().slice(0, 4).map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {getSkills().length > 4 && (
          <span className="skill-tag more-skills">+{getSkills().length - 4}</span>
        )}
        {getSkills().length === 0 && (
          <span className="skill-tag no-skills">Habilidades não informadas</span>
        )}
      </div>

      <div className="freelancer-footer">
        <button className="btn-view-profile">
          <i className="fas fa-eye"></i>
          Ver Perfil
        </button>
      </div>
    </div>
  )
}

export default FreelancerCard