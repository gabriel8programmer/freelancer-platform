// src/components/GoogleLoginButton/GoogleLoginButton.jsx
import React from 'react';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const handleGoogleLogin = () => {
    // Simulação de login com Google
    const mockUser = {
      id: 'google_' + Date.now(),
      name: 'Usuário Google',
      email: 'usuario.google@example.com',
      avatar: '👤',
      loginType: 'google'
    };
    
    onSuccess(mockUser);
  };

  return (
    <button 
      className="google-login-btn"
      onClick={handleGoogleLogin}
      type="button"
    >
      <div className="google-btn-content">
        <i className="fab fa-google"></i>
        <span>Continuar com Google</span>
      </div>
    </button>
  );
};

export default GoogleLoginButton;