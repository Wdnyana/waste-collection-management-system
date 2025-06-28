import { Vehicle } from '../../models/vehicle.model'
import { IVehicle } from '../../types/mongo'
import { Types } from 'mongoose'

export const createVehicle = async (data: Partial<IVehicle>): Promise<IVehicle> => {
	const newVehicle = new Vehicle(data)
	return newVehicle.save()
}

export const findAllVehicles = async (): Promise<IVehicle[]> => {
	return Vehicle.find()
}

export const findVehicleById = async (id: string): Promise<IVehicle | null> => {
	if (!Types.ObjectId.isValid(id)) return null
	return Vehicle.findById(id)
}

export const updateVehicleStatus = async (
	id: string,
	status: IVehicle['status'],
): Promise<IVehicle | null> => {
	if (!Types.ObjectId.isValid(id)) {
		return null
	}
	return Vehicle.findByIdAndUpdate(id, { status }, { new: true })
}

export const deleteVehicleById = async (id: string): Promise<IVehicle | null> => {
	if (!Types.ObjectId.isValid(id)) {
		return null
	}
	return Vehicle.findByIdAndDelete(id)
}
