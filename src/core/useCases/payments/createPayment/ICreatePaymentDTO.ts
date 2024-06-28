interface InputCreatePaymentDTO { 
    id?:string   
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

interface OutputCreatePaymentDTO {    
    id: string
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
}

export { InputCreatePaymentDTO, OutputCreatePaymentDTO }