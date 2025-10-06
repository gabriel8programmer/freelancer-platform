// src/services/proposalService.js
import api from './api'

class ProposalService {
	// Buscar minhas propostas
	async getMyProposals(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/proposals/my-proposals?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar proposta por ID
	async getProposalById(id) {
		try {
			const response = await api.get(`/proposals/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Aceitar proposta (cliente)
	async acceptProposal(projectId, proposalId) {
		try {
			const response = await api.put(`/proposals/projects/${projectId}/proposals/${proposalId}`, {
				action: 'accept',
			})
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Recusar proposta (cliente)
	async rejectProposal(projectId, proposalId) {
		try {
			const response = await api.put(`/proposals/projects/${projectId}/proposals/${proposalId}`, {
				action: 'reject',
			})
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Cancelar proposta (freelancer)
	async cancelProposal(projectId, proposalId) {
		try {
			const response = await api.delete(`/projects/${projectId}/proposals/${proposalId}`)
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

export default new ProposalService()
