import { PostgresClient } from '../../../postgres/client'
import { getConfirmedSubscribersRowsBlock } from './getConfirmedSubscribersRowsBlock'

interface GetAllPaginated {
  postgres: PostgresClient
  batchSize: number
  selectQuery?: string
}

export async function* getAllConfirmedSubscribersPaginated({
  postgres,
  batchSize,
  selectQuery
}: GetAllPaginated): AsyncGenerator<any[]> {
  let start = 0
  while (true) {
    const rows = await getConfirmedSubscribersRowsBlock({
      postgres,
      start,
      end: start + batchSize - 1,
      selectQuery
    })
    if (!rows?.length) return
    yield rows
    start += batchSize
  }
}
