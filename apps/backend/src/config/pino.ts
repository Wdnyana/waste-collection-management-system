import pino from 'pino'

export const logger = pino({
	level: 'info',
	transport:
		process.env.NODE_ENV !== 'production'
			? {
					target: 'pino-pretty',
					options: {
						colorize: true,
					},
				}
			: undefined,
})
