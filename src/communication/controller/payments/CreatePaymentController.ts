import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "../../../application/dtos/ICreatePaymentDTO"
import { CreatePaymentUseCase } from "../../../application/useCases/payments/createPayment/CreatePaymentUseCase"

class CreatePaymentController {

    constructor(private paymentCreated: CreatePaymentUseCase) { }

    async handler({ orderId, amount }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {      
        return await this.paymentCreated.execute({ orderId, amount });

    }
}

export { CreatePaymentController }