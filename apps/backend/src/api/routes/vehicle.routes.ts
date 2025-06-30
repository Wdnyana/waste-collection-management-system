import { Router } from 'hyper-express'
import * as vehicleController from '../controllers/vehicle.controller'

const vehicleRouter = new Router()

vehicleRouter.post('/', vehicleController.addVehicle)
vehicleRouter.get('/', vehicleController.getVehicles)
vehicleRouter.get('/:id', vehicleController.getVehicle)
vehicleRouter.put('/:id/status', vehicleController.updateStatus)
vehicleRouter.delete('/:id', vehicleController.deleteVehicle)

export default vehicleRouter
