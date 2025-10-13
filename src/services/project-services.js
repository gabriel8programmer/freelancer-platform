// services/projects-service.js
import API from './API.js'
import {
  ProjectFiltersSchema,
  CreateProjectSchema,
  SubmitProposalSchema,
  UpdateProjectSchema,
  AssignProjectSchema,
  ProjectIdSchema
} from '../schemas/projects-schema.js'

class ProjectsService {
  /**
   * Buscar todos os projetos com filtros e paginação
   * @param {Object} filters - Filtros de busca
   * @returns {Promise<Object>} Lista de projetos paginada
   */
  async getProjects(filters = {}) {
    try {
      // Validar filtros
      const validatedFilters = ProjectFiltersSchema.parse({
        ...filters,
        page: Number(filters.page) || 1,
        limit: Number(filters.limit) || 10
      })

      const response = await API.get('/projects', {
        params: validatedFilters
      })

      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Buscar projeto por ID
   * @param {string} projectId - ID do projeto
   * @returns {Promise<Object>} Dados do projeto
   */
  async getProjectById(projectId) {
    try {
      const validatedId = ProjectIdSchema.parse(projectId)
      
      const response = await API.get(`/projects/${validatedId}`)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Criar novo projeto
   * @param {Object} projectData - Dados do projeto
   * @returns {Promise<Object>} Projeto criado
   */
  async createProject(projectData) {
    try {
      const validatedData = CreateProjectSchema.parse(projectData)
      
      const response = await API.post('/projects', validatedData)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Atualizar projeto existente
   * @param {string} projectId - ID do projeto
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Object>} Projeto atualizado
   */
  async updateProject(projectId, updateData) {
    try {
      const validatedId = ProjectIdSchema.parse(projectId)
      const validatedData = UpdateProjectSchema.parse(updateData)
      
      const response = await API.put(`/projects/${validatedId}`, validatedData)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Excluir projeto
   * @param {string} projectId - ID do projeto
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async deleteProject(projectId) {
    try {
      const validatedId = ProjectIdSchema.parse(projectId)
      
      const response = await API.delete(`/projects/${validatedId}`)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Enviar proposta para projeto
   * @param {string} projectId - ID do projeto
   * @param {Object} proposalData - Dados da proposta
   * @returns {Promise<Object>} Mensagem de sucesso
   */
  async submitProposal(projectId, proposalData) {
    try {
      const validatedId = ProjectIdSchema.parse(projectId)
      const validatedData = SubmitProposalSchema.parse(proposalData)
      
      const response = await API.post(`/projects/${validatedId}/proposals`, validatedData)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Buscar projetos do usuário logado
   * @returns {Promise<Array>} Lista de projetos do usuário
   */
  async getMyProjects() {
    try {
      const response = await API.get('/projects/my-projects')
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Atribuir projeto a freelancer
   * @param {string} projectId - ID do projeto
   * @param {Object} assignData - Dados de atribuição
   * @returns {Promise<Object>} Projeto atualizado
   */
  async assignProject(projectId, assignData) {
    try {
      const validatedId = ProjectIdSchema.parse(projectId)
      const validatedData = AssignProjectSchema.parse(assignData)
      
      const response = await API.patch(`/projects/${validatedId}/assign`, validatedData)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Buscar projetos por status
   * @param {string} status - Status do projeto
   * @param {Object} additionalFilters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos filtrados
   */
  async getProjectsByStatus(status, additionalFilters = {}) {
    try {
      const validatedFilters = ProjectFiltersSchema.parse({
        ...additionalFilters,
        status,
        page: Number(additionalFilters.page) || 1,
        limit: Number(additionalFilters.limit) || 10
      })

      return this.getProjects(validatedFilters)
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Buscar projetos abertos
   * @param {Object} filters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos abertos
   */
  async getOpenProjects(filters = {}) {
    return this.getProjectsByStatus('open', filters)
  }

  /**
   * Buscar projetos em andamento
   * @param {Object} filters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos em andamento
   */
  async getInProgressProjects(filters = {}) {
    return this.getProjectsByStatus('in_progress', filters)
  }

  /**
   * Buscar projetos concluídos
   * @param {Object} filters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos concluídos
   */
  async getCompletedProjects(filters = {}) {
    return this.getProjectsByStatus('completed', filters)
  }

  /**
   * Buscar projetos por categoria
   * @param {string} category - Categoria do projeto
   * @param {Object} filters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos da categoria
   */
  async getProjectsByCategory(category, filters = {}) {
    try {
      const validatedFilters = ProjectFiltersSchema.parse({
        ...filters,
        category,
        page: Number(filters.page) || 1,
        limit: Number(filters.limit) || 10
      })

      return this.getProjects(validatedFilters)
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Buscar projetos por habilidades
   * @param {Array<string>} skills - Lista de habilidades
   * @param {Object} filters - Filtros adicionais
   * @returns {Promise<Object>} Lista de projetos com as habilidades
   */
  async getProjectsBySkills(skills, filters = {}) {
    try {
      const validatedFilters = ProjectFiltersSchema.parse({
        ...filters,
        skills: Array.isArray(skills) ? skills.join(',') : skills,
        page: Number(filters.page) || 1,
        limit: Number(filters.limit) || 10
      })

      return this.getProjects(validatedFilters)
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Tratamento de erros
   * @param {Error} error - Erro capturado
   * @throws {Error} Erro formatado
   */
  handleError(error) {
    if (error.response) {
      // Erro da API
      const apiError = new Error(error.response.data.message || 'Erro na requisição')
      apiError.status = error.response.status
      apiError.data = error.response.data
      throw apiError
    } else if (error instanceof z.ZodError) {
      // Erro de validação Zod
      const validationError = new Error('Dados de entrada inválidos')
      validationError.errors = error.errors
      validationError.status = 400
      throw validationError
    } else {
      // Erro genérico
      const genericError = new Error('Erro de conexão ou servidor indisponível')
      genericError.status = 500
      throw genericError
    }
  }
}

export default new ProjectsService()