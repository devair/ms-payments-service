import { DataSource } from "typeorm"
import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { Payment } from "../../../../core/entities/Payment"
import { PaymentEntity } from "../../../../infra/datasource/typeorm/entities/PaymentEntity"
import { PaymentsRepositoryMongoDb } from "../../../../infra/datasource/typeorm/mongodb/PaymentsRepositoryMongoDb"
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "../../../dtos/ICreatePaymentDTO"

class CreatePaymentUseCase {

    private paymentsRepository: IPaymentsGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.paymentsRepository = new PaymentsRepositoryMongoDb(this.dataSource.getRepository(PaymentEntity))
    }

    async execute({ orderId, amount }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {
        const payment = new Payment(orderId,amount)

        const paymentCreated = await this.paymentsRepository.create(payment)

        return {
            id: paymentCreated.id,            
            orderId: paymentCreated.orderId,
            amount: paymentCreated.amount,
            paymentDate: paymentCreated.paymentDate,
            paymentUniqueNumber: paymentCreated.paymentUniqueNumber,
            status: paymentCreated.status
        }
    }

}

export { CreatePaymentUseCase } 