// src/components/ProfileForm/ProfileForm.jsx
import React, { useState } from 'react';
import styles from './ProfileForm.module.css';

const ProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    bio: user?.bio || '',
    hourlyRate: user?.hourlyRate || '',
    skills: user?.skills?.join(', ') || '',
    portfolio: user?.portfolio || '',
    location: user?.location || '',
    phone: user?.phone || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const profileData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      profileComplete: true
    };
    
    onSave(profileData);
  };

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      <div className={styles.formSection}>
        <h3>Informações Pessoais</h3>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Título Profissional *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Desenvolvedor Front-end"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio *</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Conte um pouco sobre sua experiência, habilidades e objetivos..."
            required
          ></textarea>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Informações Profissionais</h3>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="hourlyRate">Taxa por Hora (R$) *</label>
            <input
              type="number"
              id="hourlyRate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="Ex: 85"
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: São Paulo, SP"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="skills">Habilidades *</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Ex: React, JavaScript, CSS, UI/UX Design"
            required
          />
          <small>Separe as habilidades por vírgula</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="portfolio">Portfólio/LinkedIn</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="Ex: https://meuportfolio.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      <div className={styles.formActions}>
        {onCancel && (
          <button 
            type="button" 
            className={`${styles.btn} ${styles.btnOutline}`} 
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button 
          type="submit" 
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          Salvar Perfil
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;