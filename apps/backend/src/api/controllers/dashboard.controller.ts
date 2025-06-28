import { Request, Response } from 'hyper-express'
import * as dashboardService from '../services/dashboard.service'

export const getStats = async (req: Request, res: Response) => {
	try {
		const stats = await dashboardService.getDashboardStats()
		res.status(200).json(stats)
	} catch (error) {
		res.status(500).json({ message: 'Server error fetching stats' })
	}
}
