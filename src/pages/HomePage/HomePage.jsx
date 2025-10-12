// pages/HomePage/HomePage.jsx
import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import FreelancerCard from '../../components/FreelancerCard/FreelancerCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useFeaturedProjects } from '../../hooks/useFeaturedProjects'
import { useFeaturedFreelancers } from '../../hooks/useFeaturedFreelancers'
import styles from './HomePage.module.css'

const HomePage = () => {
  const { 
    projects: featuredProjects, 
    loading: projectsLoading, 
    error: projectsError 
  } = useFeaturedProjects(3)

  const { 
    freelancers: featuredFreelancers, 
    loading: freelancersLoading, 
    error: freelancersError 
  } = useFeaturedFreelancers(3)

  // Componente de loading para seções
  const SectionLoading = () => (
    <div className={styles.sectionLoading}>
      <LoadingSpinner size="small" text="Carregando..." />
    </div>
  )

  // Componente de erro para seções
  const SectionError = ({ message, onRetry }) => (
    <div className={styles.sectionError}>
      <i className="fas fa-exclamation-circle"></i>
      <p>{message}</p>
      {onRetry && (
        <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`} onClick={onRetry}>
          Tentar Novamente
        </button>
      )}
    </div>
  )

  return (
    <div className={styles.homePage}>
      <HeroSection />
      
      {/* Seção de Projetos em Destaque */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrapper}>
              <div className={styles.sectionTitle}>
                <h2>Projetos Mais Populares</h2>
                <p>Os projetos com mais propostas da plataforma</p>
              </div>
              <a href="/projetos" className={styles.btnVerTodos}>
                Ver Todos
              </a>
            </div>
          </div>
          
          {projectsLoading && <SectionLoading />}
          
          {projectsError && (
            <SectionError 
              message="Erro ao carregar projetos em destaque" 
              onRetry={() => window.location.reload()}
            />
          )}
          
          {!projectsLoading && !projectsError && (
            <>
              {featuredProjects.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {featuredProjects.map(project => (
                    <ProjectCard key={project._id || project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className={styles.sectionEmpty}>
                  <i className="fas fa-folder-open"></i>
                  <p>Nenhum projeto disponível no momento</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Seção de Freelancers em Destaque */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrapper}>
              <div className={styles.sectionTitle}>
                <h2>Freelancers Destacados</h2>
                <p>Profissionais qualificados prontos para seu projeto</p>
              </div>
              <a href="/freelancers" className={styles.btnVerTodos}>
                Ver Todos
              </a>
            </div>
          </div>
          
          {freelancersLoading && <SectionLoading />}
          
          {freelancersError && (
            <SectionError 
              message="Erro ao carregar freelancers em destaque" 
              onRetry={() => window.location.reload()}
            />
          )}
          
          {!freelancersLoading && !freelancersError && (
            <>
              {featuredFreelancers.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {featuredFreelancers.map(freelancer => (
                    <FreelancerCard key={freelancer._id || freelancer.id} freelancer={freelancer} />
                  ))}
                </div>
              ) : (
                <div className={styles.sectionEmpty}>
                  <i className="fas fa-users"></i>
                  <p>Nenhum freelancer disponível no momento</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage