import { CreatePaymentUseCase } from "../../../application/useCases/payments/CreatePaymentUseCase"
import { AppDataSource } from "../../../infra/datasource/typeorm"

let createPaymentUseCase: CreatePaymentUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
                
        createPaymentUseCase = new CreatePaymentUseCase(AppDataSource)
                
    })

    it('Should be able to create a new payment for an order', async () => {
        const payment = {            
            orderId: 1,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: 100
        }

        const paymentCreated = await createPaymentUseCase.execute(payment)
        
        expect(paymentCreated).toHaveProperty('id')       

    })    
})