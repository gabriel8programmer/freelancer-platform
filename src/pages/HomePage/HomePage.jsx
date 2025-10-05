// pages/HomePage/HomePage.jsx
import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import FreelancerCard from '../../components/FreelancerCard/FreelancerCard'
import { projects, freelancers } from '../../data/mockData'
import './HomePage.css'

const HomePage = () => {
  const featuredProjects = projects.slice(0, 3)
  const featuredFreelancers = freelancers.slice(0, 3)

  return (
    <div className="home-page">
      <HeroSection />
      
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Projetos em Destaque</h2>
            <p>Encontre oportunidades incríveis para mostrar seu talento</p>
          </div>
          <div className="cards-grid">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Freelancers Destacados</h2>
            <p>Profissionais qualificados prontos para seu projeto</p>
          </div>
          <div className="cards-grid">
            {featuredFreelancers.map(freelancer => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage