import { Producer } from '../../models/producer.model'
import { IProducer } from '../../types/mongo'
import { Types } from 'mongoose'

export const createProducer = async (data: Partial<IProducer>): Promise<IProducer> => {
	const newProducer = new Producer(data)
	return newProducer.save()
}

export const findAllProducers = async (): Promise<IProducer[]> => {
	return Producer.find()
}

export const findProducerById = async (id: string): Promise<IProducer | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	return Producer.findById(id)
}

export const updateProducerById = async (
	id: string,
	data: Partial<IProducer>,
): Promise<IProducer | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	return Producer.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProducerById = async (id: string): Promise<IProducer | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	return Producer.findByIdAndDelete(id)
}
