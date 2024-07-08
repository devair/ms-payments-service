import "reflect-metadata"
import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { Payment } from "../../../../core/entities/Payment"
import { PaymentsRepositoryInMemory } from "../PaymentsRepositoryInMemory"

let paymentsRepository: IPaymentsGateway
let payment: Payment

describe('Payments tests', () => {
    beforeEach(async ()=>{        
        paymentsRepository = new PaymentsRepositoryInMemory()
        payment = new Payment(1, 90, new Date(), 'UNQ-1')
    })

    it('Should be able to create a new payment for an order', async () => {
        
        const paymentCreated = await paymentsRepository.create(payment)
        
        expect(paymentCreated).toHaveProperty('id')        

    })

    it('Should be able to list all payments', async()=>{
        
        await paymentsRepository.create(payment)

        const payments = await paymentsRepository.list()

        expect(payments.length).toBe(1)
    })

    it('Should be able to find a payment by id', async()=>{
        
        const paymentCreated = await paymentsRepository.create(payment)

        payment = await paymentsRepository.findById(paymentCreated.id)
        
        expect(payment).toHaveProperty('id')
    })

    it('Should be able to find a payment by order id', async()=>{
        
        await paymentsRepository.create(payment)

        const payments = await paymentsRepository.findByOrder(1)

        expect(payments.length).toBe(1)
    })
})