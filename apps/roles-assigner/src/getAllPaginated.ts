import { Roles, SupabaseClient } from 'db'
import { Entities } from 'shared'
import { getRowsBlock } from './getRowsBlock'

interface GetAllPaginated {
  supabase: SupabaseClient
  entity: Entities
  batchSize: number
}

export async function* getAllPaginated({
  supabase,
  entity,
  batchSize,
}: GetAllPaginated) {
  let start = 0
  while (true) {
    const roles: Roles[] = await getRowsBlock({
      supabase,
      entity,
      start,
      end: start + batchSize - 1,
    })
    if (!roles?.length) return
    yield roles
    start += batchSize
  }
}
