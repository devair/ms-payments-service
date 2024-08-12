import { CreatePaymentUseCase } from "../../../application/useCases/payments/createPayment/CreatePaymentUseCase"
import { ListPaymentsUseCase } from "../../../application/useCases/payments/listPayments/ListPaymentsUseCase"
import { AppDataSource } from "../../../infra/datasource/typeorm"

let createPaymentUseCase: CreatePaymentUseCase
let listPaymentsUseCase : ListPaymentsUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{            
        createPaymentUseCase = new CreatePaymentUseCase(AppDataSource)
        listPaymentsUseCase = new ListPaymentsUseCase(AppDataSource)    
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

        expect(payments).toBeInstanceOf(Array)
    })
})