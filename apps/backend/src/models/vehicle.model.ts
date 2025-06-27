import { Schema, model } from 'mongoose'
import { IVehicle } from '../types/mongo'

const vehicleSchema = new Schema<IVehicle>(
	{
		driver: { type: String, required: true },
		totalStops: { type: Number, required: true, default: 0 },
		stopsDone: { type: Number, required: true, default: 0 },
		currentLocation: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true },
		},
		status: {
			type: String,
			enum: ['active', 'idle', 'maintenance'],
			required: true,
			default: 'idle',
		},
	},
	{ timestamps: true },
)

vehicleSchema.index({ currentLocation: '2dsphere' })

export const Vehicle = model<IVehicle>('vehicles', vehicleSchema)
