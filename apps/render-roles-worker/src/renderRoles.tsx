import { render } from '@react-email/render'
import { Roles, SupabaseClient } from 'db'
import React from 'react'
import { Entities } from 'shared'
import { OpeningCard } from 'shared/src/email/openings-email/OpeningList'
import { getSupabaseClient } from './getSupabaseClient'
import { createClient as createRedisClient, RedisClient } from 'redis'

const getRoleBlock = async (
  supabase: SupabaseClient,
  start: number,
  end: number
): Promise<Roles[] | undefined> => {
  const { data, error } = await supabase
    .from(Entities.Roles)
    .select('*')
    .eq('ready', true)
    .range(start, end)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}

export async function* getRolesInBatches(
  supabase: SupabaseClient,
  batchSize: number
) {
  let start = 0
  while (true) {
    const roles = await getRoleBlock(supabase, start, start + batchSize - 1)
    if (roles?.length === 0) break
    yield roles
    start += batchSize
  }
}

const doctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`

const parseHTML = (role: Roles): string => {
  return render(
    <OpeningCard
      company={role.companyId}
      currency={role.currency || ''}
      language={role.language}
      location={role.country}
      skills={role.skills as string[]}
      title={role.title}
      url={role.url || ''}
    />
  ).replace(doctype, '')
}

const parseAndStoreRole = async (redisClient: RedisClient, role: Roles) => {
  const { id } = role
  const html = parseHTML(role)
  await redisClient.set(`role:${id}`, html)
}

async function main() {
  const supabaseClient = getSupabaseClient()
  const redisClient = createRedisClient()
  await redisClient.connect()

  const batchSize = 100
  const roleBatches = getRolesInBatches(supabaseClient, batchSize)
  for await (const roles of roleBatches) {
    if (!roles?.length) continue
    await Promise.all(roles.map((role) => parseAndStoreRole(redisClient, role)))
  }
  await redisClient.disconnect()
}
main()
