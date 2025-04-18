import { getPostgresClient } from 'db'
import { Subscriber, SubscriberTopic, SubscriberRole } from 'db/src/types'

const db = getPostgresClient()

export const getSubscriberByEmail = async (
  email: string
): Promise<Subscriber | null> => {
  return db.getSubscriberByEmail(email)
}

export const getSubscriberById = async (
  id: string
): Promise<Subscriber | null> => {
  return db.getSubscriberById(id)
}

export const createSubscriber = async (email: string): Promise<Subscriber> => {
  return db.insertSubscriber(email)
}

export const updateSubscriber = async (
  id: string,
  data: Partial<Subscriber>
): Promise<Subscriber> => {
  return db.updateSubscriber(id, data)
}

export const getSubscriberTopics = async (
  subscriberId: string
): Promise<Array<SubscriberTopic>> => {
  return db.getSubscriberTopics(subscriberId)
}

export const updateSubscriberTopics = async (
  subscriberId: string,
  topicsIds: Array<number>
): Promise<void> => {
  return db.updateSubscriberTopics(subscriberId, topicsIds)
}

export const getSubscriberRoles = async (
  subscriberId: string
): Promise<Array<SubscriberRole>> => {
  return db.getSubscriberRoles(subscriberId)
}

export const updateSubscriberOptOut = async (email: string): Promise<void> => {
  return db.updateSubscriberOptOut(email)
}
