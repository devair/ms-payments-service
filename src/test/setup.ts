import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { AppDataSource } from '../external/datasource/typeorm'
import { ordersStatusMock } from '../adapters/tests/OrdersServiceMock'
import { settings } from 'pactum'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  process.env.MONGODB_URI = uri

  await mongoose.connect(uri)
  await AppDataSource.setOptions({ url: uri }).initialize()

  // Order Service API
  settings.setLogLevel('ERROR')
  await ordersStatusMock.start(3333)  
  process.env.ORDERS_URI = 'http://localhost:3333/api/v1'

}, 60000)

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await AppDataSource.destroy()
  await mongoServer.stop()
  await ordersStatusMock.stop()

}, 30000)
