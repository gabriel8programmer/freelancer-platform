// src/components/ProfileView/ProfileView.jsx
import React from 'react';
import './ProfileView.css';

const ProfileView = ({ user }) => {
  return (
    <div className="profile-view">
      <div className="profile-card">
        <div className="profile-section">
          <h3>Sobre</h3>
          <p className="profile-bio">
            {user?.bio || 'Complete seu perfil para contar mais sobre você.'}
          </p>
        </div>

        <div className="profile-section">
          <h3>Informações Profissionais</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Título:</strong>
              <span>{user?.title || 'Não informado'}</span>
            </div>
            <div className="info-item">
              <strong>Taxa/Hora:</strong>
              <span>{user?.hourlyRate ? `R$ ${user.hourlyRate}` : 'Não informada'}</span>
            </div>
            <div className="info-item">
              <strong>Localização:</strong>
              <span>{user?.location || 'Não informada'}</span>
            </div>
            <div className="info-item">
              <strong>Telefone:</strong>
              <span>{user?.phone || 'Não informado'}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Habilidades</h3>
          <div className="skills-list">
            {user?.skills?.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            )) || (
              <p className="no-skills">Nenhuma habilidade cadastrada</p>
            )}
          </div>
        </div>

        {user?.portfolio && (
          <div className="profile-section">
            <h3>Portfólio</h3>
            <a 
              href={user.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              <i className="fas fa-external-link-alt"></i>
              {user.portfolio}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;