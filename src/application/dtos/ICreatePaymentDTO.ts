interface InputCreatePaymentDTO { 
    id?:string   
    orderId: number
    amount: number    
}

interface OutputCreatePaymentDTO {    
    id: string
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string,
    status: string
}

export { InputCreatePaymentDTO, OutputCreatePaymentDTO }