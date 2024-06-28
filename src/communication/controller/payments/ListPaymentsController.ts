import { OutputFindPaymentDTO } from "../../../core/useCases/payments/findByIdPayment/IFindPaymentDTO";
import { ListPaymentsUseCase } from "../../../core/useCases/payments/listPayments/ListPaymentsUseCase";
import { IPaymentsGateway } from "../../gateways/IPaymentsGateway";

class ListPaymentsController {
    
    constructor(private paymentsRepository: IPaymentsGateway){}

    async handler(): Promise<OutputFindPaymentDTO[]> {

        const listPaymentsUseCase = new ListPaymentsUseCase(this.paymentsRepository)        

        return await listPaymentsUseCase.execute();       

    }
}

export { ListPaymentsController }