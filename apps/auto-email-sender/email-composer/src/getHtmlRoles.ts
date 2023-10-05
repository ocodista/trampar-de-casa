import { MongoCollection, Topics, getMongoConnection } from 'shared'
import { RenderRolesSection } from './renderRolesSection'

export type RolesRendererCollection = {
  id: string
  content: string
  topic: Topics
}

export const getHtmlRoles = async (rolesId: string[]) => {
  const mongoConnection = await getMongoConnection()
  const mongoDatabase = mongoConnection.db('auto-email-sender')
  const mongoCollection = mongoDatabase.collection(
    MongoCollection.RolesRenderer
  )

  const roles: RolesRendererCollection[] = []

  for (let index = 0; index < rolesId.length; index++) {
    const roleId = rolesId[index]
    const roleSavedOnMongo =
      await mongoCollection.findOne<RolesRendererCollection>({ id: roleId })
    if (roleSavedOnMongo) {
      roles.push(roleSavedOnMongo)
    }
  }

  return RenderRolesSection({
    roles,
  })
}
