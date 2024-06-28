import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { OutputFindPaymentDTO } from "./IFindPaymentDTO"

class FindByIdPaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway) { }

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
            paymentUniqueNumber: payment.paymentUniqueNumber
        }
    }
}

export { FindByIdPaymentUseCase }