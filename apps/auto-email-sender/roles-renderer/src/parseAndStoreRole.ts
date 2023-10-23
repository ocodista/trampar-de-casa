import { Database } from 'db'
import { Collection, Document } from 'mongodb'
import { parseHTML } from './parseHTML'

type RolesSkillsView = Database['public']['Views']['RolesSkillsView']['Row']

export const parseAndStoreRole = async (
  role: RolesSkillsView,
  mongoCollection: Collection<Document>
) => {
  console.time(`parseAndStoreRole#${role.id}`)
  const { id } = role
  const html = parseHTML(role)
  await mongoCollection.insertOne({
    id,
    content: html,
    topic: role.topicId,
  })
  console.timeEnd(`parseAndStoreRole#${role.id}`)
}
