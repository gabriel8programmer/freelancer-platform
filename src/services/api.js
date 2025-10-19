// src/services/api.js
import axios from 'axios'

// Configuração base do Axios
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
	timeout: 10000,
	withCredentials: true, // ← IMPORTANTE para cookies
	headers: {
		'Content-Type': 'application/json',
	},
})

// Flag para evitar múltiplos refresh simultâneos
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken') // ← Mudei para accessToken
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// Interceptor para tratar erros e refresh token
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		// Se erro 403 (token expirado) e não é tentativa de refresh
		if (
			error.response?.status === 403 &&
			error.response?.data?.code === 'TOKEN_EXPIRED' &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				// Se já está refrescando, adiciona na fila
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return api(originalRequest)
					})
					.catch((err) => {
						return Promise.reject(err)
					})
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				// Tenta refresh do token
				const response = await api.post('/auth/refresh-token')
				const newAccessToken = response.data.accessToken

				// Salva novo token
				localStorage.setItem('accessToken', newAccessToken)

				// Atualiza header da requisição original
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

				// Processa fila de requisições aguardando
				processQueue(null, newAccessToken)

				// Retenta requisição original
				return api(originalRequest)
			} catch (refreshError) {
				// Refresh falhou - faz logout
				processQueue(refreshError, null)
				localStorage.removeItem('accessToken')
				localStorage.removeItem('user')

				// Redireciona para login
				if (window.location.pathname !== '/login') {
					window.location.href = '/login'
				}

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		// Outros erros 401/403 - faz logout
		if (error.response?.status === 401 || error.response?.status === 403) {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('user')
			if (window.location.pathname !== '/login') {
				window.location.href = '/login'
			}
		}

		return Promise.reject(error)
	},
)

export default api
