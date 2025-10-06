// src/hooks/useApi.js
import { useState, useEffect } from 'react'

const useApi = (apiCall, dependencies = []) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		let mounted = true

		const fetchData = async () => {
			try {
				setLoading(true)
				setError(null)
				const result = await apiCall()
				if (mounted) {
					setData(result)
				}
			} catch (err) {
				if (mounted) {
					setError(err.message)
				}
			} finally {
				if (mounted) {
					setLoading(false)
				}
			}
		}

		fetchData()

		return () => {
			mounted = false
		}
	}, dependencies)

	return { data, loading, error }
}

export default useApi
