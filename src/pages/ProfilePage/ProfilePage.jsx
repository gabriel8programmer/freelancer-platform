// src/pages/ProfilePage/ProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileView from '../../components/ProfileView/ProfileView';
import './ProfilePage.css';

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
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar-large">{user?.avatar || '👤'}</div>
            <div className="profile-details">
              <h1>{user?.name || 'Usuário'}</h1>
              <p>{user?.email}</p>
              <span className="user-type">
                {user?.userType === 'freelancer' ? 'Freelancer' : 'Cliente'}
              </span>
            </div>
          </div>
          <div className="profile-actions">
            {!isEditing && (
              <button 
                className="btn btn-secondary"
                onClick={handleEditProfile}
              >
                <i className="fas fa-edit"></i>
                Editar Perfil
              </button>
            )}
            <button 
              className="btn btn-outline"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              Sair
            </button>
          </div>
        </div>

        <div className="profile-content">
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