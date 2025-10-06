// src/services/projectService.js
import api from './api'

class ProjectService {
	// Buscar todos os projetos
	async getProjects(filters = {}) {
		try {
			const params = new URLSearchParams()

			Object.keys(filters).forEach((key) => {
				if (filters[key]) {
					params.append(key, filters[key])
				}
			})

			const response = await api.get(`/projects?${params}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar projeto por ID
	async getProjectById(id) {
		try {
			const response = await api.get(`/projects/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Criar novo projeto
	async createProject(projectData) {
		try {
			const response = await api.post('/projects', projectData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Atualizar projeto
	async updateProject(id, projectData) {
		try {
			const response = await api.put(`/projects/${id}`, projectData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Excluir projeto
	async deleteProject(id) {
		try {
			const response = await api.delete(`/projects/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Enviar proposta para projeto
	async sendProposal(projectId, proposalData) {
		try {
			const response = await api.post(`/projects/${projectId}/proposals`, proposalData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Buscar projetos do usuário logado
	async getMyProjects() {
		try {
			const response = await api.get('/projects/my-projects')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Atribuir projeto a freelancer
	async assignProject(projectId, assignmentData) {
		try {
			const response = await api.patch(`/projects/${projectId}/assign`, assignmentData)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	}

	// Aceitar/recusar proposta
	async updateProposalStatus(projectId, proposalId, action) {
		try {
			const response = await api.put(`/proposals/projects/${projectId}/proposals/${proposalId}`, {
				action,
			})
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

export default new ProjectService()
