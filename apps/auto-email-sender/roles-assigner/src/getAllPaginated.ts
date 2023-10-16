import { Database, SupabaseClient } from 'db'
import { Entities } from 'shared'
import { getRowsBlock } from './getRowsBlock'

interface GetAllPaginated {
  supabase: SupabaseClient<Database>
  entity: Entities
  batchSize: number
}

export async function* getAllPaginated<Entity>({
  supabase,
  entity,
  batchSize,
}: GetAllPaginated): AsyncGenerator<Entity[]> {
  let start = 0
  while (true) {
    const rows: Entity[] = await getRowsBlock<Entity>({
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
