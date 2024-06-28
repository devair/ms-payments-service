
class Payment {
    
    id: string    
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date

    constructor(orderId: number, amount: number, paymentDate: Date, paymentUniqueNumber: string){
        this.orderId = orderId
        this.amount = amount
        this.paymentDate = paymentDate
        this.paymentUniqueNumber = paymentUniqueNumber
        this.createdAt = new Date()
    }
}
export { Payment }