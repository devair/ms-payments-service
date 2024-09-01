import { ApprovePaymentUserCase } from "../../../application/useCases/payments/ApprovePaymentUserCase"
import { Payment } from "../../../core/entities/Payment"


export class ApprovePaymentController {

    constructor(private approvedPaymentUserCase: ApprovePaymentUserCase) { }

    async handler(id: string, paymentDate: Date, paymentUniqueNumber: string ): Promise<Payment> {
        return  await this.approvedPaymentUserCase.execute(id, paymentDate, paymentUniqueNumber)            
    }
}