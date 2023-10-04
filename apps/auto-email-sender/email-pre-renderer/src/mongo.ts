import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

const MONGO_PASSWORD = process.env['MONGO_PASSWORD'] as string
const MONGO_USERNAME = process.env['MONGO_USERNAME'] as string
const MONGO_ADDRESS = process.env['MONGO_ADDRESS'] as string
// Connection URL
const url = `mongodb://${MONGO_ADDRESS}:27017`
export const mongoDatabase = new MongoClient(url, {
  auth: { password: MONGO_PASSWORD, username: MONGO_USERNAME },
})

export const getMongoConnection = async () => {
  const mongoConnection = await mongoDatabase.connect()

  return mongoConnection
}
