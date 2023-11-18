import { getSupabaseClient } from 'db'
import { getRolesInBatches } from 'db/src/supabase/domains/roles/getRoles'
import dotenv from 'dotenv'
import { MongoCollection, getMongoConnection } from 'shared'
import { parseHTML } from './parseHTML'
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
    if (!roles?.length) return

    const parsedRoles = roles.map((role) => ({
      id: role.id,
      content: parseHTML(role),
      topic: role.topicId,
    }))
    await mongoCollection.insertMany(parsedRoles)
  }

  await mongoConnection.close()
  console.timeEnd('rolesRenderer')
}
