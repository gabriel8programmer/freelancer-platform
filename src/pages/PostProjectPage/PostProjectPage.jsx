// pages/PostProjectPage/PostProjectPage.jsx
import React, { useState } from 'react'
import styles from './PostProjectPage.module.css'

const PostProjectPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    skills: '',
    timeline: '',
    category: ''
  })

  const categories = [
    'Desenvolvimento Web',
    'Design UI/UX',
    'Marketing Digital',
    'Redação',
    'Tradução',
    'Consultoria',
    'Outro'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulação de envio
    console.log('Projeto publicado:', formData)
    alert('Projeto publicado com sucesso! Em breve freelancers entrarão em contato.')
    
    // Reset do formulário
    setFormData({
      title: '',
      description: '',
      budget: '',
      skills: '',
      timeline: '',
      category: ''
    })
  }

  return (
    <div className={`${styles.postProjectPage} ${styles.fadeIn}`}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1>Publicar Novo Projeto</h1>
          <p>Descreva seu projeto para encontrar o freelancer perfeito</p>
        </div>
        
        <form className={styles.projectForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h3>Informações Básicas</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="title">Título do Projeto *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Desenvolvimento de Site E-commerce"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">Categoria *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="description">Descrição Detalhada *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva seu projeto em detalhes: objetivos, requisitos, expectativas..."
                rows="6"
                required
              ></textarea>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h3>Detalhes do Projeto</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="budget">Orçamento (R$) *</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Ex: R$ 2.000 - R$ 3.500"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="timeline">Prazo Estimado *</label>
                <input
                  type="text"
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="Ex: 2-3 semanas"
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="skills">Habilidades Necessárias *</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Ex: React, JavaScript, CSS, Design Responsivo"
                required
              />
              <small>Separe as habilidades por vírgula</small>
            </div>
          </div>
          
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnPublish}`}>
            <i className="fas fa-paper-plane"></i>
            Publicar Projeto
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostProjectPage