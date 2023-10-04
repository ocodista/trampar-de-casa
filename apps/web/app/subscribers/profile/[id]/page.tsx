import { getDecryptedId } from 'app/api/getDecryptedId'
import { EnglishLevel } from 'global/EnglishLevel'
import { SubscriberForm } from '../components/SubscriberForm'
import { getSubscriber } from '../getSubscriber'
import { getSubscriberTopics } from '../getSubscriberTopics'
import { getTopics } from '../getTopics'

export const revalidate = 0
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const subscriberId = getDecryptedId(params.id)
  const [subscriber, subscriberTopics, topics] = await Promise.all([
    getSubscriber(subscriberId),
    getSubscriberTopics(subscriberId),
    getTopics(),
  ])

  return (
    <SubscriberForm
      descriptionTopics={topics}
      profileInfos={{
        receiveEmailConfig: subscriberTopics.map(({ topicId }) =>
          String(topicId)
        ),
        gitHub: subscriber.gitHub || '',
        linkedInUrl: subscriber.linkedInUrl || '',
        name: subscriber.name,
        skillsId: subscriber.skillsId as string[],
        ...subscriber,
        startedWorkingAt: subscriber.startedWorkingAt
          ? new Date(subscriber.startedWorkingAt)
          : null,
        englishLevel: subscriber.englishLevel as EnglishLevel,
      }}
    />
  )
}

export default ProfilePage
