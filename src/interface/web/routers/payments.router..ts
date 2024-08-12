import { Router } from 'express'
import { PaymentsApi } from '../api/PaymentsApi'

export const paymentsRouter = (api: PaymentsApi) => {

    const router = Router()

    router.get('/:id', (req,res) => api.findById(req,res) )
    router.get('/order/:orderId', (req,res) => api.findByOrder(req,res) )
    router.get('/', (req,res) => api.list(req,res) )
    router.post('/', (req,res) => api.create(req,res) )

    return router

}