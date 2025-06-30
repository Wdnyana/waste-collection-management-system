import { Router } from 'hyper-express'
import * as collectionController from '../controllers/collection.controller'

const collectionRouter = new Router()

collectionRouter.post('/', collectionController.addCollection)
collectionRouter.get('/', collectionController.getCollections)
collectionRouter.get('/:id/details', collectionController.getDetails)
collectionRouter.get('/:id/history', collectionController.getHistory)
collectionRouter.put('/:id/status', collectionController.updateStatus)
collectionRouter.delete('/:id', collectionController.deleteCollection)

export default collectionRouter
