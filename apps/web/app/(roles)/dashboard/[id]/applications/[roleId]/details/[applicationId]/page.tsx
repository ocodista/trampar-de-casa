'use server'

import { getSupabaseClient } from 'db'
import { notFound } from 'next/navigation'
import ApplicationDetails from './ApplicationDetails'

interface PageProps {
  params: {
    id: string
    roleId: string
    applicationId: string
  }
}

async function getApplication(applicationId: string) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('RoleApplications')
    .select(
      `
      *,
      role:Roles (
        title,
        company
      ),
      subscriber:Subscribers (
        name,
        email,
        englishLevel,
        gitHub,
        linkedInUrl
      )
    `
    )
    .eq('id', applicationId)
    .single()

  if (error || !data) {
    console.error('Error fetching application:', error)
    return null
  }

  const parsedDetails =
    typeof data.details === 'string' ? JSON.parse(data.details) : data.details

  return {
    id: data.id,
    details: {
      fullName: parsedDetails.fullName,
      email: data.subscriber.email,
      location: parsedDetails.location,
      englishLevel: data.subscriber.englishLevel,
      linkedInUrl: data.subscriber.linkedInUrl,
      githubUrl: data.subscriber.gitHub,
      coverLetter: parsedDetails.coverLetter || '',
      resumeUrl: parsedDetails.resumeUrl,
      portfolioUrl: parsedDetails.portfolioUrl,
      startedWorkingAt:
        parsedDetails.startedWorkingAt || new Date().toISOString(),
    },
    status: data.status,
    createdAt: data.createdAt,
    meetsRequirements: data.meetsRequirements,
    role: {
      title: data.role.title,
      company: data.role.company,
    },
  }
}

async function verifyAccess(roleId: string, userId: string) {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('RoleOwner')
    .select('*')
    .eq('roleID', roleId)
    .eq('subscriberID', userId)
    .single()

  if (error || !data) {
    return false
  }

  return true
}

export default async function ApplicationDetailsPage({ params }: PageProps) {
  const { id: userId, roleId, applicationId } = params

  const hasAccess = await verifyAccess(roleId, userId)
  if (!hasAccess) {
    notFound()
  }

  const application = await getApplication(applicationId)
  if (!application) {
    notFound()
  }

  return <ApplicationDetails application={application} />
}
