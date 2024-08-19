import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import amqplib from "amqplib"
import { AppDataSource } from "../infra/datasource/typeorm"
import { router } from "../interface/web/routers"
import { CreatePaymentUseCase } from "../application/useCases/payments/CreatePaymentUseCase"
import { OrderCreatedQueueAdapterIN } from "../infra/messaging/OrderCreatedQueueAdapterIN"
import { QueueNames } from "../core/messaging/QueueNames"
import { PaymentQueueAdapterOUT } from "../infra/messaging/PaymentQueueAdapterOUT"
import helmet from 'helmet'

dotenv.config()
const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3333

export const createApp = async () => {
    const app = express()
    app.disable("x-powered-by")
    app.use(express.json())

    // Define o cabeçalho X-Content-Type-Options para 'nosniff'
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        next()
    })

    // Configura o Content-Security-Policy usando helmet
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://trusted.cdn.com"],
            styleSrc: ["'self'", "https://trusted.cdn.com"],
            imgSrc: ["'self'", "https://images.com"],
            connectSrc: ["'self'", "https://api.trusted.com"],
            fontSrc: ["'self'", "https://fonts.googleapis.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    }))

    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.get('/health', (request, response) => {
        return response.status(200).send('Ok')
    })


    // Configura Persistencia
    if (process.env.NODE_ENV !== 'test') {
        AppDataSource.initialize().then(async (datasource) => {

            // Configura consumidor de ordem criada

            const createPaymentUseCase = new CreatePaymentUseCase(datasource)
            const orderCreatedConsumer = new OrderCreatedQueueAdapterIN(rabbitMqUrl, createPaymentUseCase)
            await orderCreatedConsumer.consume()

            const rabbitMQConnection = await amqplib.connect(rabbitMqUrl)
            const paymentApprovedPublisher = new PaymentQueueAdapterOUT(rabbitMQConnection, QueueNames.ORDER_PAID)
            await paymentApprovedPublisher.connect()

            app.use('/api/v1', router(datasource, paymentApprovedPublisher))


            app.listen(port, () => {
                console.log(`Payments service listening  on port ${port}`)
            })
        }).catch(error => console.log(error))
    }
    else {
        app.use('/api/v1', router(AppDataSource, null))
    }

    return app
}