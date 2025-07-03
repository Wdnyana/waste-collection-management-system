import type { PageLoad } from './$types'
import { fetchCollectionDetails, fetchHistoryByProducer } from '../../../lib/services/api'
import type { IProducer } from '@repo/shared'

export const ssr = false

export const load: PageLoad = async ({ params }) => {
	const collectionId = params.id

	try {
		const collectionDetails = await fetchCollectionDetails(collectionId)

		if (!collectionDetails) {
			throw new Error('Not found collection data.')
		}

		const producerId =
			typeof collectionDetails.producer === 'object'
				? (collectionDetails.producer as IProducer)._id
				: collectionDetails.producer

		const collectionHistory = await fetchHistoryByProducer(producerId)
		return {
			details: collectionDetails,
			history: collectionHistory,
			error: null,
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return {
			details: null,
			history: [],
			error: error.message,
		}
	}
}
