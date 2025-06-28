import { Request, Response } from 'hyper-express'
import * as vehicleService from '../services/vehicle.service'

export const addVehicle = async (req: Request, res: Response) => {
	try {
		const vehicleData = await req.json()
		if (!vehicleData.driver || !vehicleData.currentLocation) {
			return res.status(400).json({ message: 'Driver and currentLocation are required.' })
		}
		const newVehicle = await vehicleService.createVehicle(vehicleData)
		res.status(201).json(newVehicle)
	} catch (error) {
		res.status(500).json({ message: 'Server error while creating vehicle' })
	}
}

export const getVehicles = async (req: Request, res: Response) => {
	try {
		const vehicles = await vehicleService.findAllVehicles()
		res.status(200).json(vehicles)
	} catch (error) {
		res.status(500).json({ message: 'Server error while fetching vehicles' })
	}
}

export const getVehicle = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const vehicle = await vehicleService.findVehicleById(id)
		if (!vehicle) return res.status(404).json({ message: 'vehicle not found' })
		res.status(200).json(vehicle)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching vehicle' })
	}
}

export const updateStatus = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { status } = await req.json()

		if (!status || !['active', 'idle', 'maintenance'].includes(status)) {
			return res.status(400).json({ message: 'Invalid status provided' })
		}

		const updatedVehicle = await vehicleService.updateVehicleStatus(id, status)

		if (!updatedVehicle) {
			return res.status(404).json({ message: 'Vehicle not found' })
		}

		res.status(200).json(updatedVehicle)
	} catch (error) {
		res.status(500).json({ message: 'Server error while updating vehicle status' })
	}
}

export const deleteVehicle = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const deletedVehicle = await vehicleService.deleteVehicleById(id)

		if (!deletedVehicle) {
			return res.status(404).json({ message: 'Vehicle not found' })
		}

		res.status(200).json({ message: 'Vehicle deleted successfully', data: deletedVehicle })
	} catch (error) {
		res.status(500).json({ message: 'Server error while deleting vehicle' })
	}
}
