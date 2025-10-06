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

	// Upload de avatar (simulado)
	async uploadAvatar(file) {
		try {
			// Em uma implementação real, aqui faria o upload para um serviço como AWS S3
			// Por enquanto, vamos simular um delay e retornar uma URL fictícia
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						url: `https://ui-avatars.com/api/?name=User&background=random&size=128`,
						message: 'Avatar atualizado com sucesso',
					})
				}, 1000)
			})
		} catch (error) {
			throw this.handleError(error)
		}
	}

	handleError(error) {
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
