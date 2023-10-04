import { Collection, Document } from 'mongodb'
import { withExecutionTimeLogging } from 'shared/src/observability/withExecutionTimeLogging'
import { EmailProps } from './getEmailProps'

export const saveSubscriberRoles = withExecutionTimeLogging(
  async (mongoCollection: Collection<Document>, emailProps: EmailProps) => {
    await mongoCollection.insertOne({
      ...emailProps.user,
      rolesId: emailProps.rolesId,
    })
  },
  { name: 'saveSubscriberRoles' }
)
