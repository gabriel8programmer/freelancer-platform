// src/pages/ProfilePage/ProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileView from '../../components/ProfileView/ProfileView';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!user?.profileComplete);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (profileData) => {
    // Em uma aplicação real, aqui faria a requisição para a API
    console.log('Perfil salvo:', profileData);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarLarge}>{user?.avatar || '👤'}</div>
            <div className={styles.profileDetails}>
              <h1>{user?.name || 'Usuário'}</h1>
              <p>{user?.email}</p>
              <span className={styles.userType}>
                {user?.userType === 'freelancer' ? 'Freelancer' : 'Cliente'}
              </span>
            </div>
          </div>
          <div className={styles.profileActions}>
            {!isEditing && (
              <button 
                className={[styles.btn, styles.btnSecondary]}
                onClick={handleEditProfile}
              >
                <i className="fas fa-edit"></i>
                Editar Perfil
              </button>
            )}
            <button 
              className={[styles.btn, styles.btnOutline]}
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              Sair
            </button>
          </div>
        </div>

        <div className={styles.profileContent}>
          {isEditing ? (
            <ProfileForm 
              user={user}
              onSave={handleSaveProfile}
              onCancel={() => user?.profileComplete && setIsEditing(false)}
            />
          ) : (
            <ProfileView user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;