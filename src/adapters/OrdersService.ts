import { IOrdersService } from "../ports/IOrdersService";

class OrdersService implements IOrdersService{

    constructor(private apiStatus: string){}

    async updateOrderStatus({ orderId, status }: { orderId: any; status: any; }): Promise<void> {
        
        try {
            const response = await fetch(`${this.apiStatus}/orders/${orderId}/status`,{
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