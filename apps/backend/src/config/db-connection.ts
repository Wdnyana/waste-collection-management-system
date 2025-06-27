import mongoose from 'mongoose'
import { logger } from './pino'
import { config } from './env'

export const dbConnection = async () => {
	try {
		await mongoose.connect(config.db.uri)
		logger.info('MongoDB is Connected...🚀')
	} catch (err: any) {
		logger.error(`MongoDB Connection Error: ${err.message}`)

		process.exit(1)
	}
}
