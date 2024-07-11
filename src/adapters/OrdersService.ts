import { IOrdersService } from "../ports/IOrdersService";

/**
 * Implementation of Order Microsservice callout 
 */
class OrdersService implements IOrdersService{
    static ORDERS_URI = process.env.ORDERS_URI
    
    constructor(){}

    /**
     * Make callout to update order status     
     */
    async updateOrderStatus({ orderId, status }: { orderId: any; status: any; }): Promise<void> {
        
        try {
            const response = await fetch(`${OrdersService.ORDERS_URI}/orders/${orderId}/status`,{
                method: 'PATCH',
                body: JSON.stringify({
                    status: status
                }),
                headers: { "Content-Type": "application/json" },
            })                         

        } catch (error) {
            console.log(error)
        }
    }
    
}

export { OrdersService }