// hooks/useFeaturedFreelancers.js
import { useState, useEffect } from 'react'
import userService from '../services/userService'

export const useFeaturedFreelancers = (limit = 3) => {
	const [freelancers, setFreelancers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const fetchFeaturedFreelancers = async () => {
		setLoading(true)
		setError(null)

		try {
			// Buscar freelancers usando o service real
			const response = await userService.getFreelancers({
				limit: 50,
			})

			// Ordenar por rating ou outros critérios de destaque
			const sortedFreelancers = (response.freelancers || response.users || response.data || [])
				.filter((freelancer) => freelancer.userType === 'freelancer' || !freelancer.userType) // Filtrar apenas freelancers se necessário
				.sort((a, b) => {
					// Priorizar freelancers com rating mais alto
					const aRating = a.rating || a.averageRating || 0
					const bRating = b.rating || b.averageRating || 0

					// Se tiver projetos concluídos, usar como critério secundário
					const aProjects = a.completedProjects || a.projectsCompleted || 0
					const bProjects = b.completedProjects || b.projectsCompleted || 0

					// Primeiro por rating, depois por projetos concluídos
					if (bRating !== aRating) {
						return bRating - aRating
					}
					return bProjects - aProjects
				})
				.slice(0, limit)

			setFreelancers(sortedFreelancers)
		} catch (err) {
			console.error('Erro ao buscar freelancers em destaque:', err)
			setError(err.message)
			// Não usar fallback com mock data - deixar vazio para mostrar estado de erro
			setFreelancers([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchFeaturedFreelancers()
	}, [limit])

	const refetch = () => {
		fetchFeaturedFreelancers()
	}

	return {
		freelancers,
		loading,
		error,
		refetch,
	}
}
