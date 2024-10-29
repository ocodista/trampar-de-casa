import { notFound } from 'next/navigation'
import JobApplicationPage from './JobApplicationPage'
import { getUserAndRoleData } from './action'
import { getDecryptedId } from 'app/api/getDecryptedId'
import { ApplicationFormData } from './applicationFormSchema'

interface ApplicationPageProps {
  searchParams: {
    roleId?: string
    subscriberId?: string
  }
}

export default async function ApplicationPage({
  searchParams,
}: ApplicationPageProps) {
  const subscriberId = getDecryptedId(searchParams.subscriberId)
  const { roleId } = searchParams

  if (!roleId || !subscriberId) {
    notFound()
  }

  const data = await getUserAndRoleData(roleId, subscriberId)

  const applicationData: Partial<ApplicationFormData> = {
    fullName: data.subscriber.name || '',
    email: data.subscriber.email || '',
    location: '',
    startedWorkingAt: data.subscriber.startedWorkingAt
      ? new Date(data.subscriber.startedWorkingAt)
      : new Date(),
    englishLevel: data.subscriber.englishLevel || 'Beginner',
    linkedInUrl: data.subscriber.linkedInUrl || 'https://linkedin.com/in/',
    workModel: 'remote',
    contractType: 'clt',
    salaryExpectation: '',
    availability: '',

    githubUrl: data.subscriber.gitHub || '',
    coverLetter: '',
  }

  return (
    <JobApplicationPage
      applicationData={applicationData}
      roleData={data.role}
      roleId={roleId}
      subscriberId={subscriberId}
    />
  )
}
