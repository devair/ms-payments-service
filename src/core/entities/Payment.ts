
class Payment {

    id: string
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date
    status: string
    reason: string

    constructor(orderId: number, amount: number) {
        this.orderId = orderId
        this.amount = amount
        this.createdAt = new Date()
        this.status = PaymentStatus.PENDING
    }

    receive(paymentDate: Date, paymentUniqueNumber: string) {
        this.paymentDate = paymentDate
        this.status = PaymentStatus.APPROVED
        this.paymentUniqueNumber = paymentUniqueNumber
    }

    reject(reason) {        
        this.status = PaymentStatus.REJECTED        
        this.reason = reason
    }
}
export { Payment }

export enum PaymentStatus {
    PENDING = "Pagamento pendente",
    APPROVED = "Aprovado",
    REJECTED = "Rejeitado"
}