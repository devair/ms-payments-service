import { OutputFindPaymentDTO } from "../../../core/useCases/payments/findByIdPayment/IFindPaymentDTO"
import { FindByOrderPaymentUseCase } from "../../../core/useCases/payments/findByOrderPayment/FindByOrderPaymentUseCase"
import { IPaymentsGateway } from "../../gateways/IPaymentsGateway"

class FindByOrderPaymentController {

    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(orderId: number): Promise<OutputFindPaymentDTO[]>{

        const findByOrderPaymentUseCase = new FindByOrderPaymentUseCase(this.paymentsRepository)        
        return await findByOrderPaymentUseCase.execute(orderId) 

    }
}

export { FindByOrderPaymentController }