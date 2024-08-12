import { PaymentsRepositoryMongoDb } from "../../../../../infra/datasource/typeorm/mongodb/PaymentsRepositoryMongoDb"
import { IPaymentsGateway } from "../../../../../communication/gateways/IPaymentsGateway"
import { Payment } from "../../../../../core/entities/Payment"
import { AppDataSource } from "../../../../../infra/datasource/typeorm"
import { PaymentEntity } from "../../../../../infra/datasource/typeorm/entities/PaymentEntity"

let paymentsRepository: IPaymentsGateway
let payment: Payment

describe('Payments tests', () => {
    beforeEach(async ()=>{        
        paymentsRepository = new PaymentsRepositoryMongoDb(AppDataSource.getMongoRepository(PaymentEntity))
        payment = new Payment(1, 90)
    })

    it('Should be able to create a new payment for an order', async () => {
        
        const paymentCreated = await paymentsRepository.create(payment)
        
        expect(paymentCreated).toHaveProperty('id')        

    })

    it('Should be able to list all payments', async()=>{
        
        await paymentsRepository.create(payment)

        const payments = await paymentsRepository.list()

        expect(payments).toBeInstanceOf(Array)
    })

    it('Should be able to find a payment by id', async()=>{
        
        const paymentCreated = await paymentsRepository.create(payment)

        payment = await paymentsRepository.findById(paymentCreated.id)
        
        expect(payment).toHaveProperty('id')
    })

    it('Should be able to find a payment by order id', async()=>{
        
        await paymentsRepository.create(payment)

        const payments = await paymentsRepository.findByOrder(1)

        expect(payments).toBeInstanceOf(Array)
    })
})