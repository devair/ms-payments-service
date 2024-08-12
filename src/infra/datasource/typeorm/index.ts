import "reflect-metadata"
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const isTestEnvironment = process.env.NODE_ENV === "test";
const entities = isTestEnvironment ? process.env.TYPEORM_ENTITIES  : 'dist/adapters/datasource/typeorm/entities/*.js'

const commonConfig = {
    entities: [__dirname + '/entities/*.ts','dist/adapters/**/entities/*.js'],
    synchronize: true,
    logging: false
  };

const AppDataSource = new DataSource({
    ...commonConfig,
    type: "mongodb",
    url: process.env.MONGO_URI,    
    database: process.env.DB_DATABASE        
})

export { AppDataSource } 