// components/Header/Header.jsx
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'
import styles from './Header.module.css'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Determina a tab ativa baseada na URL atual
  const getActiveTab = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path === '/projetos') return 'projects'
    if (path === '/freelancers') return 'freelancers'
    if (path === '/publicar') return 'post'
    if (path === '/perfil') return 'profile'
    if (path === '/meus-projetos') return 'my-projects'
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
    setUserDropdownOpen(false)
  }

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen)
  }

  // Obter nome de exibição
  const getDisplayName = () => {
    return user?.name || user?.username || 'Usuário'
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <i className="fas fa-rocket"></i>
            <span>FreeLancerHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop}>
            {navItems.map(item => (
              <button
                key={item.key}
                className={`${styles.navBtn} ${activeTab === item.key ? styles.active : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <i className={item.icon}></i>
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className={styles.userActions}>
            {!isAuthenticated ? (
              <div className={styles.authButtons}>
                <Link to="/login" className={styles.btnLogin}>
                  <i className="fas fa-sign-in-alt"></i>
                  Entrar
                </Link>
                <Link to="/cadastro" className={styles.btnSignup}>
                  <i className="fas fa-user-plus"></i>
                  Cadastrar
                </Link>
              </div>
            ) : (
              <div className={styles.userMenuWrapper} ref={dropdownRef}>
                <button 
                  className={styles.userProfileBtn}
                  onClick={toggleUserDropdown}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <Avatar
                    name={getDisplayName()}
                    src={user?.avatar}
                    size="36"
                    round={true}
                    textSizeRatio={2}
                    className={styles.userAvatar}
                  />
                  <span className={styles.userName}>{getDisplayName()}</span>
                  <i className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'} ${styles.dropdownArrow}`}></i>
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className={styles.userDropdown}>
                    <div className={styles.dropdownHeader}>
                      <Avatar
                        name={getDisplayName()}
                        src={user?.avatar}
                        size="52"
                        round={true}
                        textSizeRatio={2}
                        className={styles.dropdownAvatar}
                      />
                      <div className={styles.dropdownUserInfo}>
                        <strong>{getDisplayName()}</strong>
                        <span>{user?.email}</span>
                      </div>
                    </div>
                    
                    <div className={styles.dropdownDivider}></div>
                    
                    <Link 
                      to="/perfil" 
                      className={styles.dropdownItem}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <i className="fas fa-user"></i>
                      Meu Perfil
                    </Link>
                    
                    <Link 
                      to="/meus-projetos" 
                      className={styles.dropdownItem}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <i className="fas fa-briefcase"></i>
                      Meus Projetos
                    </Link>
                    
                    <Link 
                      to="/configuracoes" 
                      className={styles.dropdownItem}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <i className="fas fa-cog"></i>
                      Configurações
                    </Link>

                    <div className={styles.dropdownDivider}></div>
                    
                    <button 
                      className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu mobile"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`${styles.navMobile} ${mobileMenuOpen ? styles.open : ''}`}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={`${styles.navBtn} ${activeTab === item.key ? styles.active : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
          
          {/* Mobile User Actions */}
          {isAuthenticated ? (
            <div className={styles.mobileUserActions}>
              <div className={styles.mobileUserInfo}>
                <Avatar
                  name={getDisplayName()}
                  src={user?.avatar}
                  size="52"
                  round={true}
                  textSizeRatio={2}
                  className={styles.mobileUserAvatar}
                />
                <div className={styles.mobileUserDetails}>
                  <strong>{getDisplayName()}</strong>
                  <span>{user?.email}</span>
                </div>
              </div>
              
              <Link 
                to="/perfil" 
                className={styles.navBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-user"></i>
                Meu Perfil
              </Link>
              
              <Link 
                to="/meus-projetos" 
                className={styles.navBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-briefcase"></i>
                Meus Projetos
              </Link>
              
              <Link 
                to="/configuracoes" 
                className={styles.navBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-cog"></i>
                Configurações
              </Link>
              
              <button 
                className={`${styles.navBtn} ${styles.btnLogoutMobile}`}
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Sair
              </button>
            </div>
          ) : (
            <div className={styles.mobileUserActions}>
              <Link 
                to="/login" 
                className={styles.navBtn}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt"></i>
                Entrar
              </Link>
              <Link 
                to="/cadastro" 
                className={styles.navBtn}
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