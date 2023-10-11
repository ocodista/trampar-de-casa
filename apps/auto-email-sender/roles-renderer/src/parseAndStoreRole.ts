import { RolesSkillsView } from 'getRoles'
import { Collection, Document } from 'mongodb'
import { parseHTML } from './parseHTML'

export const parseAndStoreRole = async (
  role: RolesSkillsView,
  mongoCollection: Collection<Document>
) => {
  const { id } = role
  const html = parseHTML(role)
  await mongoCollection.insertOne({
    id,
    content: html,
    topic: role.topicId,
  })
  console.log({
    id,
    content: html,
    topic: role.topicId,
  })
}
