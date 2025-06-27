import { Schema, model } from 'mongoose'
import { ICollection } from '../types/mongo'

const collectionSchema = new Schema<ICollection>(
	{
		producer: { type: Schema.Types.ObjectId, ref: 'producers', required: true },
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

		vehicleId: { type: Schema.Types.ObjectId, ref: 'vehicles' },
	},
	{ timestamps: true },
)

export const Collection = model<ICollection>('collections', collectionSchema)
