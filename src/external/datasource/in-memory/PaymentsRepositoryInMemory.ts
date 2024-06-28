import { Payment } from "../../../core/entities/Payment";
import { IPaymentsGateway } from "../../../communication/gateways/IPaymentsGateway";
import { genId } from "./Util";

class PaymentsRepositoryInMemory implements IPaymentsGateway{

    private payments: Payment[]

    constructor(){
        this.payments = []
    }

    async create(payment: Payment): Promise<Payment> {
        payment.id = genId(this.payments)
        this.payments.push(payment)
        return payment
    }
    async list(): Promise<Payment[]> {
        return this.payments
    }
    
    async findById(id: string): Promise<Payment> {
        const payment = this.payments.find((payment)=> payment.id === id)

        return payment
    }    

    async findByOrder(orderId: number): Promise<Payment[]> {
        let payments : Payment[] = []

        this.payments.forEach((payment) => {
            if(payment.orderId === orderId){
                payments.push(payment)
            }
        })            

        return payments
    }
}

export { PaymentsRepositoryInMemory }