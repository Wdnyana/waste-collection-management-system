import { writable } from 'svelte/store'
import type { DashboardStats } from '@repo/shared'

import * as api from '../services/api'

function createDashboardStatsStore() {
	const { subscribe, set } = writable<DashboardStats | null>(null)

	return {
		subscribe,
		load: async () => {
			try {
				const data = await api.fetchDashboardStats()
				set(data)
			} catch (error) {
				console.error('Gagal memuat data Statistik:', error)
				set(null)
			}
		},
	}
}

export const dashboardStats = createDashboardStatsStore()
