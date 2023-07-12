import { getDecryptedId } from 'app/api/getDecryptedId'
import { EnglishLevel } from 'global/EnglishLevel'
import { SubscriberForm } from '../components/SubscriberForm'
import { getSubscriber } from '../getSubscriber'
import { getSubscriberTopics } from '../getSubscriberTopics'
import { getTopics } from '../getTopics'

export const revalidate = 0
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const subscriberId = getDecryptedId(params.id)
  const subscriber = await getSubscriber(subscriberId)
  const subscriberTopics = await getSubscriberTopics(subscriberId)
  const topics = await getTopics()

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
        startedWorkingAt: subscriber.startedWorkingAt
          ? new Date(subscriber.startedWorkingAt)
          : null,
      }}
    />
  )
}

export default ProfilePage
