import { OutputFindPaymentDTO } from "../../../application/dtos/IFindPaymentDTO"
import { FindByIdPaymentUseCase } from "../../../application/useCases/payments/FindByIdPaymentUseCase"

class FindByIdPaymentController {
    
    constructor(private findByIdPaymentUseCase: FindByIdPaymentUseCase){}
    
    async handler(id: string): Promise<OutputFindPaymentDTO> {            

        return await this.findByIdPaymentUseCase.execute(id);       

    }
}

export { FindByIdPaymentController }