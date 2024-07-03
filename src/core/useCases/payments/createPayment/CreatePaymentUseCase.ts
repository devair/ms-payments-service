import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { IOrdersService } from "../../../../ports/IOrdersService"
import { Payment } from "../../../entities/Payment"
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "./ICreatePaymentDTO"

class CreatePaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway, private ordersService: IOrdersService ){}

    async execute({ orderId, amount, paymentDate, paymentUniqueNumber }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {
        const payment = new Payment(orderId,amount,paymentDate,paymentUniqueNumber)

        const paymentCreated = await this.paymentsRepository.create(payment)
        
        if(paymentCreated){                        
            this.ordersService.updateOrderStatus({ orderId, status: 'Pronto'})          
        }

        return {
            id: paymentCreated.id,            
            orderId: paymentCreated.orderId,
            amount: paymentCreated.amount,
            paymentDate: paymentCreated.paymentDate,
            paymentUniqueNumber: paymentCreated.paymentUniqueNumber
        }
    }

}

export { CreatePaymentUseCase } 