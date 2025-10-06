// src/services/dashboardService.js
import api from './api'

class DashboardService {
	// Buscar estatísticas do dashboard
	async getStats() {
		try {
			const response = await api.get('/dashboard/stats')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar atividade recente
	async getRecentActivity() {
		try {
			const response = await api.get('/dashboard/recent-activity')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar métricas gerais
	async getMetrics() {
		try {
			// Podemos combinar várias chamadas aqui
			const [stats, activity] = await Promise.all([this.getStats(), this.getRecentActivity()])

			return {
				stats: stats.stats,
				userType: stats.userType,
				recentActivity: activity,
			}
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

export default new DashboardService()
