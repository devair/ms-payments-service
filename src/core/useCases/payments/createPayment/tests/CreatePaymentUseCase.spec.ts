import { PaymentsRepositoryInMemory } from "../../../../../external/datasource/in-memory/PaymentsRepositoryInMemory"
import { CreatePaymentUseCase } from "../CreatePaymentUseCase"

let createPaymentUseCase: CreatePaymentUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
        
        const paymentsRepository = new PaymentsRepositoryInMemory()        
        createPaymentUseCase = new CreatePaymentUseCase(paymentsRepository)
                
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