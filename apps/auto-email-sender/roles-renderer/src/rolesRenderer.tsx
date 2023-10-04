import { getSupabaseClient } from 'db'
import dotenv from 'dotenv'
import { getRolesInBatches } from './getRoles'
import { getMongoConnection } from './mongo'
import { parseAndStoreRole } from './parseAndStoreRole'
dotenv.config()

export async function rolesRenderer() {
  const supabaseClient = getSupabaseClient()
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection('roles-renderer')

  const BATCH_SIZE = 100
  const roleBatches = getRolesInBatches(supabaseClient, BATCH_SIZE)
  for await (const roles of roleBatches) {
    if (!roles?.length) continue
    await Promise.all(
      roles.map((role) => parseAndStoreRole(role, mongoCollection))
    )
  }

  await mongoConnection.close()
}
