import { BeforeAll, AfterAll, After } from '@cucumber/cucumber'
import { connect, closeDatabase, clearDatabase } from './database'
import { settings } from 'pactum'
import { ordersStatusMock } from '../../adapters/services/OrdersServiceMock'

BeforeAll(async () => {

  // Order Service API
  settings.setLogLevel('ERROR')
  await ordersStatusMock.start(3333)
  process.env.ORDERS_URI = 'http://localhost:3333/api/v1'
  
  await connect()
})

AfterAll(async () => {
  await closeDatabase()
  await ordersStatusMock.stop()
})

After(async () => {
  await clearDatabase()
})
