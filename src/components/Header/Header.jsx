// components/Header/Header.jsx
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'
import Button from '../Button/Button'
import LinkButton from '../LinkButton/LinkButton'
import styles from './Header.module.css'

const Header = ({ onPublishProject }) => {
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

	// Determina a tab ativa baseada na URL atual (incluindo rotas aninhadas)
	const getActiveTab = () => {
		const path = location.pathname

		if (path === '/' || path.startsWith('/home')) return 'home'
		if (path.startsWith('/projetos') || path.startsWith('/project')) return 'projects'
		if (path.startsWith('/freelancers') || path.startsWith('/freelancer')) return 'freelancers'
		if (path.startsWith('/perfil') || path.startsWith('/profile')) return 'profile'
		if (path.startsWith('/meus-projetos') || path.startsWith('/my-projects')) return 'my-projects'
		if (path.startsWith('/configuracoes') || path.startsWith('/settings')) return 'settings'

		return 'home'
	}

	const activeTab = getActiveTab()

	const navItems = [
		{ key: 'home', icon: 'fas fa-home', label: 'Início', path: '/' },
		{ key: 'projects', icon: 'fas fa-briefcase', label: 'Projetos', path: '/projetos' },
		{ key: 'freelancers', icon: 'fas fa-users', label: 'Freelancers', path: '/freelancers' },
	]

	const handleNavClick = (path) => {
		navigate(path)
		setMobileMenuOpen(false)
	}

	const handlePublishClick = () => {
		onPublishProject()
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
			<div className='container'>
				<div className={styles.headerContent}>
					<Link to='/' className={styles.logo}>
						<i className='fas fa-rocket'></i>
						<span>FreeLancerHub</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className={styles.navDesktop}>
						{navItems.map((item) => (
							<Button
								key={item.key}
								variant={activeTab === item.key ? 'primary' : 'ghost'}
								size='medium'
								onClick={() => handleNavClick(item.path)}
								startIcon={<i className={item.icon}></i>}
								className={`${styles.navBtn} ${activeTab === item.key ? styles.active : ''}`}
							>
								{item.label}
							</Button>
						))}

						{/* Botão Publicar que chama a função do parent */}
						<Button
							variant='secondary'
							size='medium'
							onClick={handlePublishClick}
							startIcon={<i className='fas fa-plus'></i>}
							className={styles.publishBtn}
						>
							Publicar
						</Button>
					</nav>

					{/* User Actions */}
					<div className={styles.userActions}>
						{!isAuthenticated ? (
							<div className={styles.authButtons}>
								<LinkButton
									to='/login'
									variant='outline'
									size='medium'
									startIcon={<i className='fas fa-sign-in-alt'></i>}
									className={styles.btnLogin}
								>
									Entrar
								</LinkButton>
								<LinkButton
									to='/cadastro'
									variant='primary'
									size='medium'
									startIcon={<i className='fas fa-user-plus'></i>}
									className={styles.btnSignup}
								>
									Cadastrar
								</LinkButton>
							</div>
						) : (
							<div className={styles.userMenuWrapper} ref={dropdownRef}>
								<Button
									variant='ghost'
									size='medium'
									onClick={toggleUserDropdown}
									startIcon={
										<Avatar
											name={getDisplayName()}
											src={user?.avatar}
											size='28'
											round={true}
											textSizeRatio={2}
											className={styles.userAvatar}
										/>
									}
									endIcon={
										<i
											className={`fas fa-chevron-${userDropdownOpen ? 'up' : 'down'} ${
												styles.dropdownArrow
											}`}
										></i>
									}
									className={styles.userProfileBtn}
									aria-expanded={userDropdownOpen}
									aria-haspopup='true'
								>
									<span className={styles.userName}>{getDisplayName()}</span>
								</Button>

								{/* User Dropdown */}
								{userDropdownOpen && (
									<div className={styles.userDropdown}>
										<div className={styles.dropdownHeader}>
											<Avatar
												name={getDisplayName()}
												src={user?.avatar}
												size='52'
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

										{/* Links do dropdown como elementos normais */}
										<Link
											to='/perfil'
											className={styles.dropdownItem}
											onClick={() => setUserDropdownOpen(false)}
										>
											<i className='fas fa-user'></i>
											Meu Perfil
										</Link>

										<Link
											to='/meus-projetos'
											className={styles.dropdownItem}
											onClick={() => setUserDropdownOpen(false)}
										>
											<i className='fas fa-briefcase'></i>
											Meus Projetos
										</Link>

										<Link
											to='/configuracoes'
											className={styles.dropdownItem}
											onClick={() => setUserDropdownOpen(false)}
										>
											<i className='fas fa-cog'></i>
											Configurações
										</Link>

										<div className={styles.dropdownDivider}></div>

										{/* Botão Sair com estilo vermelho */}
										<button
											className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
											onClick={handleLogout}
										>
											<i className='fas fa-sign-out-alt'></i>
											Sair
										</button>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<Button
						variant='ghost'
						size='small'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						startIcon={<i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>}
						className={styles.mobileMenuBtn}
						aria-label='Menu mobile'
					/>
				</div>

				{/* Mobile Navigation */}
				<nav className={`${styles.navMobile} ${mobileMenuOpen ? styles.open : ''}`}>
					{navItems.map((item) => (
						<Button
							key={item.key}
							variant={activeTab === item.key ? 'primary' : 'ghost'}
							size='medium'
							onClick={() => handleNavClick(item.path)}
							startIcon={<i className={item.icon}></i>}
							className={`${styles.navBtn} ${activeTab === item.key ? styles.active : ''}`}
							fullWidth
						>
							{item.label}
						</Button>
					))}

					{/* Botão Publicar no Mobile */}
					<Button
						variant='secondary'
						size='medium'
						onClick={handlePublishClick}
						startIcon={<i className='fas fa-plus'></i>}
						className={styles.publishBtnMobile}
						fullWidth
					>
						Publicar
					</Button>

					{/* Mobile User Actions */}
					{isAuthenticated ? (
						<div className={styles.mobileUserActions}>
							<div className={styles.mobileUserInfo}>
								<Avatar
									name={getDisplayName()}
									src={user?.avatar}
									size='52'
									round={true}
									textSizeRatio={2}
									className={styles.mobileUserAvatar}
								/>
								<div className={styles.mobileUserDetails}>
									<strong>{getDisplayName()}</strong>
									<span>{user?.email}</span>
								</div>
							</div>

							{/* Links mobile como elementos normais */}
							<Link to='/perfil' className={styles.navBtn} onClick={() => setMobileMenuOpen(false)}>
								<i className='fas fa-user'></i>
								Meu Perfil
							</Link>

							<Link
								to='/meus-projetos'
								className={styles.navBtn}
								onClick={() => setMobileMenuOpen(false)}
							>
								<i className='fas fa-briefcase'></i>
								Meus Projetos
							</Link>

							<Link
								to='/configuracoes'
								className={styles.navBtn}
								onClick={() => setMobileMenuOpen(false)}
							>
								<i className='fas fa-cog'></i>
								Configurações
							</Link>

							{/* Botão Sair mobile com estilo vermelho */}
							<button
								className={`${styles.navBtn} ${styles.btnLogoutMobile}`}
								onClick={handleLogout}
							>
								<i className='fas fa-sign-out-alt'></i>
								Sair
							</button>
						</div>
					) : (
						<div className={styles.mobileUserActions}>
							<LinkButton
								to='/login'
								variant='outline'
								size='medium'
								onClick={() => setMobileMenuOpen(false)}
								startIcon={<i className='fas fa-sign-in-alt'></i>}
								className={styles.navBtn}
								fullWidth
							>
								Entrar
							</LinkButton>
							<LinkButton
								to='/cadastro'
								variant='primary'
								size='medium'
								onClick={() => setMobileMenuOpen(false)}
								startIcon={<i className='fas fa-user-plus'></i>}
								className={styles.navBtn}
								fullWidth
							>
								Cadastrar
							</LinkButton>
						</div>
					)}
				</nav>
			</div>
		</header>
	)
}

export default Header
