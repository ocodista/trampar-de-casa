import { getPostgresClient } from '../../../postgres/getPostgresClient'
import { Subscriber, Role } from '../../../types'

const calculateYearsOfExperience = (startedWorkingAt: Date | null): number => {
  if (!startedWorkingAt) return 0
  const currentDate = new Date()
  return currentDate.getFullYear() - new Date(startedWorkingAt).getFullYear()
}

let topRolesCache: Role[] | undefined = undefined

export const top40Roles = async (): Promise<Role[]> => {
  if (topRolesCache) return topRolesCache

  const pgClient = getPostgresClient()
  topRolesCache = await pgClient.getRolesForSubscriber(null, null, 40)
  return topRolesCache
}

export const getSubscriberRoles = async ({
  skillsId,
  startedWorkingAt,
}: Pick<Subscriber, 'skillsId' | 'startedWorkingAt'>): Promise<Role[]> => {
  if (!skillsId?.length) {
    return await top40Roles()
  }

  const pgClient = getPostgresClient()
  const yearOfExperience = calculateYearsOfExperience(startedWorkingAt)
  const roles = await pgClient.getRolesForSubscriber(
    skillsId,
    yearOfExperience,
    40
  )

  if (!roles.length) {
    return await top40Roles()
  }

  return roles
}
