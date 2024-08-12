import { OutputFindPaymentDTO } from "../../../application/dtos/IFindPaymentDTO"
import { FindByOrderPaymentUseCase } from "../../../application/useCases/payments/FindByOrderPaymentUseCase"

class FindByOrderPaymentController {

    constructor(private findByOrderPaymentUseCase: FindByOrderPaymentUseCase){}

    async handler(orderId: number): Promise<OutputFindPaymentDTO[]>{

        return await this.findByOrderPaymentUseCase.execute(orderId) 

    }
}

export { FindByOrderPaymentController }