import { Schema, model, Document } from 'mongoose'
import type { IVehicle } from '@repo/shared'

const vehicleSchema = new Schema<IVehicle & Document>(
	{
		driver: { type: String, required: true },
		totalStops: { type: Number, required: true, default: 0 },
		stopsDone: { type: Number, required: true, default: 0 },
		lisencePlate: { type: String, required: true },
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

export const Vehicle = model<IVehicle & Document>('Vehicle', vehicleSchema)
