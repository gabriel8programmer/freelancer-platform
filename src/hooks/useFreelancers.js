// hooks/useFreelancers.js
import { useState } from 'react'
import userService from '../services/userService'

export const useFreelancers = () => {
	const [freelancers, setFreelancers] = useState([])
	const [currentFreelancer, setCurrentFreelancer] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [filters, setFilters] = useState({})
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		total: 0,
	})

	// Buscar freelancers
	const fetchFreelancers = async (searchFilters = {}) => {
		setLoading(true)
		setError(null)

		try {
			const response = await userService.getFreelancers(searchFilters)

			console.log('Resposta da API - Freelancers:', response) // Debug

			// Ajuste para lidar com diferentes estruturas de resposta
			const freelancersData = response.freelancers || response.data || response || []

			setFreelancers(freelancersData)
			setPagination({
				currentPage: response.currentPage || 1,
				totalPages: response.totalPages || 1,
				total: response.total || freelancersData.length,
			})
			setFilters(searchFilters)
		} catch (err) {
			console.error('Erro ao buscar freelancers:', err)
			setError(err.message)
			setFreelancers([])
		} finally {
			setLoading(false)
		}
	}

	// Buscar freelancer por ID
	const fetchFreelancerById = async (id) => {
		setLoading(true)
		setError(null)
		setCurrentFreelancer(null)

		try {
			const response = await userService.getFreelancerById(id)

			console.log('Resposta da API - Freelancer por ID:', response) // Debug

			// Ajuste para diferentes estruturas de resposta
			const freelancerData = response.freelancer || response.data || response

			if (!freelancerData) {
				throw new Error('Freelancer não encontrado')
			}

			setCurrentFreelancer(freelancerData)
			return freelancerData
		} catch (err) {
			console.error('Erro ao buscar freelancer por ID:', err)
			const errorMessage = err.message || 'Erro ao carregar perfil do freelancer'
			setError(errorMessage)
			setCurrentFreelancer(null)
			throw err
		} finally {
			setLoading(false)
		}
	}

	// Buscar freelancers em destaque
	const fetchFeaturedFreelancers = async (limit = 6) => {
		setLoading(true)
		setError(null)

		try {
			const response = await userService.getFreelancers({
				featured: true,
				limit,
			})

			const featured = response.freelancers || response.data || response || []
			setFreelancers(featured)
			return featured
		} catch (err) {
			setError(err.message)
			setFreelancers([])
			throw err
		} finally {
			setLoading(false)
		}
	}

	// Limpar freelancer atual
	const clearCurrentFreelancer = () => {
		setCurrentFreelancer(null)
		setError(null)
	}

	// Outros métodos permanecem iguais...
	const updateFilters = async (newFilters) => {
		const updatedFilters = { ...filters, ...newFilters, page: 1 }
		await fetchFreelancers(updatedFilters)
	}

	const searchFreelancers = async (searchTerm) => {
		const searchFilters = {
			...filters,
			search: searchTerm,
			page: 1,
		}
		await fetchFreelancers(searchFilters)
	}

	const changePage = async (page) => {
		const pageFilters = { ...filters, page }
		await fetchFreelancers(pageFilters)
	}

	const refetch = async () => {
		await fetchFreelancers(filters)
	}

	return {
		freelancers,
		currentFreelancer,
		loading,
		error,
		filters,
		pagination,
		fetchFreelancers,
		fetchFreelancerById,
		fetchFeaturedFreelancers,
		clearCurrentFreelancer,
		updateFilters,
		searchFreelancers,
		changePage,
		refetch,
	}
}
