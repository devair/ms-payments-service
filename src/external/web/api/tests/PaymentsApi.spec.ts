import request from "supertest";
import { app } from "../../../../index";

import { ordersStatusMock } from "../../../../adapters/tests/OrdersServiceMock";
import { settings } from 'pactum'

const ORDERS_URI = process.env.ORDERS_URI

describe("PaymentsApi", () => {

  beforeAll(async () => {
    // Order Service API
    settings.setLogLevel('ERROR')
    await ordersStatusMock.start(3333)
    process.env.ORDERS_URI = 'http://localhost:3333/api/v1'
  }, 60000)

  afterAll(async () => {
    await ordersStatusMock.stop()
  }, 30000)


  it("should create a new payment", async () => {
    const response = await request(app)
      .post("/api/v1/payments")
      .send({
        orderId: 1,
        amount: 20,
        paymentDate: Date.now(),
        paymentUniqueNumber: "123",

      });
    //expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.orderId).toBe(1);
    expect(response.body.amount).toBe(20);
  });

  it("should get all payments", async () => {
    const response = await request(app).get("/api/v1/payments");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
