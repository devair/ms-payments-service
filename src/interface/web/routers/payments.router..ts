import { Router } from 'express'
import { PaymentsApi } from '../api/PaymentsApi'

export const paymentsRouter = (api: PaymentsApi) => {

    const router = Router()

    router.get('/:id', (req,res) => api.findById(req,res) )
    router.get('/order/:orderId', (req,res) => api.findByOrder(req,res) )
    router.get('/', (req,res) => api.list(req,res) )
    router.patch('/approve/:id', (req,res) => api.approve(req,res) )
    router.patch('/reject/:id', (req,res) => api.reject(req,res) )

    return router

}