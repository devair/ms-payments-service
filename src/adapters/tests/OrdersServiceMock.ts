import { mock } from 'pactum';


const ordersStatusMock = mock

ordersStatusMock.addInteraction({
    request: {
      method: 'PATCH',
      path: '/api/v1/orders/1/status'
    },
    response: {
      status: 200,
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

export { ordersStatusMock }