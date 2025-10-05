// components/Header/Header.jsx
import React, { useState } from 'react'
import './Header.css'

const Header = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', icon: 'fas fa-home', label: 'Início' },
    { key: 'projects', icon: 'fas fa-briefcase', label: 'Projetos' },
    { key: 'freelancers', icon: 'fas fa-users', label: 'Freelancers' },
    { key: 'post', icon: 'fas fa-plus', label: 'Publicar' }
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-rocket"></i>
            <span>FreeLancerHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-btn ${activeTab === item.key ? 'active' : ''}`}
                onClick={() => setActiveTab(item.key)}
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
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className="user-actions">
            <button className="btn-login">Entrar</button>
            <button className="btn-signup">Cadastrar</button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-btn ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.key)
                setMobileMenuOpen(false)
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header