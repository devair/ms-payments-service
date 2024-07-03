import { CreatePaymentUseCase } from "../../../core/useCases/payments/createPayment/CreatePaymentUseCase";
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "../../../core/useCases/payments/createPayment/ICreatePaymentDTO";
import { IOrdersService } from "../../../ports/IOrdersService";
import { IPaymentsGateway } from "../../gateways/IPaymentsGateway";

class CreatePaymentController {

    constructor(private paymentsRepository: IPaymentsGateway, private ordersService: IOrdersService) { }

    async handler({ orderId, amount, paymentDate, paymentUniqueNumber }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {
        const paymentCreated = new CreatePaymentUseCase(this.paymentsRepository, this.ordersService)

        return await paymentCreated.execute({ orderId, amount, paymentDate, paymentUniqueNumber });

    }
}

export { CreatePaymentController }