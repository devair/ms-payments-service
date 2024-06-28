import { FindByIdPaymentUseCase } from "../../../core/useCases/payments/findByIdPayment/FindByIdPaymentUseCase";
import { OutputFindPaymentDTO } from "../../../core/useCases/payments/findByIdPayment/IFindPaymentDTO";
import { IPaymentsGateway } from "../../gateways/IPaymentsGateway";

class FindByIdPaymentController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(id: string): Promise<OutputFindPaymentDTO> {

        const findByIdPaymentUseCase = new FindByIdPaymentUseCase(this.paymentsRepository)        

        return await findByIdPaymentUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }