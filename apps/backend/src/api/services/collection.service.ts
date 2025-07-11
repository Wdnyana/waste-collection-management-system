import { Collection } from '../../models/collection.model'
import type { ICollection } from '@repo/shared'
import { Types } from 'mongoose'

export const createCollection = async (data: Partial<ICollection>): Promise<ICollection> => {
	const newCollection = new Collection(data)

	if (!newCollection.wasteType) {
		throw new Error('Type of waste not valid!')
	}
	return newCollection.save()
}

export const findAllCollections = async (): Promise<ICollection[]> => {
	return Collection.find()
		.populate('producer', 'name city address')
		.populate('vehicleId', 'driver lisencePlate')
}

export const updateCollectionStatus = async (
	id: string,
	status: ICollection['status'],
): Promise<ICollection | null> => {
	if (!Types.ObjectId.isValid(id)) return null

	const updatePayload: Partial<Pick<ICollection, 'status' | 'completedTime'>> = { status }
	if (status === 'done') {
		updatePayload.completedTime = new Date()
	}

	return Collection.findByIdAndUpdate(id, updatePayload, { new: true })
}

export const findCollectionDetails = async (id: string): Promise<ICollection | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	return Collection.findById(id).populate('producer').populate('vehicleId')
}

export const findHistoryByProducer = async (producerId: string): Promise<ICollection[]> => {
	if (!Types.ObjectId.isValid(producerId)) return []
	return Collection.find({ producer: producerId }).sort({ createdAt: -1 }).limit(20)
}

export const deleteCollectionById = async (id: string): Promise<ICollection | null> => {
	if (!Types.ObjectId.isValid(id)) {
		return null
	}
	return Collection.findByIdAndDelete(id)
}
