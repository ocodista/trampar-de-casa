import { Subscribers, SupabaseClient } from 'db'
import { Entities } from 'shared'
import { getConfirmedSubscribersRowsBlock } from './getConfirmedSubscribersRowsBlock'

interface GetAllPaginated {
  supabase: SupabaseClient
  entity: Entities
  batchSize: number
}

export async function* getAllConfirmedSubscribersPaginated({
  supabase,
  entity,
  batchSize,
}: GetAllPaginated): AsyncGenerator<Subscribers[]> {
  let start = 0
  while (true) {
    const rows: Subscribers[] =
      await getConfirmedSubscribersRowsBlock<Subscribers>({
        supabase,
        entity,
        start,
        end: start + batchSize - 1,
      })
    if (!rows?.length) return
    yield rows
    start += batchSize
  }
}
