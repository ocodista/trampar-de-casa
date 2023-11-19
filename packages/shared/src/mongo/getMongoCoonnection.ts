import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'
dotenv.config()

export const getMongoConnection = async () => {
  const MONGO_ADDRESS = process.env['MONGO_ADDRESS'] as string
  if (!MONGO_ADDRESS) throw new Error('Missing MONGO_ADDRESS')
  const mongoDatabase = new MongoClient(MONGO_ADDRESS, {
    serverApi: {
      version: ServerApiVersion.v1,
      deprecationErrors: true,
      strict: true,
    },
  })
  const mongoConnection = await mongoDatabase.connect()
  return mongoConnection
}
