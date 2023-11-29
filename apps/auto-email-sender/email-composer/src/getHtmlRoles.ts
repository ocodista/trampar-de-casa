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
) => {
  const roles: RolesRendererCollection[] = []
  let role
  for (const roleId of rolesId) {
    role = memoizedRoles.get(roleId)
    if (!role) {
      role = await mongoCollection.findOne<RolesRendererCollection>({
        id: roleId,
      })
      memoizedRoles.set(roleId, role)
    } else {
      console.log('Get memoized!', roleId)
    }
    if (role) {
      roles.push(role)
    }
  }

  return RenderRolesSection({
    roles,
  })
}
