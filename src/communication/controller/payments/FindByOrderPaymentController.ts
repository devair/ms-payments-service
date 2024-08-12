import { OutputFindPaymentDTO } from "../../../application/dtos/IFindPaymentDTO"
import { FindByOrderPaymentUseCase } from "../../../application/useCases/payments/findByOrderPayment/FindByOrderPaymentUseCase"

class FindByOrderPaymentController {

    constructor(private findByOrderPaymentUseCase: FindByOrderPaymentUseCase){}

    async handler(orderId: number): Promise<OutputFindPaymentDTO[]>{

        return await this.findByOrderPaymentUseCase.execute(orderId) 

    }
}

export { FindByOrderPaymentController }