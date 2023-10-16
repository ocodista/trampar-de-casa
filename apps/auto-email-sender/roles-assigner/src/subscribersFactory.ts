import { getSubscriberMock } from './tests/factories/subscriberFactory'
export const subscribersFactory = (length = 1) =>
  Array.from({ length }, () => getSubscriberMock())
