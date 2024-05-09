import { RolesPage } from './RolesPage'
import { createClient } from '@supabase/supabase-js'
import { createClient as createClientRedis } from 'redis'

export const revalidate = 0

const client = createClientRedis({
  socket: {
    host: 'localhost',
    port: 6379,
  },
})

client.connect()

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

async function getJobs() {
  const { data: jobs } = await supabase
    .from('Roles')
    .select('*', { count: 'exact' })
    .limit(21)
    .order('createdAt', { ascending: true })

  return jobs
}

async function getSkills() {
  const skillsFromCache = await client.get('getSkills')
  if (skillsFromCache) {
    return JSON.parse(skillsFromCache)
  }

  const { data: skills } = await supabase
    .from('vw_skills_in_roles')
    .select('*')
    .order('name')

  await client.set('getSkills', JSON.stringify(skills), { EX: 86400 })
  return skills
}

export default async function Page() {
  const skills = await getSkills()
  const jobs = await getJobs()
  return <RolesPage jobsFromProps={jobs} skillsFromServer={skills} />
}
