/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PageLoad } from './$types'
import { PUBLIC_API_BASE_URL } from '$env/static/public'

import {
	fetchVehicles,
	fetchCollections,
	fetchDashboardStats,
	fetchCollectionActivityChart,
	fetchProducers,
} from '../lib/services/api'

const BASE_URL = PUBLIC_API_BASE_URL
export const ssr = false

export const load: PageLoad = async ({ fetch }) => {
	const fetchOptions = { fetch, baseUrl: BASE_URL }

	try {
		const [statsData, chartData, vehiclesData, collectionsData, producerData] = await Promise.all([
			fetchDashboardStats(fetchOptions),
			fetchCollectionActivityChart(fetchOptions),
			fetchVehicles(fetchOptions),
			fetchCollections(fetchOptions),
			fetchProducers(fetchOptions),
		])

		return {
			stats: statsData,
			chartData: chartData,
			vehicles: vehiclesData,
			collections: collectionsData,
			producers: producerData,
			error: null,
		}
	} catch (error: any) {
		console.error('Error when load function: ', error)

		return {
			stats: null,
			chartData: null,
			vehicles: [],
			collections: [],
			producers: [],
			error: error.meesage,
		}
	}
}
