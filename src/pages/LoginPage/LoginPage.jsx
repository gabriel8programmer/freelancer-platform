// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de login
    setTimeout(() => {
      const user = {
        id: '1',
        name: 'João Freelancer',
        email: formData.email,
        avatar: '👨‍💻',
        loginType: 'email',
        profileComplete: false
      };
      
      login(user);
      navigate('/perfil');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSuccess = (user) => {
    login(user);
    navigate('/perfil');
  };

  const handleGoogleFailure = (error) => {
    console.error('Erro no login com Google:', error);
    alert('Erro ao fazer login com Google. Tente novamente.');
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="login-header">
            <h1>Entrar no FreeLancerHub</h1>
            <p>Encontre os melhores projetos e mostre seu talento</p>
          </div>

          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
          />

          <div className="divider">
            <span>ou entre com email</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Sua senha"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-login"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;