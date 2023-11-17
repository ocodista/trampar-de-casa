import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'
dotenv.config()

const MONGO_ADDRESS = process.env['MONGO_ADDRESS'] as string

export const getMongoConnection = async () => {
  console.time('connect to Mongo')
  console.log('[getMongoConnection] connecting...')
  if (!MONGO_ADDRESS) throw new Error('Missing MONGO_ADDRESS')
  const mongoDatabase = new MongoClient(MONGO_ADDRESS, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  const mongoConnection = await mongoDatabase.connect()
  console.log('[getMongoConnection] connected!')
  console.timeEnd('connect to Mongo')
  return mongoConnection
}
