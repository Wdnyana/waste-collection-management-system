import dotenv from 'dotenv'

dotenv.config()

const getEnv = (key: string): string => {
	const value = process.env[key]
	if (!value) {
		throw new Error(`Environment variable ${key} is not set.`)
	}
	return value
}

export const config = {
	port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
	db: {
		uri: getEnv('DB_URL'),
	},
}
