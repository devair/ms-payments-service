import "reflect-metadata"
import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { Payment } from "../../../../core/entities/Payment"
import { PaymentsRepositoryInMemory } from "../PaymentsRepositoryInMemory"

let paymentsRepository: IPaymentsGateway

describe('Payments tests', () => {
    beforeAll(async ()=>{        
        paymentsRepository = new PaymentsRepositoryInMemory()
    })

    it('Should be able to create a new payment for an order', async () => {
        
        let payment = new Payment(1, 90, new Date(), 'UNQ-1')

        const paymentCreated = await paymentsRepository.create(payment)
        
        expect(paymentCreated).toHaveProperty('id')        

    })
})