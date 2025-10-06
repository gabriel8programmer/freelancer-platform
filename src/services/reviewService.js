// src/services/reviewService.js
import api from './api'

class ReviewService {
	// Criar avaliação para projeto
	async createReview(projectId, reviewData) {
		try {
			const response = await api.post(`/reviews/project/${projectId}`, reviewData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar avaliações de um usuário
	async getUserReviews(userId, filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/reviews/user/${userId}?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar minhas avaliações
	async getMyReviews(filters = {}) {
		try {
			// Esta rota precisaria ser implementada no backend
			// Por enquanto, vamos usar uma abordagem alternativa
			const user = JSON.parse(localStorage.getItem('user'))
			if (user) {
				return this.getUserReviews(user._id, filters)
			}
			return { reviews: [], total: 0 }
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Atualizar avaliação
	async updateReview(reviewId, reviewData) {
		try {
			const response = await api.put(`/reviews/${reviewId}`, reviewData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Excluir avaliação
	async deleteReview(reviewId) {
		try {
			const response = await api.delete(`/reviews/${reviewId}`)
			return response.data
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

export default new ReviewService()
