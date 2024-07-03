import { IOrdersService } from "../ports/IOrdersService";

class OrdersService implements IOrdersService{

    constructor(private apiStatus: string){}

    async updateOrderStatus({ orderId, status }: { orderId: any; status: any; }): Promise<void> {
        
        try {
            console.log(this.apiStatus)

            const response = await fetch(`${this.apiStatus}/orders/${orderId}/status`,{
                method: 'PATCH',
                body: JSON.stringify({
                    status: status
                }),
                headers: { "Content-Type": "application/json" },
            })  
            
            if(response.ok){
                console.log(response.body)
            }
            else {
                console.log(response.status)
            }

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }
    
}

export { OrdersService }