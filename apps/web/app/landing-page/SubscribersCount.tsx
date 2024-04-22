'use server'
import { createClient } from '@supabase/supabase-js'
import { Entities } from 'shared'

const getSubscriberCount = async (): Promise<number | null> => {
  const supabase = createClient(
    process.env['SUPABASE_URL'],
    process.env['SUPABASE_SERVICE_ROLE']
  )
  const { count, error } = await supabase
    .from(Entities.Subcribers)
    .select('id', { count: 'exact', head: true })

  if (error) {
    console.error(error)
    return null
  }
  return count
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
