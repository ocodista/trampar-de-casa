import { getPostgresClient } from 'db'
import { EnglishLevel } from 'global/EnglishLevel'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { Entities } from 'shared'
import { ProfileSchema } from '../../subscribers/profile/profileSchema'

const pgClient = getPostgresClient()
const table = Entities.Subcribers // 'Subscribers'
export const PUBLIC_FIELDS_KEYS =
  'name, linkedInUrl, gitHub, startedWorkingAt, skillsId, englishLevel, sendBestOpenings'
const errorResponse = new NextResponse(null, {
  status: StatusCodes.INTERNAL_SERVER_ERROR,
})

const handleResponse = async (queryFn, field = 'rows') => {
  try {
    const response = await queryFn()
    return NextResponse.json(
      field === 'count' ? parseInt(response.rows[0].count) : response[field]
    )
  } catch (error) {
    console.error('Database error:', error)
    return errorResponse
  }
}

export const getCount = async () =>
  await handleResponse(
    async () => await pgClient.query(`SELECT COUNT(*) FROM "${table}"`),
    'count'
  )

export const getById = async (id: string) =>
  await handleResponse(async () => {
    const query = `
        SELECT ${PUBLIC_FIELDS_KEYS}
        FROM "${table}"
        WHERE id = $1
      `
    return await pgClient.query(query, [id])
  })

export async function insertSubscriber(email: string) {
  try {
    const query = `
      INSERT INTO "${Entities.Subcribers}" (email)
      VALUES ($1)
      RETURNING *
    `
    const result = await pgClient.query(query, [email])
    return { data: result.rows, error: null }
  } catch (error) {
    console.error('Insert subscriber error:', error)
    return { data: null, error }
  }
}

const updateSubscriberTopics = async (
  subscriberId: string,
  topicIds: string[]
) => {
  // Transaction to handle delete and multiple inserts
  const client = await pgClient.connect()
  try {
    await client.query('BEGIN')

    // Delete existing topics
    await client.query(
      `DELETE FROM "${Entities.SubscriberTopics}" WHERE "subscriberId" = $1`,
      [subscriberId]
    )

    // Insert new topics
    for (const topicId of topicIds) {
      await client.query(
        `INSERT INTO "${Entities.SubscriberTopics}" ("subscriberId", "topicId") VALUES ($1, $2)`,
        [subscriberId, Number(topicId)]
      )
    }

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Update subscriber topics error:', error)
    throw error
  } finally {
    client.release()
  }
}

interface Subscriber {
  startedWorkingAt: Date
}

export async function updateSubscriber(
  id: string,
  { receiveEmailConfig, ...body }: ProfileSchema
) {
  const sanitizeEnglishLevelInput = (englishLevel: EnglishLevel) => {
    return englishLevel === EnglishLevel.None ? null : englishLevel
  }

  try {
    const query = `
      UPDATE "${Entities.Subcribers}"
      SET
        name = $1,
        "linkedInUrl" = $2,
        "gitHub" = $3,
        "startedWorkingAt" = $4,
        "skillsId" = $5,
        "englishLevel" = $6
      WHERE id = $7
      RETURNING *
    `

    const values = [
      body.name,
      body.linkedInUrl,
      body.gitHub,
      body.startedWorkingAt,
      body.skillsId,
      sanitizeEnglishLevelInput(body.englishLevel),
      id,
    ]

    const result = await pgClient.query(query, values)
    await updateSubscriberTopics(id, receiveEmailConfig)

    return { data: result.rows, error: null }
  } catch (error) {
    console.error('Update subscriber error:', error)
    return { data: null, error }
  }
}

export async function getSubscriberByEmail(email: string) {
  try {
    const query = `
      SELECT *
      FROM "${Entities.Subcribers}"
      WHERE email = $1
    `
    const result = await pgClient.query(query, [email])
    return { data: result.rows, error: null }
  } catch (error) {
    console.error('Get subscriber by email error:', error)
    return { data: null, error }
  }
}
