import { ApprovePaymentUserCase } from "../../../application/useCases/payments/ApprovePaymentUserCase"
import { RejectPaymentUserCase } from "../../../application/useCases/payments/RejectPaymentUserCase"
import { Payment } from "../../../core/entities/Payment"


export class RejectApprovePaymentController {

    constructor(private rejectPaymentUserCase: RejectPaymentUserCase) { }

    async handler(id: string, reason: string ): Promise<Payment> {
        return  await this.rejectPaymentUserCase.execute(id, reason)            
    }
}