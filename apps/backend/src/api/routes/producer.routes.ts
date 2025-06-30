import { Router } from 'hyper-express'
import * as producerController from '../controllers/producer.controller'

const producerRouter = new Router()

producerRouter.post('/', producerController.addProducer)
producerRouter.get('/', producerController.getProducers)
producerRouter.get('/:id', producerController.getProducer)
producerRouter.put('/:id/status', producerController.updateProducer)
producerRouter.delete('/:id', producerController.deleteProducer)

export default producerRouter
