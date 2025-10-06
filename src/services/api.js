// src/services/api.js
import axios from 'axios'

// Configuração base do Axios
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
	timeout: 10000, // 10 segundos
	headers: {
		'Content-Type': 'application/json',
	},
})

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token expirado ou inválido
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			window.location.href = '/login'
		}
		return Promise.reject(error)
	},
)

export default api
