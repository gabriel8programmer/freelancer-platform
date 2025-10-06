// src/services/skillService.js
import api from './api'

class SkillService {
	// Buscar todas as habilidades
	async getSkills(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/skills?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar habilidades populares
	async getPopularSkills(limit = 10) {
		try {
			const response = await api.get(`/skills/popular?limit=${limit}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar categorias de habilidades
	async getSkillCategories() {
		try {
			// Esta é uma implementação mockada - no backend seria uma rota específica
			const categories = [
				'Desenvolvimento Web',
				'Mobile',
				'Design UI/UX',
				'Marketing Digital',
				'Redação e Conteúdo',
				'DevOps e Infraestrutura',
				'Banco de Dados',
				'Outros',
			]

			return { categories }
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

export default new SkillService()
