import { spec } from 'pactum';
import { ordersStatusMock } from "../tests/OrdersServiceMock";
import { settings } from 'pactum'

const ORDERS_URI = process.env.ORDERS_URI

describe('Payments tests', () => {

    beforeAll(async () => {
        // Order Service API
        settings.setLogLevel('ERROR')
        await ordersStatusMock.start(3333)
        process.env.ORDERS_URI = 'http://localhost:3333/api/v1'
    }, 60000)

    afterAll(async () => {
        await ordersStatusMock.stop()
    }, 30000)

    it('Should be able to create a new payment for an order', async () => {
        await spec()
            .patch(`${ORDERS_URI}/orders/1/status`)
            .withHeaders('Content-Type', 'application/json')
            .expectStatus(200)
    })
})
