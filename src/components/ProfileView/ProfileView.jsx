// src/components/ProfileView/ProfileView.jsx
import React from 'react';
import styles from './ProfileView.module.css';

const ProfileView = ({ user }) => {
  return (
    <div className={styles.profileView}>
      <div className={styles.profileCard}>
        <div className={styles.profileSection}>
          <h3>Sobre</h3>
          <p className={styles.profileBio}>
            {user?.bio || 'Complete seu perfil para contar mais sobre você.'}
          </p>
        </div>

        <div className={styles.profileSection}>
          <h3>Informações Profissionais</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Título:</strong>
              <span>{user?.title || 'Não informado'}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Taxa/Hora:</strong>
              <span>{user?.hourlyRate ? `R$ ${user.hourlyRate}` : 'Não informada'}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Localização:</strong>
              <span>{user?.location || 'Não informada'}</span>
            </div>
            <div className={styles.infoItem}>
              <strong>Telefone:</strong>
              <span>{user?.phone || 'Não informado'}</span>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3>Habilidades</h3>
          <div className={styles.skillsList}>
            {user?.skills?.map((skill, index) => (
              <span key={index} className={styles.skillTag}>{skill}</span>
            )) || (
              <p className={styles.noSkills}>Nenhuma habilidade cadastrada</p>
            )}
          </div>
        </div>

        {user?.portfolio && (
          <div className={styles.profileSection}>
            <h3>Portfólio</h3>
            <a 
              href={user.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.portfolioLink}
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