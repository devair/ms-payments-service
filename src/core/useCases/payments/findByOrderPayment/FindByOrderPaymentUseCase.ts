import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { OutputFindPaymentDTO } from "../findByIdPayment/IFindPaymentDTO"

class FindByOrderPaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway) { }

    async execute(orderId: number): Promise<OutputFindPaymentDTO[]> {
        const payments = await this.paymentsRepository.findByOrder(orderId)

        const output = payments.map((elem) => ({
            id: elem.id,
            orderId: elem.orderId,
            amount: elem.amount,
            paymentDate: elem.paymentDate,
            paymentUniqueNumber: elem.paymentUniqueNumber       
        }))

        return output
    }
}

export { FindByOrderPaymentUseCase }