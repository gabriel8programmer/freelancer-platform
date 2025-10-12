// hooks/useFeaturedProjects.js
import { useState, useEffect } from 'react'
import projectService from '../services/projectService'

export const useFeaturedProjects = (limit = 3) => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchFeaturedProjects = async () => {
		setLoading(true)
		setError(null)

		try {
			// Buscar projetos abertos
			const response = await projectService.getProjects({
				status: 'open',
				limit: 50, // Buscar mais projetos para filtrar os mais populares
			})

			// Ordenar por número de propostas (decrescente) e pegar os top N
			const sortedProjects = (response.projects || [])
				.sort((a, b) => {
					const aProposals = Array.isArray(a.proposals) ? a.proposals.length : 0
					const bProposals = Array.isArray(b.proposals) ? b.proposals.length : 0
					return bProposals - aProposals
				})
				.slice(0, limit)

			setProjects(sortedProjects)
		} catch (err) {
			setError(err.message)
			setProjects([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchFeaturedProjects()
	}, [limit])

	const refetch = () => {
		fetchFeaturedProjects()
	}

	return {
		projects,
		loading,
		error,
		refetch,
	}
}
