// hooks/useFreelancers.js
import { useState } from 'react'
import userService from '../services/userService'

export const useFreelancers = () => {
	const [freelancers, setFreelancers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filters, setFilters] = useState({})
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		total: 0,
	})

	// Buscar freelancers - deve ser chamada manualmente
	const fetchFreelancers = async (searchFilters = {}) => {
		setLoading(true)
		setError(null)

		try {
			const response = await userService.getFreelancers(searchFilters)

			setFreelancers(response.freelancers || response.users || response.data || [])
			setPagination({
				currentPage: response.currentPage || 1,
				totalPages: response.totalPages || 1,
				total: response.total || (response.freelancers ? response.freelancers.length : 0),
			})
			setFilters(searchFilters)
		} catch (err) {
			setError(err.message)
			setFreelancers([])
		} finally {
			setLoading(false)
		}
	}

	// Atualizar filtros e buscar
	const updateFilters = async (newFilters) => {
		const updatedFilters = { ...filters, ...newFilters, page: 1 }
		await fetchFreelancers(updatedFilters)
	}

	// Buscar com termo de pesquisa
	const searchFreelancers = async (searchTerm) => {
		const searchFilters = {
			...filters,
			search: searchTerm,
			page: 1,
		}
		await fetchFreelancers(searchFilters)
	}

	// Mudar página
	const changePage = async (page) => {
		const pageFilters = { ...filters, page }
		await fetchFreelancers(pageFilters)
	}

	// Recarregar freelancers
	const refetch = async () => {
		await fetchFreelancers(filters)
	}

	return {
		freelancers,
		loading,
		error,
		filters,
		pagination,
		fetchFreelancers,
		updateFilters,
		searchFreelancers,
		changePage,
		refetch,
	}
}
