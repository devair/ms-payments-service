import request from "supertest"
import { settings } from "pactum"
import { app } from "../../../../application"
import { OutputCreatePaymentDTO } from "../../../../application/dtos/ICreatePaymentDTO"
import { ordersStatusMock } from "../../../adapters/services/OrdersServiceMock"
import { CreatePaymentUseCase } from "../../../../application/useCases/payments/CreatePaymentUseCase"
import { AppDataSource } from "../../../../infra/datasource/typeorm"


const ORDERS_URI = process.env.ORDERS_URI

let onePayment: OutputCreatePaymentDTO
let createPaymentUseCase: CreatePaymentUseCase

describe("PaymentsApi", () => {

  beforeAll(async () => {
    // Order Service API
    settings.setLogLevel('ERROR')
    //await ordersStatusMock.start(3333)
    process.env.ORDERS_URI = 'http://localhost:3333/api/v1'


    createPaymentUseCase = new CreatePaymentUseCase(AppDataSource)
    
  }, 5000)

  afterAll(async () => {
    await ordersStatusMock.stop()
  }, 30000)


  it("should create a new payment", async () => {
    const payment = {            
      orderId: 1,
      paymentUniqueNumber: 'UNQ-1',
      paymentDate: new Date(),
      amount: 100
  }

  onePayment = await createPaymentUseCase.execute(payment)
  
  expect(onePayment).toHaveProperty('id') 

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
