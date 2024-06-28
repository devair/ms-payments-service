import { Payment } from "../../core/entities/Payment"


interface IPaymentsGateway {

    create(payment: Payment ): Promise<Payment>

    list(): Promise<Payment[]>

    findById(id: string): Promise<Payment>

    findByOrder(orderId: number): Promise<Payment[]>
}

export { IPaymentsGateway }