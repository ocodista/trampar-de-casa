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
    .select('*', { count: 'exact' })

  if (error) {
    console.error(error)
    return null
  }
  return count
}

export default async function SubscribersCount() {
  const count = await getSubscriberCount()
  if (!count) return <div className="h-[32px] mb-6"></div>

  return (
    <div className="inline-block mb-6 px-2 py-1 font-semibold bg-green-100 rounded-md roll-animation">
      <div className="flex flex-wrap items-center -m-1">
        <div className="w-auto py-1 px-2">
          <span className="text-sm">
            👋 Junte-se a {count.toLocaleString()} inscritos!
          </span>
        </div>
      </div>
    </div>
  )
}
