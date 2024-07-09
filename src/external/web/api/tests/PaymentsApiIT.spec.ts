import { mock, settings } from 'pactum';
import { spec } from 'pactum';


mock.addInteraction({
  request: {
    method: 'POST',
    path: '/api/v1/payments'
  },
  response: {
    status: 201,
    body: 
        {
            "id": 6,
            "orderId": 1,
            "amount": "100",
            "paymentDate": "2024-03-09T07:56:00",
            "paymentUniqueNumber": "123"
        }    
  }
});


describe('Payments tests',  () => {
    beforeAll(async () => {

        settings.setLogLevel('ERROR');

        await mock.start(9876);
    });

    afterAll(async () => {

        await mock.stop()
    });

    it('Should be able to create a new payment for an order', async () => {
                   

        await spec()
            .post('http://localhost:9876/api/v1/payments')            
            .withHeaders('Content-Type', 'application/json')             
            .expectStatus(201)
    })
})
