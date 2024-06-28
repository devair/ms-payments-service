import { PaymentsRepositoryInMemory } from "../../../../../external/datasource/in-memory/PaymentsRepositoryInMemory"
import { CreatePaymentUseCase } from "../../createPayment/CreatePaymentUseCase"
import { FindByOrderPaymentUseCase } from "../FindByOrderPaymentUseCase"

let createPaymentUseCase: CreatePaymentUseCase
let findByOrderPaymentUseCase: FindByOrderPaymentUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{        
        const paymentsRepository = new PaymentsRepositoryInMemory()
        createPaymentUseCase = new CreatePaymentUseCase(paymentsRepository)        
    })
    
    it('Should be able to find a payment', async ()=>{
        
        let payment = {            
            orderId: 1,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: 100
        }

        const paymentCreated = await createPaymentUseCase.execute(payment)        
        expect(paymentCreated).toHaveProperty('id')                
    })    
})