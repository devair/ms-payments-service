interface IOrdersService {    
    updateOrderStatus({ orderId, status } ): Promise<void>
}

export { IOrdersService }