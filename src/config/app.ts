import express from "express"
import "express-async-errors"
import * as dotenv from 'dotenv'
import { AppDataSource } from "../infra/datasource/typeorm"
import { router } from "../interface/web/routers"
import { CreatePaymentUseCase } from "../application/useCases/payments/createPayment/CreatePaymentUseCase"
import { OrderCreatedQueueAdapterIN } from "../infra/messaging/OrderCreatedQueueAdapterIN"

dotenv.config()
const rabbitMqUrl = process.env.RABBITMQ_URL ? process.env.RABBITMQ_URL : ''
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3333

export const createApp = async () => {
    const app = express()
    app.disable("x-powered-by")
    app.use(express.json())

    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.get('/health', (request, response) => {
        return response.status(200).send('Ok');
    })

    
    // Configura Persistencia
    if (process.env.NODE_ENV !== 'test') {
        AppDataSource.initialize().then(async (datasource) => {
                        
            app.use('/api/v1', router(datasource))

             // Configura consumidor de ordem criada

            const createPaymentUseCase = new CreatePaymentUseCase(datasource) 
            const orderCreatedConsumer = new OrderCreatedQueueAdapterIN(rabbitMqUrl, createPaymentUseCase)
            await orderCreatedConsumer.consume()  
            
            app.listen(port, () => {
                console.log(`Payments service listening  on port ${port}`);
            });
        }).catch(error => console.log(error));
    }
    else{        
        app.use('/api/v1', router(AppDataSource))     
    }

    return app
}