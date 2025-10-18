// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import ProjectsPage from './pages/ProjectsPage/ProjectsPage'
import FreelancersPage from './pages/FreelancersPage/FreelancersPage'
import PostProjectPage from './pages/PostProjectPage/PostProjectPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import FreelancerProfile from './pages/FreelancerProfilePage/FreelancerProfilePage'
import { useState } from 'react'
import PublishProjectModal from './components/PublishProjectModal/PublishProjectModal'

function AppContent() {
	const { isAuthenticated } = useAuth()

	const [publishModalOpen, setPublishModalOpen] = useState(false)

	const handlePublishProject = async (projectData) => {
		console.log('Projeto publicado:', projectData)
		// Aqui você integraria com sua API
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Projeto publicado com sucesso!')
				alert('Projeto publicado com sucesso! Em breve freelancers entrarão em contato.')
				resolve()
			}, 2000)
		})
	}

	return (
		<div className='app'>
			<Header onPublishProject={() => setPublishModalOpen(true)} />

			<main className='main-content'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/projetos' element={<ProjectsPage />} />
					<Route path='/freelancers' element={<FreelancersPage />} />
					<Route path='/freelancer/:id' element={<FreelancerProfile />} />
					<Route path='/publicar' element={<PostProjectPage />} />
					<Route
						path='/login'
						element={!isAuthenticated ? <LoginPage /> : <Navigate to='/perfil' replace />}
					/>
					<Route
						path='/cadastro'
						element={!isAuthenticated ? <RegisterPage /> : <Navigate to='/perfil' replace />}
					/>
					<Route
						path='/perfil'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>

			{/* Modal de Publicação de Projeto - FORA do Header */}
			<PublishProjectModal
				isOpen={publishModalOpen}
				onClose={() => setPublishModalOpen(false)}
				onSubmit={handlePublishProject}
			/>
		</div>
	)
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<AppContent />
			</Router>
		</AuthProvider>
	)
}

export default App
