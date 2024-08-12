import { DataSource } from "typeorm"
import { IPaymentsGateway } from "../../../communication/gateways/IPaymentsGateway"
import { PaymentEntity } from "../../../infra/datasource/typeorm/entities/PaymentEntity"
import { PaymentsRepositoryMongoDb } from "../../../infra/datasource/typeorm/mongodb/PaymentsRepositoryMongoDb"
import { OutputFindPaymentDTO } from "../../dtos/IFindPaymentDTO"

class FindByIdPaymentUseCase {

    private paymentsRepository: IPaymentsGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.paymentsRepository = new PaymentsRepositoryMongoDb(this.dataSource.getRepository(PaymentEntity))
    }

    async execute(id: string): Promise<OutputFindPaymentDTO> {
        const payment = await this.paymentsRepository.findById(id)

        if (!payment) {
            throw new Error(`Payment ${id} not found`)
        }
        return {
            id: payment.id,
            orderId: payment.orderId,
            amount: payment.amount,
            paymentDate: payment.paymentDate,
            paymentUniqueNumber: payment.paymentUniqueNumber,
            createdAt: payment.createdAt
        }
    }
}

export { FindByIdPaymentUseCase }