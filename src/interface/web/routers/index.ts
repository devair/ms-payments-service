import { Router } from "express";
import { paymentsRouter } from "./payments.router.";
import { DataSource } from "typeorm"
import { PaymentsApi } from "../api/PaymentsApi"
import { IPaymentQueueAdapterOUT } from "../../../core/messaging/IPaymentQueueAdapterOUT"

export const router = (dataSource: DataSource, publisher: IPaymentQueueAdapterOUT) => {
    const router = Router()

    const paymentsApi = new PaymentsApi(dataSource, publisher)

    router.use('/payments', paymentsRouter(paymentsApi))

    return router
}
