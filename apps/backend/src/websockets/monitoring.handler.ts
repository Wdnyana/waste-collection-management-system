import HyperExpress from 'hyper-express'
import { Vehicle } from '../models/vehicle.model'

import { logger } from '../config/pino'

export const monitoringWebSocket = (app: HyperExpress.Server) => {
	app.ws('/ws/monitoring', (ws) => {
		logger.info('CLIENT CONNECTED: /ws/monitoring')

		ws.on('message', async (msg) => {
			try {
				const data = JSON.parse(msg.toString())

				if (!data.vehicleId || !data.location) {
					logger.warn('Invalid WebSocket message received:', data)
					return
				}

				await Vehicle.findByIdAndUpdate(data.vehicleId, {
					currentLocation: {
						type: 'Point',
						coordinates: [data.location.lng, data.location.lat],
					},
				})

				ws.publish('location_updates', msg)
			} catch (error) {
				logger.error('WebSocket message processing error:', error)
			}
		})

		ws.subscribe('location_updates')

		ws.on('close', () => {
			logger.info('CLIENT DISCONNECTED from /ws/monitoring')
		})
	})

	logger.info('✅ WebSocket handler for /ws/monitoring initialized.')
}
