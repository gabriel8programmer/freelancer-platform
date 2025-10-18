// pages/FreelancerProfile/FreelancerProfile.jsx
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useFreelancers } from '../../hooks/useFreelancers'
import Avatar from 'react-avatar'
import styles from './FreelancerProfilePage.module.css'
import Button from '../../components/Button/Button'

const FreelancerProfile = () => {
  const { id } = useParams()
  const { 
    currentFreelancer, 
    loading, 
    error, 
    fetchFreelancerById,
    clearCurrentFreelancer 
  } = useFreelancers()

  useEffect(() => {
    if (id) {
      fetchFreelancerById(id)
    }

    return () => {
      clearCurrentFreelancer()
    }
  }, [id])

  useEffect(() => {
    console.log('Buscando freelancer com ID:', id) // Debug
    if (id) {
        fetchFreelancerById(id)
    }

    return () => {
        clearCurrentFreelancer()
    }
    }, [id])

  useEffect(() => {
    if (id) {
      fetchFreelancerById(id)
    }

    // Cleanup ao sair da página
    return () => {
      clearCurrentFreelancer()
    }
  }, [id])

  // Loading state
  if (loading && !currentFreelancer) {
    return (
      <div className={styles.profilePage}>
        <div className="container">
          <div className={styles.loadingContainer}>
            <div className="spinner"></div>
            <p>Carregando perfil...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !currentFreelancer) {
    return (
      <div className={styles.profilePage}>
        <div className="container">
          <div className={styles.errorContainer}>
            <i className="fas fa-exclamation-triangle"></i>
            <h3>{error}</h3>
            <Link to="/freelancers" className="btn btn-primary">
              Voltar para Freelancers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Freelancer não encontrado
  if (!currentFreelancer) {
    return (
      <div className={styles.profilePage}>
        <div className="container">
          <div className={styles.errorContainer}>
            <i className="fas fa-user-slash"></i>
            <h3>Freelancer não encontrado</h3>
            <p>O perfil que você está procurando não existe ou foi removido.</p>
            <Link to="/freelancers" className="btn btn-primary">
              Voltar para Freelancers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const freelancer = currentFreelancer

  return (
    <div className={styles.profilePage}>
      <div className="container">
        {/* Header do Perfil */}
        <div className={styles.profileHeader}>
          <div className={styles.profileMain}>
            <div className={styles.avatarSection}>
              <Avatar
                name={freelancer.name}
                src={freelancer.avatar}
                size={120}
                round={true}
                textSizeRatio={2}
                className={styles.profileAvatar}
              />
              <div className={styles.availabilityBadge}>
                <span className={`${styles.statusIndicator} ${freelancer.available ? styles.available : styles.unavailable}`}></span>
                {freelancer.available ? 'Disponível' : 'Indisponível'}
              </div>
            </div>

            <div className={styles.profileInfo}>
              <h1 className={styles.profileName}>{freelancer.name}</h1>
              <h2 className={styles.profileTitle}>{freelancer.title}</h2>
              
              <div className={styles.ratingSection}>
                <div className={styles.rating}>
                  <i className="fas fa-star"></i>
                  <strong>{freelancer.rating?.toFixed(1) || '0.0'}</strong>
                  <span>({freelancer.completedProjects || 0} projetos)</span>
                </div>
                {freelancer.location && (
                  <div className={styles.location}>
                    <i className="fas fa-map-marker-alt"></i>
                    {freelancer.location}
                  </div>
                )}
                {freelancer.hourlyRate && (
                  <div className={styles.hourlyRate}>
                    <i className="fas fa-dollar-sign"></i>
                    R$ {freelancer.hourlyRate}/hora
                  </div>
                )}
              </div>

              <div className={styles.profileActions}>
                <Button
                  variant="primary"
                  size="large"
                  
                  fullWidth
                >
                  Entrar em Contato
                </Button>
                
                <Button
                  variant={freelancer.available ? "secondary" : "outline"}
                  size="large"
                  disabled={!freelancer.available}
                  fullWidth
                >
                  {freelancer.available ? 'Contratar' : 'Indisponível'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo do Perfil */}
        <div className={styles.profileContent}>
          <div className={styles.mainContent}>
            {/* Sobre */}
            {freelancer.bio && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <i className="fas fa-user"></i>
                  Sobre
                </h3>
                <p className={styles.bio}>{freelancer.bio}</p>
              </section>
            )}

            {/* Habilidades */}
            {freelancer.skills && freelancer.skills.length > 0 && (
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <i className="fas fa-cogs"></i>
                  Habilidades & Especialidades
                </h3>
                <div className={styles.skillsGrid}>
                  {freelancer.skills.map((skill, index) => (
                    <span key={index} className={styles.skillItem}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Estatísticas */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <i className="fas fa-chart-bar"></i>
                Estatísticas
              </h3>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{freelancer.completedProjects || 0}</div>
                  <div className={styles.statLabel}>Projetos Concluídos</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{freelancer.rating?.toFixed(1) || '0.0'}</div>
                  <div className={styles.statLabel}>Avaliação Média</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{freelancer.successRate || '95%'}</div>
                  <div className={styles.statLabel}>Taxa de Sucesso</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{freelancer.responseTime || '2'}</div>
                  <div className={styles.statLabel}>Horas p/ Responder</div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Informações de Contato */}
            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarTitle}>Informações</h4>
              <div className={styles.infoList}>
                {freelancer.languages && freelancer.languages.length > 0 && (
                  <div className={styles.infoItem}>
                    <i className="fas fa-globe"></i>
                    <span>{freelancer.languages.join(', ')}</span>
                  </div>
                )}
                {freelancer.joinedDate && (
                  <div className={styles.infoItem}>
                    <i className="fas fa-calendar"></i>
                    <span>Membro desde {new Date(freelancer.joinedDate).getFullYear()}</span>
                  </div>
                )}
                <div className={styles.infoItem}>
                  <i className="fas fa-clock"></i>
                  <span>Resposta em {freelancer.responseTime || 2} horas</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {(freelancer.portfolio || freelancer.github || freelancer.linkedin) && (
              <div className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>Links</h4>
                <div className={styles.linksList}>
                  {freelancer.portfolio && (
                    <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                      <i className="fas fa-globe"></i>
                      Portfolio
                    </a>
                  )}
                  {freelancer.github && (
                    <a href={freelancer.github} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                      <i className="fab fa-github"></i>
                      GitHub
                    </a>
                  )}
                  {freelancer.linkedin && (
                    <a href={freelancer.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                      <i className="fab fa-linkedin"></i>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Ações Rápidas */}
            <div className={styles.sidebarSection}>
              <h4 className={styles.sidebarTitle}>Ações Rápidas</h4>
              <div className={styles.quickActions}>
                <Button
                  variant="outline"
                  size="small"
                >
                  Baixar CV
                </Button>
                
                <Button
                  variant="outline"
                  size="small"
                >
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerProfile