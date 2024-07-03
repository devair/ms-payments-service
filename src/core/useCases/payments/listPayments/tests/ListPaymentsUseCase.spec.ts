
import { OrdersService } from "../../../../../adapters/OrdersService"
import { PaymentsRepositoryInMemory } from "../../../../../external/datasource/in-memory/PaymentsRepositoryInMemory"
import { CreatePaymentUseCase } from "../../createPayment/CreatePaymentUseCase"
import { ListPaymentsUseCase } from "../ListPaymentsUseCase"

let createPaymentUseCase: CreatePaymentUseCase
let listPaymentsUseCase : ListPaymentsUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
        
        const paymentsRepository = new PaymentsRepositoryInMemory()

        const ordersService = new OrdersService('http://localhost:9999/api/v1/orders')
        createPaymentUseCase = new CreatePaymentUseCase(paymentsRepository, ordersService)

        listPaymentsUseCase = new ListPaymentsUseCase(paymentsRepository)
    
    })

    it('Should be able to list payments', async () => {
    
        let payment = {            
            orderId: 1,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: 100
        }

        await createPaymentUseCase.execute(payment)
    
        const payments = await listPaymentsUseCase.execute()

        expect(payments.length).toBeGreaterThanOrEqual(1)
    })
})