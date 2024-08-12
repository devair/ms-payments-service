import { DataSource } from "typeorm"
import { IPaymentsGateway } from "../../../communication/gateways/IPaymentsGateway"
import { PaymentEntity } from "../../../infra/datasource/typeorm/entities/PaymentEntity"
import { PaymentsRepositoryMongoDb } from "../../../infra/datasource/typeorm/mongodb/PaymentsRepositoryMongoDb"
import { OutputFindPaymentDTO } from "../../dtos/IFindPaymentDTO"


class ListPaymentsUseCase {
    
    private paymentsRepository: IPaymentsGateway

    constructor(
        private dataSource: DataSource        
    ){
        this.paymentsRepository = new PaymentsRepositoryMongoDb(this.dataSource.getRepository(PaymentEntity))
    }

    async execute(): Promise<OutputFindPaymentDTO[]>{
        const payments = await this.paymentsRepository.list()

        const output = payments.map((elem) => ({
            id: elem.id,
            orderId: elem.orderId,
            amount: elem.amount,
            paymentDate: elem.paymentDate,
            paymentUniqueNumber: elem.paymentUniqueNumber,
            createdAt : elem.createdAt,
            status: elem.status
        }))

        return output
    }
}
export { ListPaymentsUseCase }