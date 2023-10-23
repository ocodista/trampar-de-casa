import { SupabaseClient } from 'db'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'
import { getConfirmedSubscribersRowsBlock } from './getConfirmedSubscribersRowsBlock'

type Subscribers = SupabaseTable<'Subscribers'>

interface GetAllPaginated {
  supabase: SupabaseClient
  batchSize: number
}

export async function* getAllConfirmedSubscribersPaginated({
  supabase,
  batchSize,
}: GetAllPaginated): AsyncGenerator<Subscribers[]> {
  let start = 0
  while (true) {
    const rows: Subscribers[] =
      await getConfirmedSubscribersRowsBlock<Subscribers>({
        supabase,
        start,
        end: start + batchSize - 1,
      })
    if (!rows?.length) return
    yield rows
    start += batchSize
  }
}
