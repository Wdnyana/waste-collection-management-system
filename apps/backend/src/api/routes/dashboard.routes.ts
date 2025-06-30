import { Router } from 'hyper-express'
import * as dashboardController from '../controllers/dashboard.controller'

const dashboardRouter = new Router()

dashboardRouter.get('/stats', dashboardController.getStats)

export default dashboardRouter
