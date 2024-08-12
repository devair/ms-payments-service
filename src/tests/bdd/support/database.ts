import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { AppDataSource } from '../../../infra/datasource/typeorm';

let mongoServer: MongoMemoryServer;

export const connect = async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    process.env.NODE_ENV  = 'test'
    process.env.MONGODB_URI = uri

    console.log('antes do mongoose.connect')

    await mongoose.connect(uri)

    console.log('após do mongoose.connect')

    await AppDataSource.setOptions({ url: uri }).initialize()
  
};

export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await AppDataSource.destroy()
    await mongoServer.stop() 
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
