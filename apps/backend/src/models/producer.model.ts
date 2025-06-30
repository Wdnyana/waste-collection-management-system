import { Schema, model, Document } from 'mongoose'
import type { IProducer } from '@repo/shared'

const producerSchema = new Schema<IProducer & Document>(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		city: { type: String, required: true },
		province: { type: String, required: true },
		postalCode: { type: String, required: true },
		phone: { type: String },
		status: { type: String, default: 'active' },
		location: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true },
		},
	},
	{ timestamps: true },
)

producerSchema.index({ location: '2dsphere' })

export const Producer = model<IProducer & Document>('Producer', producerSchema)
