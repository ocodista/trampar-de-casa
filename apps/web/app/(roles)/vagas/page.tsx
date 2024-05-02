import { RolesPage } from './RolesPage'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL'] as string,
  process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] as string
)

async function getJobs() {
  const { data: posts } = await supabase
    .from('Roles')
    .select('*', { count: 'exact' })
    .limit(21)
    .order('createdAt', { ascending: true })

  return posts
}

async function getSkills() {
  const { data: skills } = await supabase
    .from('Skills')
    .select('id, name, normalized, emoji')
    .limit(500)
  return skills
}

export default async function Page() {
  const jobs = await getJobs()
  const skills = await getSkills()
  return <RolesPage jobsFromProps={jobs} skillsFromProps={skills} />
}
