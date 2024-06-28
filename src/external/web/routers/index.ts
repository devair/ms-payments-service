import { Router } from "express";
import { paymentsRouter } from "./payments.router.";

const router = Router()

router.use('/payments', paymentsRouter)

export { router }
