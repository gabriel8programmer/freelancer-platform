// components/HeroSection/HeroSection.jsx
import React from 'react'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Encontre os melhores <span className="highlight">talentos</span> para seu projeto
            </h1>
            <p className="hero-description">
              Conectamos empresas e profissionais freelancers de forma simples, rápida e eficiente. 
              Mais de 10.000 projetos realizados com sucesso.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                <i className="fas fa-search"></i>
                Encontrar Freelancers
              </button>
              <button className="btn btn-secondary">
                <i className="fas fa-briefcase"></i>
                Trabalhar como Freelancer
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>10K+</strong>
                <span>Projetos Concluídos</span>
              </div>
              <div className="stat">
                <strong>2.5K+</strong>
                <span>Freelancers Ativos</span>
              </div>
              <div className="stat">
                <strong>98%</strong>
                <span>Taxa de Satisfação</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card design">
              <i className="fas fa-palette"></i>
              <span>Design</span>
            </div>
            <div className="floating-card development">
              <i className="fas fa-laptop-code"></i>
              <span>Desenvolvimento</span>
            </div>
            <div className="floating-card marketing">
              <i className="fas fa-chart-line"></i>
              <span>Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection