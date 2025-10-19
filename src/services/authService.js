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

			if (response.data.accessToken) {
				localStorage.setItem('accessToken', response.data.accessToken)
				localStorage.setItem('user', JSON.stringify(response.data.user))
				console.log('💾 Access Token salvo no localStorage')
			} else {
				console.warn('⚠️ Nenhum access token recebido na resposta')
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

			if (response.data.accessToken) {
				localStorage.setItem('accessToken', response.data.accessToken)
				localStorage.setItem('user', JSON.stringify(response.data.user))
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

			if (response.data.accessToken) {
				localStorage.setItem('accessToken', response.data.accessToken)
				localStorage.setItem('user', JSON.stringify(response.data.user))
			}

			return response.data
		} catch (error) {
			console.error('❌ Erro no authService.loginWithGoogle:', error.response?.data)
			throw this.handleError(error)
		}
	}

	// Refresh token
	async refreshToken() {
		try {
			console.log('🔄 Tentando refresh token...')
			const response = await api.post('/auth/refresh-token')

			if (response.data.accessToken) {
				localStorage.setItem('accessToken', response.data.accessToken)
				console.log('✅ Novo access token salvo')
			}

			return response.data
		} catch (error) {
			console.error('❌ Erro no refresh token:', error.response?.data)
			throw this.handleError(error)
		}
	}

	// Logout
	async logout() {
		try {
			console.log('🚪 Fazendo logout...')
			// Chama API para logout no backend
			await api.post('/auth/logout')
		} catch (error) {
			console.error('❌ Erro ao chamar logout API:', error.response?.data)
			// Continua mesmo com erro na API
		} finally {
			// Sempre limpa o localStorage
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			console.log('✅ Logout concluído')
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

	// Verificar se está autenticado
	isAuthenticated() {
		const token = localStorage.getItem('accessToken')
		const hasUser = localStorage.getItem('user')
		console.log('🔍 Verificando autenticação:', !!token && !!hasUser)
		return !!token && !!hasUser
	}

	// Obter usuário do localStorage
	getStoredUser() {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	}

	// Obter token
	getToken() {
		return localStorage.getItem('accessToken')
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
			case 403:
				if (error.response.data?.code === 'TOKEN_EXPIRED') {
					return new Error('Sessão expirada. Faça login novamente.')
				}
				return new Error(message || 'Acesso não autorizado.')
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
