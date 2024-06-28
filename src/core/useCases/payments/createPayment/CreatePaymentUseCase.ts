import { IPaymentsGateway } from "../../../../communication/gateways/IPaymentsGateway"
import { Payment } from "../../../entities/Payment"
import { InputCreatePaymentDTO, OutputCreatePaymentDTO } from "./ICreatePaymentDTO"

class CreatePaymentUseCase {

    constructor(private paymentsRepository: IPaymentsGateway){}

    async execute({ orderId, amount, paymentDate, paymentUniqueNumber }: InputCreatePaymentDTO): 
        Promise<OutputCreatePaymentDTO> 
    {
        const payment = new Payment(orderId,amount,paymentDate,paymentUniqueNumber)

        const paymentCreated = await this.paymentsRepository.create(payment)
        
        if(paymentCreated){
            // TODO UPDATE ORDER
            //orderFound.status = OrderStatus.RECEIVED
            //await this.ordersRepository.updateStatus(orderFound)
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