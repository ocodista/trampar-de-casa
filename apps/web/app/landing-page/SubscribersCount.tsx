'use server'

import { getPostgresClient } from 'db'
import { Entities } from 'shared'

const getSubscriberCount = async (): Promise<number | null> => {
  const pool = getPostgresClient()

  try {
    const result = await pool.query(`
      SELECT COUNT(id) 
      FROM ${Entities.Subcribers}
    `)

    return parseInt(result.rows[0].count)
  } catch (error) {
    console.error('Error fetching subscriber count.', error)
    return null
  }
}

export default async function SubscribersCount() {
  const count = await getSubscriberCount()
  if (!count) return <div className="mb-6 h-[32px]"></div>

  return (
    <div className="roll-animation mb-6 inline-block rounded-md bg-green-100 px-2 py-1 font-semibold">
      <div className="-m-1 flex flex-wrap items-center">
        <div className="w-auto px-2 py-1">
          <span className="text-sm">
            👋 Junte-se a {count.toLocaleString()} inscritos!
          </span>
        </div>
      </div>
    </div>
  )
}
