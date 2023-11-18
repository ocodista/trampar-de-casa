import { faker } from '@faker-js/faker'
import { SupabaseTable } from 'db/src/supabase/utilityTypes'

type Subscriber = Pick<
  SupabaseTable<'Subscribers'>,
  'id' | 'email' | 'skillsId' | 'startedWorkingAt' | 'isConfirmed'
>

export const subscribersMock = (length: number) =>
  Array.from({ length }).map(
    () =>
      ({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        skillsId: null,
        startedWorkingAt: faker.date.past().toUTCString(),
        isConfirmed: true,
      } as Subscriber)
  )
