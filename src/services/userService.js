// src/services/userService.js
import api from './api'

class UserService {
	// Atualizar perfil do usuário
	async updateProfile(profileData) {
		try {
			const response = await api.put('/users/profile', profileData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar todos os freelancers
	async getFreelancers(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/users/freelancers?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar freelancer por ID
	async getFreelancerById(id) {
		try {
			const response = await api.get(`/users/freelancers/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar freelancers similares (por habilidades)
	async getSimilarFreelancers(freelancerId, limit = 4) {
		try {
			const response = await api.get(`/users/freelancers/${freelancerId}/similar?limit=${limit}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar avaliações do freelancer
	async getFreelancerReviews(freelancerId, page = 1) {
		try {
			const response = await api.get(`/users/freelancers/${freelancerId}/reviews?page=${page}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Adicionar avaliação ao freelancer
	async addFreelancerReview(freelancerId, reviewData) {
		try {
			const response = await api.post(`/users/freelancers/${freelancerId}/reviews`, reviewData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Verificar disponibilidade do freelancer
	async checkFreelancerAvailability(freelancerId) {
		try {
			const response = await api.get(`/users/freelancers/${freelancerId}/availability`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar portfólio do freelancer
	async getFreelancerPortfolio(freelancerId) {
		try {
			const response = await api.get(`/users/freelancers/${freelancerId}/portfolio`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar todos os clientes
	async getClients(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/users/clients?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar cliente por ID
	async getClientById(id) {
		try {
			const response = await api.get(`/users/clients/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Upload de avatar
	async uploadAvatar(file) {
		try {
			const formData = new FormData()
			formData.append('avatar', file)

			const response = await api.post('/users/upload-avatar', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar estatísticas do usuário
	async getUserStats(userId) {
		try {
			const response = await api.get(`/users/${userId}/stats`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	handleError(error) {
		console.error('Erro no UserService:', error)

		if (error.response?.data?.message) {
			throw new Error(error.response.data.message)
		} else if (error.message) {
			throw new Error(error.message)
		} else {
			throw new Error('Erro de conexão. Tente novamente.')
		}
	}
}

export default new UserService()
