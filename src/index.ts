import 'reflect-metadata'
import express from 'express'
import "express-async-errors"
import * as dotenv from 'dotenv'
import { router } from './external/web/routers'
import { AppDataSource } from './external/datasource/typeorm'

dotenv.config()

const app = express()
const port = process.env.APP_PORT;

app.use(express.json())

app.get('/health', (request, response) => {
    return response.status(200).send('Ok');
})

app.use('/api/v1', router)

if (process.env.NODE_ENV !== 'test') {
    AppDataSource.initialize().then(() => {
        app.listen(port, () => {
            console.log(`Server started in ${process.env.NODE_ENV} mode on port ${port}`);
        });
    }).catch(error => console.log(error));
}

export { app }