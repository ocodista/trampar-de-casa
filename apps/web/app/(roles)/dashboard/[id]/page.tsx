'use server'

import getRedisClient from 'app/utils/getRedisClient'
import { Database } from 'db'
import { getSupabaseClient } from 'db'
import { DashboardPage } from './DashboardPage'

type Skill = Database['public']['Views']['vw_skills_in_roles']['Row']
type Job = Database['public']['Tables']['Roles']['Row']

const ONE_DAY_IN_MINUTES = 86_400

async function getSkills(): Promise<Skill[]> {
  try {
    const client = await getRedisClient()
    const skillsFromCache = await client.get('Skills')
    if (skillsFromCache) {
      await client.quit()
      return JSON.parse(skillsFromCache) as Skill[]
    }

    const supabase = getSupabaseClient()
    const { data: skills } = await supabase
      .from('vw_skills_in_roles')
      .select('*')
      .order('name')

    await client.set('getSkills', JSON.stringify(skills), {
      EX: ONE_DAY_IN_MINUTES,
    })
    await client.quit()
    return skills as Skill[]
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return []
  }
}

async function getJobs(userId: string): Promise<Job[]> {
  try {
    const supabase = getSupabaseClient()
    const { data: jobs, error } = await supabase
      .from('RoleOwner')
      .select(
        `
        roleID,
        Roles:Roles (
          *,
          views:Views (count)
        )
      `
      )
      .eq('subscriberID', userId)
      .order('createdAt', { ascending: false })

    if (error) {
      throw error
    }

    const formattedJobs = jobs.map((job) => ({
      ...job.Roles,
      views: job.Roles.views[0]?.count || 0,
    }))

    return formattedJobs as Job[]
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return []
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const userId = params.id as string

  if (!userId) {
    return <div>Error: User ID not provided</div>
  }

  const skills = await getSkills()
  const jobs = await getJobs(userId)

  return <DashboardPage jobsFromServer={jobs} skillsFromServer={skills} />
}
