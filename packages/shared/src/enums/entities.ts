import { Database } from 'db'

type DbTableNames = {
  [K in keyof Partial<Database['public']['Tables']>]?: K
}

export const Entities: DbTableNames = {
  Topics: 'Topics',
  Roles: 'Roles',
  UserRoles: 'UserRoles',
  Skills: 'Skills',
  Subscribers: 'Subscribers',
  SubscriberTopics: 'SubscriberTopics',
}
