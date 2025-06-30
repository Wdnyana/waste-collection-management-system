import { Schema, model, Document } from 'mongoose'
import type { ICollection } from '@repo/shared'

const collectionSchema = new Schema<ICollection & Document>(
	{
		producer: { type: Schema.Types.ObjectId, ref: 'Producer', required: true },
		wasteDetail: { type: String, required: true },
		status: {
			type: String,
			enum: ['todo', 'next', 'done', 'anomaly'],
			required: true,
			default: 'todo',
		},
		location: {
			type: { type: String, enum: ['Point'], required: true },
			coordinates: { type: [Number], required: true },
		},
		scheduledTime: { type: Date },
		completedTime: { type: Date },

		vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
	},
	{ timestamps: true },
)

export const Collection = model<ICollection & Document>('Collection', collectionSchema)
