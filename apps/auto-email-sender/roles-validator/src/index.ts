import { MongoCollection } from 'shared'
import { getMongoConnection } from './mongo'
import { rolesValidator } from './rolesValidator'

;(async () => {
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )

  await rolesValidator(mongoCollection).finally(
    async () => await mongoConnection.close()
  )
})()
