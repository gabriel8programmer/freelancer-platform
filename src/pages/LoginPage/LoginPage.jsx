// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import { authService } from '../../services';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpar erro quando o usuário começar a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Isso previne o recarregamento da página
    
    console.log('🔐 Tentando fazer login...', { email: formData.email });
    
    // Validação básica
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('📡 Chamando authService.login...');
      
      // Usar o authService para fazer login real
      const userData = await authService.login(formData.email, formData.password);
      
      console.log('✅ Login bem-sucedido:', userData);
      
      // Fazer login no contexto de autenticação
      login(userData);
      
      console.log('🔄 Redirecionando...');
      
      // Redirecionar baseado no tipo de usuário ou perfil completo
      if (!userData.profileComplete) {
        navigate('/perfil');
      } else if (userData.userType === 'freelancer') {
        navigate('/');
      } else {
        navigate('/projetos');
      }
      
    } catch (err) {
      console.error('❌ Erro no login:', err);
      console.error('❌ Detalhes do erro:', {
        message: err.message,
        stack: err.stack,
        response: err.response?.data
      });
      
      // Mostrar erro específico da API ou mensagem genérica
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (user) => {
    try {
      setIsLoading(true);
      setError('');

      console.log('🔐 Login com Google:', user);
      
      // Usar o authService para login com Google
      const userData = await authService.loginWithGoogle({
        name: user.name,
        email: user.email
      });
      
      console.log('✅ Login Google bem-sucedido:', userData);
      
      // Fazer login no contexto
      login(userData);
      
      // Redirecionar
      if (!userData.profileComplete) {
        navigate('/perfil');
      } else {
        navigate('/');
      }
      
    } catch (err) {
      console.error('❌ Erro no login com Google:', err);
      console.error('❌ Detalhes do erro Google:', err.response?.data);
      
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao fazer login com Google. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('❌ Falha no login com Google:', error);
    setError('Erro ao fazer login com Google. Tente novamente.');
  };

  // Função para preencher dados de teste (apenas desenvolvimento)
  const fillTestCredentials = (userType = 'freelancer') => {
    if (userType === 'freelancer') {
      setFormData({
        email: 'ana.silva@email.com',
        password: '123456'
      });
    } else {
      setFormData({
        email: 'contato@techsolutions.com',
        password: '123456'
      });
    }
    setError('');
  };

  // Função para debug - verificar estado atual
  const debugState = () => {
    console.log('🐛 Estado atual:', {
      formData,
      isLoading,
      error,
      hasToken: !!authService.getToken(),
      storedUser: authService.getStoredUser()
    });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card">
          <div className="login-header">
            <h1>Entrar no FreeLancerHub</h1>
            <p>Encontre os melhores projetos e mostre seu talento</p>
          </div>

          {/* Botão de debug (apenas desenvolvimento) */}
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <button 
              type="button"
              onClick={debugState}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              🐛 Debug
            </button>
          )}

          {/* Botões de teste (apenas desenvolvimento) */}
          {import.meta.env.VITE_NODE_ENV === 'development' && (
            <div className="test-buttons">
              <p className="test-label">Dados de teste:</p>
              <div className="test-buttons-group">
                <button 
                  type="button"
                  className="btn btn-outline btn-test"
                  onClick={() => fillTestCredentials('freelancer')}
                  disabled={isLoading}
                >
                  Freelancer Teste
                </button>
                <button 
                  type="button"
                  className="btn btn-outline btn-test"
                  onClick={() => fillTestCredentials('client')}
                  disabled={isLoading}
                >
                  Cliente Teste
                </button>
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>
                Senha: 123456
              </div>
            </div>
          )}

          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            disabled={isLoading}
          />

          <div className="divider">
            <span>ou entre com email</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                <div>
                  <strong>Erro no login:</strong>
                  <div style={{ marginTop: '0.25rem' }}>{error}</div>
                </div>
              </div>
            )}

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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-login"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Entrando...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Entrar
                </>
              )}
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