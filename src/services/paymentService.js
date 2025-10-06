// src/services/paymentService.js
import api from './api'

class PaymentService {
	// Criar pagamento
	async createPayment(paymentData) {
		try {
			const response = await api.post('/payments', paymentData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar pagamentos do usuário
	async getPayments(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/payments?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar pagamento por ID
	async getPaymentById(id) {
		try {
			const response = await api.get(`/payments/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Processar pagamento (simulado)
	async processPayment(paymentId, transactionData = {}) {
		try {
			const response = await api.post(`/payments/${paymentId}/process`, transactionData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Solicitar reembolso
	async requestRefund(paymentId, reason) {
		try {
			const response = await api.post(`/payments/${paymentId}/refund`, { reason })
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar estatísticas de pagamento
	async getPaymentStats() {
		try {
			const response = await api.get('/payments/stats')
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

export default new PaymentService()
