interface OutputFindPaymentDTO {
    id: string
    orderId: number
    amount: number
    paymentDate: Date
    paymentUniqueNumber: string
    createdAt: Date
}

export { OutputFindPaymentDTO  }