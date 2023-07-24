import { Subscribers, SupabaseClient, Roles } from 'db'
import { Entities } from 'shared/src/enums/entities'

export const getSubscriberRoles = async (
  subscriber: Subscribers,
  supabase: SupabaseClient
) => {
  const result = await supabase
    .from(Entities.Roles)
    .select()
    .eq('ready', true)
    // TODO: Add proper type to Skill
    .in(
      'skills',
      (subscriber.skills as { value: string }[]).map((skill) => skill.value)
    )
  // TODO: Add english language filter
  // TODO: Add minimum years filter

  return result.data as Roles[]
}
