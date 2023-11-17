import { MongoCollection, getMongoConnection } from 'shared'
import { rolesValidator } from './rolesValidator'
;(async () => {
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )

  await rolesValidator(mongoCollection).finally(async () => {
    await mongoConnection.close()
    process.exit(0)
  })
})()
