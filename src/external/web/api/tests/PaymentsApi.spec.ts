import request from "supertest";
import { app } from "../../../../index";

describe("PaymentsApi", () => {
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
