import { getPostgresClient } from './src/postgres/getPostgresClient'

export { getPostgresClient }

export * from './src/supabase/domains/roles/saveRoles'
export * from './src/supabase/domains/roles/getSubscriberRoles'
export * from './src/supabase/domains/subscribers/getConfirmedSubscribersRowsBlock'
export * from './src/supabase/domains/subscribers/getAllConfirmedSubscribersPaginated'
export type * from './src/supabase/type'
export type * from './src/types'

export * from './src/supabase/getSupabaseClient'
