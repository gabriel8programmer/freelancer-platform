// hooks/useProjects.js
import { useState } from 'react'
import projectService from '../services/projectService'

export const useProjects = () => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filters, setFilters] = useState({})
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		total: 0,
	})

	// Buscar projetos - deve ser chamada manualmente
	const fetchProjects = async (searchFilters = {}) => {
		setLoading(true)
		setError(null)

		try {
			const response = await projectService.getProjects(searchFilters)

			setProjects(response.projects || [])
			setPagination({
				currentPage: response.currentPage || 1,
				totalPages: response.totalPages || 1,
				total: response.total || 0,
			})
			setFilters(searchFilters)
		} catch (err) {
			setError(err.message)
			setProjects([])
		} finally {
			setLoading(false)
		}
	}

	// Atualizar filtros e buscar
	const updateFilters = async (newFilters) => {
		const updatedFilters = { ...filters, ...newFilters, page: 1 }
		await fetchProjects(updatedFilters)
	}

	// Buscar com termo de pesquisa
	const searchProjects = async (searchTerm) => {
		const searchFilters = {
			...filters,
			search: searchTerm,
			page: 1,
		}
		await fetchProjects(searchFilters)
	}

	// Mudar página
	const changePage = async (page) => {
		const pageFilters = { ...filters, page }
		await fetchProjects(pageFilters)
	}

	// Recarregar projetos
	const refetch = async () => {
		await fetchProjects(filters)
	}

	return {
		projects,
		loading,
		error,
		filters,
		pagination,
		fetchProjects,
		updateFilters,
		searchProjects,
		changePage,
		refetch,
	}
}

export const useProject = () => {
	const [project, setProject] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	// Buscar projeto por ID - deve ser chamada manualmente
	const fetchProject = async (projectId) => {
		if (!projectId) return

		setLoading(true)
		setError(null)

		try {
			const projectData = await projectService.getProjectById(projectId)
			setProject(projectData)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const refetch = async (projectId) => {
		if (projectId) {
			await fetchProject(projectId)
		}
	}

	return {
		project,
		loading,
		error,
		fetchProject,
		refetch,
	}
}

export const useMyProjects = () => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	// Buscar projetos do usuário - deve ser chamada manualmente
	const fetchMyProjects = async () => {
		setLoading(true)
		setError(null)

		try {
			const myProjects = await projectService.getMyProjects()
			setProjects(myProjects)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const refetch = async () => {
		await fetchMyProjects()
	}

	return {
		projects,
		loading,
		error,
		fetchMyProjects,
		refetch,
	}
}
