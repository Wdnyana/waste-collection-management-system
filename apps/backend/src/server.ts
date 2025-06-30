import HyperExpress from 'hyper-express'
import cors from 'cors'

import { dbConnection } from './config/db-connection'
import { config } from './config/env'
import { logger } from './config/pino'

import vehicleRouter from './api/routes/vehicle.routes'
import collectionRouter from './api/routes/collection.routes'
import producerRouter from './api/routes/producer.routes'
import dashboardRouter from './api/routes/dashboard.routes'
import { monitoringWebSocket } from './websockets/monitoring.handler'

const startServer = async () => {
	await dbConnection()
	const app = new HyperExpress.Server()

	app.get('/', (request, response) => {
		response.send('Hyper Express Server is running...🚀')
	})

	const corsOptions = {
		origin: process.env.URL_FE,
		optionsSuccessStatus: 200,
	}
	app.use(cors(corsOptions))

	app.use('/api/vehicles', vehicleRouter)
	app.use('/api/collections', collectionRouter)
	app.use('/api/producers', producerRouter)
	app.use('/api/dashboard', dashboardRouter)

	monitoringWebSocket(app)

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
