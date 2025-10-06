// src/services/authService.js
import api from './api'

class AuthService {
	// Login com email e senha
	async login(email, password) {
		try {
			console.log('🔐 Enviando requisição de login para:', `${api.defaults.baseURL}/auth/login`)

			const response = await api.post('/auth/login', {
				email,
				password,
			})

			console.log('✅ Resposta do login:', response.data)

			if (response.data.token) {
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('user', JSON.stringify(response.data))
				console.log('💾 Token salvo no localStorage')
			} else {
				console.warn('⚠️ Nenhum token recebido na resposta')
			}

			return response.data
		} catch (error) {
			console.error('❌ Erro no authService.login:', {
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
				url: error.config?.url,
			})
			throw this.handleError(error)
		}
	}

	// Registro de usuário
	async register(userData) {
		try {
			console.log('👤 Enviando requisição de registro:', userData)

			const response = await api.post('/auth/register', userData)

			console.log('✅ Resposta do registro:', response.data)

			if (response.data.token) {
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('user', JSON.stringify(response.data))
			}

			return response.data
		} catch (error) {
			console.error('❌ Erro no authService.register:', error.response?.data)
			throw this.handleError(error)
		}
	}

	// Login com Google (simulado)
	async loginWithGoogle(userData) {
		try {
			console.log('🔐 Enviando requisição de login Google:', userData)

			const response = await api.post('/auth/google', userData)

			console.log('✅ Resposta do login Google:', response.data)

			if (response.data.token) {
				localStorage.setItem('token', response.data.token)
				localStorage.setItem('user', JSON.stringify(response.data))
			}

			return response.data
		} catch (error) {
			console.error('❌ Erro no authService.loginWithGoogle:', error.response?.data)
			throw this.handleError(error)
		}
	}

	// Buscar dados do usuário logado
	async getCurrentUser() {
		try {
			const response = await api.get('/auth/me')
			return response.data
		} catch (error) {
			console.error('❌ Erro no authService.getCurrentUser:', error.response?.data)
			throw this.handleError(error)
		}
	}

	// Logout
	logout() {
		console.log('🚪 Fazendo logout...')
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		console.log('✅ Logout concluído')
	}

	// Verificar se está autenticado
	isAuthenticated() {
		const token = localStorage.getItem('token')
		console.log('🔍 Verificando autenticação:', !!token)
		return !!token
	}

	// Obter usuário do localStorage
	getStoredUser() {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	}

	// Obter token
	getToken() {
		return localStorage.getItem('token')
	}

	// Tratamento de erros
	handleError(error) {
		console.error('🛑 Tratando erro no authService:', error)

		// Erro de rede
		if (!error.response) {
			return new Error('Erro de conexão. Verifique sua internet e tente novamente.')
		}

		// Erro da API
		const status = error.response.status
		const message = error.response.data?.message || error.message

		switch (status) {
			case 400:
				return new Error(message || 'Dados inválidos. Verifique as informações.')
			case 401:
				return new Error(message || 'Email ou senha incorretos.')
			case 404:
				return new Error(message || 'Serviço não encontrado.')
			case 500:
				return new Error(message || 'Erro interno do servidor. Tente novamente mais tarde.')
			default:
				return new Error(message || 'Erro desconhecido. Tente novamente.')
		}
	}
}

export default new AuthService()
