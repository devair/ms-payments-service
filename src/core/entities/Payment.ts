
class Payment {

    id: string
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date
    status: string

    constructor(orderId: number, amount: number) {
        this.orderId = orderId
        this.amount = amount
        this.createdAt = new Date()
        this.status = PaymentStatus.PENDING
    }

    received(paymentDate: Date, paymentUniqueNumber: string) {
        this.paymentDate = paymentDate
        this.status = PaymentStatus.APPROVED
        this.paymentUniqueNumber = paymentUniqueNumber
    }
}
export { Payment }

export enum PaymentStatus {
    PENDING = "Pagamento pendente",
    APPROVED = "Aprovado",
    REJECTED = "Rejeitado"
}