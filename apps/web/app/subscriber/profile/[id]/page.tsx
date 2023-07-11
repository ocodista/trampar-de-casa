import { getDecryptedId } from 'app/api/getDecryptedId'
import { EnglishLevel } from 'global/EnglishLevel'
import { notFound } from 'next/navigation'
import { PrismaClient } from 'prisma/client'
import { SubscriberForm } from '../components/SubscriberForm'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const prisma = new PrismaClient()
  const decryptedId = getDecryptedId(params.id)
  const subscriber = await prisma.subscribers
    .findUniqueOrThrow({
      where: { id: decryptedId },
      include: { subscriberTopics: true },
    })
    .catch((e) => {
      console.error(e)
      notFound()
    })
  const topics = await prisma.topics.findMany()
  return (
    <SubscriberForm
      descriptionTopics={topics}
      profileInfos={{
        receiveEmailConfig: subscriber.subscriberTopics.map(({ topicId }) =>
          String(topicId)
        ),
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
