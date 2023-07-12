import { getAbsoluteUrl } from 'app/utils/vercel'
import { EnglishLevel } from 'global/EnglishLevel'
import { notFound } from 'next/navigation'
import { SubscriberForm } from '../components/SubscriberForm'
import { getSubscriber } from '../getSubscriber'
import { getSubscriberTopics } from '../getSubscriberTopics'
import { getTopics } from '../getTopics'

export const revalidate = 0
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const decryptedIdResponse = await fetch(
    `${getAbsoluteUrl()}/api/decrypt/${params.id}`
  )
  if (!decryptedIdResponse.ok) notFound()
  const decryptedId = (await decryptedIdResponse.json()) as { id: string }
  const subscriberId = decryptedId.id

  const subscriber = await getSubscriber(subscriberId)
  const subscriberTopics = await getSubscriberTopics(subscriberId)
  const topics = await getTopics().catch(() => notFound())

  return (
    <SubscriberForm
      descriptionTopics={topics}
      profileInfos={{
        receiveEmailConfig: subscriberTopics.map(({ topicId }) =>
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
