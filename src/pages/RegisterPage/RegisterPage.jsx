// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer'
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsLoading(true);

    // Simulação de cadastro
    setTimeout(() => {
      const user = {
        id: 'user_' + Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: '👤',
        loginType: 'email',
        userType: formData.userType,
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

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-card">
          <div className="register-header">
            <h1>Criar Conta</h1>
            <p>Junte-se à nossa comunidade de freelancers</p>
          </div>

          <GoogleLoginButton onSuccess={handleGoogleSuccess} />

          <div className="divider">
            <span>ou cadastre-se com email</span>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
              />
            </div>

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
              <label htmlFor="userType">Tipo de Usuário</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="freelancer">Quero Trabalhar como Freelancer</option>
                <option value="client">Quero Contratar Freelancers</option>
              </select>
            </div>

            <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-register"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;