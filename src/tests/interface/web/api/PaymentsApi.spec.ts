import request from "supertest"
import { settings } from "pactum"
import { app } from "../../../../application"
import { OutputCreatePaymentDTO } from "../../../../application/dtos/ICreatePaymentDTO"
import { ordersStatusMock } from "../../../adapters/services/OrdersServiceMock"


const ORDERS_URI = process.env.ORDERS_URI

let onePayment: OutputCreatePaymentDTO

describe("PaymentsApi", () => {

  beforeAll(async () => {
    // Order Service API
    settings.setLogLevel('ERROR')
    //await ordersStatusMock.start(3333)
    process.env.ORDERS_URI = 'http://localhost:3333/api/v1'
  }, 5000)

  afterAll(async () => {
    await ordersStatusMock.stop()
  }, 30000)


  it("should create a new payment", async () => {
    const response = await request(await app)
      .post("/api/v1/payments")
      .send({
        orderId: 1,
        amount: 20,
        paymentDate: Date.now(),
        paymentUniqueNumber: "123",

      })
    //expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body.orderId).toBe(1)
    expect(response.body.amount).toBe(20)

    onePayment = response.body

  })

  it("should get all payments", async () => {
    const response = await request(await app).get("/api/v1/payments")
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it('Should be able to find a payment by id', async () => {

    const response = await request(await app).get(`/api/v1/payments/${onePayment.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")

  })


  it('Should be able to find a payment by order id', async () => {

    const response = await request(await app).get(`/api/v1/payments/order/${onePayment.orderId}`)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)

  })

  it('Should be check helth', async () => {    
    const response = await request(await app).get(`/health`)    
    expect(response.status).toBe(200)
  })
})
