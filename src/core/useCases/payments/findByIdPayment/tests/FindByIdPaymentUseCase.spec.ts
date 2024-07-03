import { OrdersService } from "../../../../../adapters/OrdersService"
import { PaymentsRepositoryInMemory } from "../../../../../external/datasource/in-memory/PaymentsRepositoryInMemory"
import { CreatePaymentUseCase } from "../../createPayment/CreatePaymentUseCase"
import { FindByIdPaymentUseCase } from "../FindByIdPaymentUseCase"

let createPaymentUseCase: CreatePaymentUseCase
let findByIdPaymentUseCase: FindByIdPaymentUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
                
        const paymentsRepository = new PaymentsRepositoryInMemory()
        createPaymentUseCase = new CreatePaymentUseCase(paymentsRepository)  
        findByIdPaymentUseCase = new FindByIdPaymentUseCase(paymentsRepository)                
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