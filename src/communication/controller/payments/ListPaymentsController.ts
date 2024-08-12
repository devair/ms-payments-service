import { OutputFindPaymentDTO } from "../../../application/dtos/IFindPaymentDTO"
import { ListPaymentsUseCase } from "../../../application/useCases/payments/listPayments/ListPaymentsUseCase"

class ListPaymentsController {
    
    constructor(private listPaymentsUseCase: ListPaymentsUseCase){}

    async handler(): Promise<OutputFindPaymentDTO[]> {

        return await this.listPaymentsUseCase.execute();       

    }
}

export { ListPaymentsController }