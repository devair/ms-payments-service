import { Router } from "express";
import { paymentsRouter } from "./payments.router.";
import { DataSource } from "typeorm"
import { PaymentsApi } from "../api/PaymentsApi"

export const router = (dataSource: DataSource) => {
    const router = Router()

    const paymentsApi = new PaymentsApi(dataSource)

    router.use('/payments', paymentsRouter(paymentsApi))

    return router
}
