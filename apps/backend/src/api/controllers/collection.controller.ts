import { Request, Response } from 'hyper-express'
import * as collectionService from '../services/collection.service'

export const addCollection = async (req: Request, res: Response) => {
	try {
		const collectionData = await req.json()
		if (!collectionData.producer || !collectionData.wasteDetail || !collectionData.location) {
			return res.status(400).json({ message: 'Producer, wasteDetail, and location are required.' })
		}
		const newCollection = await collectionService.createCollection(collectionData)
		res.status(201).json(newCollection)
	} catch (error) {
		res.status(500).json({ message: 'Server error while creating collection' })
	}
}

export const getCollections = async (req: Request, res: Response) => {
	try {
		const collections = await collectionService.findAllCollections()
		res.status(200).json(collections)
	} catch (error) {
		res.status(500).json({ message: 'Server error fetching collections' })
	}
}

export const updateStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { status } = await req.json()
		if (!status || !['todo', 'next', 'done', 'anomaly'].includes(status)) {
			return res.status(400).json({ message: 'Invalid status' })
		}
		const updated = await collectionService.updateCollectionStatus(id, status)
		if (!updated) return res.status(404).json({ message: 'Collection not found' })
		res.status(200).json(updated)
	} catch (error) {
		res.status(500).json({ message: 'Server error updating status' })
	}
}

export const getDetails = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const details = await collectionService.findCollectionDetails(id)
		if (!details) return res.status(404).json({ message: 'Collection details not found' })
		res.status(200).json(details)
	} catch (error) {
		res.status(500).json({ message: 'Server error fetching details' })
	}
}

export const getHistory = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const history = await collectionService.findHistoryByProducer(id)
		res.status(200).json(history)
	} catch (error) {
		res.status(500).json({ message: 'Server error fetching history' })
	}
}

export const deleteCollection = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const deletedCollection = await collectionService.deleteCollectionById(id)
		if (!deletedCollection) {
			return res.status(404).json({ message: 'Collection not found' })
		}
		res.status(200).json({ message: 'Collection deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Server error while deleting collection' })
	}
}
