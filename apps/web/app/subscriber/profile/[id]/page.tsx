import { EnglishLevel } from 'global/EnglishLevel'
import { notFound } from 'next/navigation'
import { PrismaClient } from 'prisma/client'
import { SubscriberForm } from '../components/SubscriberForm'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const prisma = new PrismaClient()
  const subscriber = await prisma.subscribers
    .findUniqueOrThrow({ where: { id: params.id } })
    .catch((e) => {
      console.log(e)
      notFound()
    })
  return (
    <SubscriberForm
      profileInfos={{
        englishLevel: subscriber.englishLevel as EnglishLevel,
        gitHub: subscriber.gitHub || '',
        linkedInUrl: subscriber.linkedInUrl || '',
        name: subscriber.name,
        skills: subscriber.skills as string[],
        startedWorkingAt: new Date(subscriber.startedWorkingAt),
      }}
    />
  )
}

export default ProfilePage
