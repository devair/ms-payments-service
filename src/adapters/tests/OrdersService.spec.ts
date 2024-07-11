import { spec } from 'pactum';
import { ordersStatusMock } from "../tests/OrdersServiceMock";

const ORDERS_URI = process.env.ORDERS_URI

describe('Payments tests',  () => {
    it('Should be able to create a new payment for an order', async () => {
        await spec()
            .patch(`${ORDERS_URI}/orders/1/status`)            
            .withHeaders('Content-Type', 'application/json')             
            .expectStatus(200)
    })
})
