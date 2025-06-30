import { writable } from 'svelte/store'
import type { ICollection } from '@repo/shared'
import * as api from '../services/api'

function createCollectionStore() {
	const { subscribe, set, update } = writable<ICollection[]>([])

	return {
		subscribe,
		load: async () => {
			try {
				const data = await api.fetchCollections()
				set(data)
			} catch (error) {
				console.error('Failed to load collections:', error)
				set([])
			}
		},

		updateStatus: (collectionId: string, newStatus: ICollection['status']) => {
			update((items) =>
				items.map((collection) =>
					collection._id === collectionId ? { ...collection, status: newStatus } : collection,
				),
			)
		},
		reset: () => set([]),
	}
}

export const collections = createCollectionStore()
