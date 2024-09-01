import { CreatePaymentUseCase } from "../../../application/useCases/payments/CreatePaymentUseCase"
import { FindByIdPaymentUseCase } from "../../../application/useCases/payments/FindByIdPaymentUseCase"
import { AppDataSource } from "../../../infra/datasource/typeorm"

let createPaymentUseCase: CreatePaymentUseCase
let findByIdPaymentUseCase: FindByIdPaymentUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
                        
        createPaymentUseCase = new CreatePaymentUseCase(AppDataSource)  
        findByIdPaymentUseCase = new FindByIdPaymentUseCase(AppDataSource)                
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
        
        const paymentFound = await findByIdPaymentUseCase.execute(paymentCreated.id)

        expect(paymentFound).not.toBeUndefined()
    })

    it('Should not be able to find a payment', async () => {

        expect(async ()=>{    
            
            await findByIdPaymentUseCase.execute('123')

        }).rejects.toBeInstanceOf(Error)

    })
})