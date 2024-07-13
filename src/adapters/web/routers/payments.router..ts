import { Router } from 'express'
import { PaymentsApi } from '../api/PaymentsApi'

const paymentsRouter = Router()

paymentsRouter.get('/:id', PaymentsApi.findById.bind(PaymentsApi))
paymentsRouter.get('/order/:orderId', PaymentsApi.findByOrder.bind(PaymentsApi))
paymentsRouter.get('/', PaymentsApi.list.bind(PaymentsApi))
paymentsRouter.post('/', PaymentsApi.create.bind(PaymentsApi))



export { paymentsRouter }