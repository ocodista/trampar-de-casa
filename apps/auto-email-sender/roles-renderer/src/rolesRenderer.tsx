import { getSupabaseClient } from 'db'
import { getRolesInBatches } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { MongoCollection, getMongoConnection } from 'shared'
import { parseAndStoreRole } from './parseAndStoreRole'
dotenv.config()

export async function rolesRenderer() {
  console.time('rolesRenderer')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )
  const supabase = getSupabaseClient()

  const BATCH_SIZE = 100
  const roleBatches = getRolesInBatches(supabase, BATCH_SIZE)
  for await (const roles of roleBatches) {
    if (!roles?.length) continue
    await Promise.all(
      roles.map((role) => parseAndStoreRole(role, mongoCollection))
    )
  }

  await mongoConnection.close()
  console.timeEnd('rolesRenderer')
}
