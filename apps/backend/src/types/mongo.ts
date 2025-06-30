import { Document, Types } from 'mongoose'

export interface IVehicle extends Document {
	driver: string
	totalStops: number
	stopsDone: number
	currentLocation: {
		type: 'Point'
		coordinates: [number, number]
	}
	status: 'active' | 'idle' | 'maintenance'
}

export interface IProducer extends Document {
	name: string
	address: string
	city: string
	province: string
	postalCode: string
	phone: string
	status: 'active' | 'idle' | 'maintenance'
	location: {
		type: 'Point'
		coordinates: [number, number]
	}
}

export interface ICollection extends Document {
	producer: Types.ObjectId | IProducer
	wasteDetail: string
	status: 'todo' | 'next' | 'done' | 'anomaly'
	location: {
		type: 'Point'
		coordinates: [number, number]
	}
	scheduledTime?: Date
	completedTime?: Date
	vehicleId?: Types.ObjectId | IVehicle
}
