import "reflect-metadata"
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const dbname = process.env.DB_DATABASE 
const url = process.env.MONGO_URI

const AppDataSource = new DataSource({
    type: "mongodb",
    url: url,
    database: dbname,
    synchronize: true,
    logging: true,    
    entities: ["./dist/external/datasource/typeorm/entities/*.js"],
    subscribers: [],
    migrations: [],
    
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export { AppDataSource } 