// components/HeroSection/HeroSection.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Encontre os melhores <span className={styles.highlight}>talentos</span> para seu projeto
            </h1>
            <p className={styles.heroDescription}>
              Conectamos empresas e profissionais freelancers de forma simples, rápida e eficiente. 
              Mais de 10.000 projetos realizados com sucesso.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/freelancers" className={`${styles.btn} ${styles.btnPrimary}`}>
                <i className="fas fa-search"></i>
                Encontrar Freelancers
              </Link>
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                <i className="fas fa-briefcase"></i>
                Trabalhar como Freelancer
              </button>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>10K+</strong>
                <span>Projetos Concluídos</span>
              </div>
              <div className={styles.stat}>
                <strong>2.5K+</strong>
                <span>Freelancers Ativos</span>
              </div>
              <div className={styles.stat}>
                <strong>98%</strong>
                <span>Taxa de Satisfação</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={`${styles.floatingCard} ${styles.floatingCardDesign}`}>
              <i className="fas fa-palette"></i>
              <span>Design</span>
            </div>
            <div className={`${styles.floatingCard} ${styles.floatingCardDevelopment}`}>
              <i className="fas fa-laptop-code"></i>
              <span>Desenvolvimento</span>
            </div>
            <div className={`${styles.floatingCard} ${styles.floatingCardMarketing}`}>
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