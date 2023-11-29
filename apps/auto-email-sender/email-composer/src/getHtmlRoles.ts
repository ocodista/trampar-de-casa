import { Collection, Document } from 'mongodb'
import { Topics } from 'shared'
import { RenderRolesSection } from './renderRolesSection'

export type RolesRendererCollection = {
  id: string
  content: string
  topic: Topics
}

export const getHtmlRoles = async (
  rolesId: string[],
  mongoCollection: Collection<Document>,
  memoizedRoles: Map<any, any>
): Promise<string> => {
  const roles: RolesRendererCollection[] = []
  let role
  console.time('getHtmlRoles [For Loop]')
  for (const roleId of rolesId) {
    role = memoizedRoles.get(roleId)
    if (!role) {
      console.time('getHtmlRoles [mongoCollection.findOne]')
      role = await mongoCollection.findOne<RolesRendererCollection>({
        id: roleId,
      })
      memoizedRoles.set(roleId, role)
      console.timeEnd('getHtmlRoles [mongoCollection.findOne]')
    }
    if (role) {
      roles.push(role)
    }
  }
  console.timeEnd('getHtmlRoles [For Loop]')

  return RenderRolesSection({
    roles,
  })
}
