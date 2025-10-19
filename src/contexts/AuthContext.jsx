// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider')
	}
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Verificar autenticação ao inicializar
	useEffect(() => {
		checkAuth()
	}, [])

	const checkAuth = async () => {
		try {
			setLoading(true)
			setError(null)

			if (authService.isAuthenticated()) {
				const storedUser = authService.getStoredUser()
				if (storedUser) {
					setUser(storedUser)
					setIsAuthenticated(true)
					console.log('✅ Usuário autenticado encontrado no storage')
				} else {
					// Se tem token mas não tem user, busca dados atualizados
					const userData = await authService.getCurrentUser()
					setUser(userData)
					setIsAuthenticated(true)
					localStorage.setItem('user', JSON.stringify(userData))
					console.log('✅ Dados do usuário atualizados da API')
				}
			} else {
				console.log('🔐 Nenhum usuário autenticado encontrado')
			}
		} catch (error) {
			console.error('❌ Erro ao verificar autenticação:', error)
			setError(error.message)
			// Se deu erro ao buscar usuário, faz logout
			await logout()
		} finally {
			setLoading(false)
		}
	}

	const login = async (email, password) => {
		try {
			setLoading(true)
			setError(null)

			const result = await authService.login(email, password)
			setUser(result.user)
			setIsAuthenticated(true)

			console.log('✅ Login realizado com sucesso')
			return { success: true, user: result.user }
		} catch (error) {
			const message = error.message || 'Erro no login'
			setError(message)
			console.error('❌ Erro no login:', error)
			return { success: false, message }
		} finally {
			setLoading(false)
		}
	}

	const register = async (userData) => {
		try {
			setLoading(true)
			setError(null)

			const result = await authService.register(userData)
			setUser(result.user)
			setIsAuthenticated(true)

			console.log('✅ Registro realizado com sucesso')
			return { success: true, user: result.user }
		} catch (error) {
			const message = error.message || 'Erro no registro'
			setError(message)
			console.error('❌ Erro no registro:', error)
			return { success: false, message }
		} finally {
			setLoading(false)
		}
	}

	const loginWithGoogle = async (googleData) => {
		try {
			setLoading(true)
			setError(null)

			const result = await authService.loginWithGoogle(googleData)
			setUser(result.user)
			setIsAuthenticated(true)

			console.log('✅ Login com Google realizado com sucesso')
			return { success: true, user: result.user }
		} catch (error) {
			const message = error.message || 'Erro no login com Google'
			setError(message)
			console.error('❌ Erro no login com Google:', error)
			return { success: false, message }
		} finally {
			setLoading(false)
		}
	}

	const logout = async () => {
		try {
			setLoading(true)
			await authService.logout()
		} catch (error) {
			console.error('❌ Erro no logout:', error)
			// Continua mesmo com erro
		} finally {
			setUser(null)
			setIsAuthenticated(false)
			setError(null)
			setLoading(false)
			console.log('✅ Logout concluído no contexto')
		}
	}

	const refreshToken = async () => {
		try {
			const result = await authService.refreshToken()
			if (result.user) {
				setUser(result.user)
				localStorage.setItem('user', JSON.stringify(result.user))
			}
			return { success: true }
		} catch (error) {
			console.error('❌ Erro ao refresh token:', error)
			await logout()
			return { success: false, message: error.message }
		}
	}

	const updateUser = (updatedUser) => {
		setUser(updatedUser)
		localStorage.setItem('user', JSON.stringify(updatedUser))
	}

	const clearError = () => setError(null)

	const value = {
		user,
		isAuthenticated,
		loading,
		error,
		login,
		register,
		loginWithGoogle,
		logout,
		refreshToken,
		updateUser,
		checkAuth,
		clearError,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
