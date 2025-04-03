import { getPostgresClient } from 'db'
import { getRolesInBatches } from 'db/src/supabase/domains/roles/getRoles'
import { MongoCollection, getMongoConnection, logger } from 'shared'
import { parseHTML } from './parseHTML'
import { Database } from 'db'

type RolesSkillsView = Database['public']['Views']['RolesSkillsView']['Row']

export const rolesRenderer = async () => {
  logger.time('rolesRenderer')
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )
  const postgres = getPostgresClient()

  const BATCH_SIZE = 100
  const roleBatches = getRolesInBatches(postgres, BATCH_SIZE)
  for await (const roles of roleBatches) {
    if (!roles?.length) return

    const parsedRoles = roles.map((role) => ({
      id: role.id,
      content: parseHTML(role as RolesSkillsView),
      topic: role.topicId,
    }))
    await mongoCollection.insertMany(parsedRoles)
  }

  await mongoConnection.close()
  logger.timeEnd('rolesRenderer')
}
