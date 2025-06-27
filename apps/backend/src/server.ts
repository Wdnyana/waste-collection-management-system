import HyperExpress from 'hyper-express'

import { dbConnection } from './config/db-connection'
import { config } from './config/env'
import { logger } from './config/pino'

const startServer = async () => {
	await dbConnection()
	const app = new HyperExpress.Server()

	app.get('/', (request, response) => {
		response.send('Hyper Express Server is running...🚀')
	})

	app.use((req, res, next) => {
		const start = Date.now()
		logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`)

		res.on('finish', () => {
			const duration = Date.now() - start
			const { method, url: path } = req
			const { statusCode } = res
			logger.info(
				{
					method,
					path,
					status: statusCode,
					duration_ms: duration,
				},
				'incoming request',
			)
		})

		next()
	})

	app
		.listen(config.port as number)
		.then(() => logger.info(`Server listening on port http://localhost:${config.port}/`))
		.catch((error) => logger.error('Failed to start server, Error in: ', error))
}
startServer()
