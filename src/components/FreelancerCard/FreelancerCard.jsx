// components/FreelancerCard/FreelancerCard.jsx
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar'
import styles from './FreelancerCard.module.css'

const FreelancerCard = ({ freelancer }) => {
  // Formatar nome
  const getDisplayName = () => {
    return freelancer.name || freelancer.username || 'Freelancer'
  }

  // Formatar título
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

  // Obter ID do freelancer - AGORA USA O ID REAL DA BASE
  const getFreelancerId = () => {
    return freelancer._id || freelancer.id
  }

  return (
    <div className={styles.freelancerCard}>
      <div className={styles.freelancerHeader}>
        <div className={styles.freelancerAvatar}>
          <Avatar
            name={getDisplayName()}
            src={freelancer.avatar || freelancer.profileImage}
            size="50"
            round={true}
            textSizeRatio={2}
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.freelancerInfo}>
          <h3 className={styles.freelancerName}>{getDisplayName()}</h3>
          <p className={styles.freelancerTitle}>{getTitle()}</p>
          <div className={styles.freelancerRating}>
            <i className="fas fa-star"></i>
            <span>{getRating().toFixed(1)}</span>
            <span className={styles.projectsCount}>({getCompletedProjects()} projetos)</span>
          </div>
        </div>
      </div>

      <div className={styles.freelancerSkills}>
        {getSkills().slice(0, 4).map((skill, index) => (
          <span key={index} className={styles.skillTag}>{skill}</span>
        ))}
        {getSkills().length > 4 && (
          <span className={`${styles.skillTag} ${styles.moreSkills}`}>
            +{getSkills().length - 4}
          </span>
        )}
        {getSkills().length === 0 && (
          <span className={`${styles.skillTag} ${styles.noSkills}`}>
            Habilidades não informadas
          </span>
        )}
      </div>

      <div className={styles.freelancerFooter}>
        <Link 
          to={`/freelancer/${getFreelancerId()}`}
          className={styles.btnViewProfile}
        >
          <i className="fas fa-eye"></i>
          Ver Perfil
        </Link>
      </div>
    </div>
  )
}

export default FreelancerCard