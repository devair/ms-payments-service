import "reflect-metadata"
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const dbname = process.env.DB_DATABASE 

const isTestEnvironment = process.env.NODE_ENV === "test";
const entities = isTestEnvironment ? process.env.TYPEORM_ENTITIES  : 'dist/external/datasource/typeorm/entities/*.js'

const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,    
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,    
    entities: [ `${entities}` ]             
})

export { AppDataSource } 