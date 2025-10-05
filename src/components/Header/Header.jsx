// components/Header/Header.jsx
import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Determina a tab ativa baseada na URL atual
  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path === '/projetos') return 'projects'
    if (path === '/freelancers') return 'freelancers'
    if (path === '/publicar') return 'post'
    return 'home'
  }

  const activeTab = getActiveTab()

  const navItems = [
    { key: 'home', icon: 'fas fa-home', label: 'Início', path: '/' },
    { key: 'projects', icon: 'fas fa-briefcase', label: 'Projetos', path: '/projetos' },
    { key: 'freelancers', icon: 'fas fa-users', label: 'Freelancers', path: '/freelancers' },
    { key: 'post', icon: 'fas fa-plus', label: 'Publicar', path: '/publicar' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <i className="fas fa-rocket"></i>
            <span>FreeLancerHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-btn ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <i className={item.icon}></i>
                {item.label}
              </button>
            ))}
          </nav>

           {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu mobile"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className="user-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/perfil" className="user-info">
                  <span className="user-avatar">{user?.avatar || '👤'}</span>
                  <span className="user-name">{user?.name || 'Usuário'}</span>
                </Link>
                <button 
                  className="btn-logout"
                  onClick={handleLogout}
                  title="Sair"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-login">Entrar</Link>
                <Link to="/cadastro" className="btn-signup">Cadastrar</Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-btn ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
          
          {/* Adicionar opções de usuário no mobile */}
          {isAuthenticated ? (
            <div className="mobile-user-actions">
              <Link 
                to="/perfil" 
                className="nav-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-user"></i>
                Meu Perfil
              </Link>
              <button 
                className="nav-btn btn-logout-mobile"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Sair
              </button>
            </div>
          ) : (
            <div className="mobile-user-actions">
              <Link 
                to="/login" 
                className="nav-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt"></i>
                Entrar
              </Link>
              <Link 
                to="/cadastro" 
                className="nav-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-user-plus"></i>
                Cadastrar
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header