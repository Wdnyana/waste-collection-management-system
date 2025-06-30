import { Request, Response } from 'hyper-express'
import * as producerService from '../services/producer.service'

export const addProducer = async (req: Request, res: Response) => {
	try {
		const data = await req.json()
		if (!data.name || !data.address || !data.location) {
			return res.status(400).json({ message: 'Name, address, and location are required.' })
		}
		const newProducer = await producerService.createProducer(data)
		res.status(201).json(newProducer)
	} catch (error) {
		res.status(500).json({ message: 'Error creating producer' })
	}
}

export const getProducers = async (req: Request, res: Response) => {
	try {
		const producers = await producerService.findAllProducers()
		res.status(200).json(producers)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching producers' })
	}
}

export const getProducer = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const producer = await producerService.findProducerById(id)
		if (!producer) return res.status(404).json({ message: 'Producer not found' })
		res.status(200).json(producer)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching producer' })
	}
}

export const updateProducer = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const data = await req.json()
		const updatedProducer = await producerService.updateProducerById(id, data)
		if (!updatedProducer) return res.status(404).json({ message: 'Producer not found' })
		res.status(200).json(updatedProducer)
	} catch (error) {
		res.status(500).json({ message: 'Error updating producer' })
	}
}

export const deleteProducer = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const deletedProducer = await producerService.deleteProducerById(id)
		if (!deletedProducer) return res.status(404).json({ message: 'Producer not found' })
		res.status(200).json({ message: 'Producer deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error deleting producer' })
	}
}
