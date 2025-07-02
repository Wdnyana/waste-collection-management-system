import { writable } from 'svelte/store'
import type { IVehicle } from '@repo/shared'
import * as api from '../services/api'

function createVehicleStore() {
	const { subscribe, set, update } = writable<IVehicle[]>([])

	return {
		subscribe,
		set,
		load: async () => {
			try {
				const data = await api.fetchVehicles()
				set(data)
			} catch (error) {
				console.error('Failed to load vehicles:', error)
				set([])
			}
		},

		updateLocation: (vehicleId: string, location: { lat: number; lng: number }) => {
			update((items) =>
				items.map((vehicle) =>
					vehicle._id === vehicleId
						? {
								...vehicle,
								currentLocation: { type: 'Point', coordinates: [location.lng, location.lat] },
							}
						: vehicle,
				),
			)
		},
		reset: () => set([]),
	}
}

export const vehicles = createVehicleStore()
