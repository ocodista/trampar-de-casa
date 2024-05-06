import { RolesPage } from './RolesPage'
import { createClient } from '@supabase/supabase-js'

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
  // const { data: skills } = await supabase.rpc('get_distinct_skills')
  const { data: skills } = await supabase
    .from('Skills')
    .select('*')
    .order('name')

  console.log('Chamou getSkills')
  console.log(skills[0])
  return skills
}

export default async function Page() {
  const skills = await getSkills()
  const jobs = await getJobs()
  return <RolesPage jobsFromProps={jobs} skillsFromServer={skills} />
}
