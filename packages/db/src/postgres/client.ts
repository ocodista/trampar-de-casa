import { Pool, QueryResult, QueryResultRow } from 'pg'
import {
  Subscriber,
  SubscriberTopic,
  Topic,
  Role,
  Skill,
  SubscriberRole,
  RoleRecommendation,
  SkillInRole,
} from '../types'
import { Entities } from '../../../shared/src/enums/entities'

export class PostgresClient {
  private pool: Pool | null

  constructor(pool: Pool | null) {
    this.pool = pool
  }

  async query<T extends QueryResultRow>(
    text: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    if (!this.pool) {
      return { rows: [], rowCount: 0, command: '', fields: [], oid: 0 }
    }
    return this.pool.query<T>(text, params)
  }

  async getSubscriberById(id: string): Promise<Subscriber | null> {
    const result = await this.query<Subscriber>(
      `SELECT * FROM ${Entities.Subcribers} WHERE id = $1`,
      [id]
    )
    return result.rows[0] || null
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | null> {
    const result = await this.query<Subscriber>(
      `SELECT * FROM ${Entities.Subcribers} WHERE email = $1`,
      [email]
    )
    return result.rows[0] || null
  }

  async insertSubscriber(email: string): Promise<Subscriber> {
    if (!this.pool) {
      throw new Error('Database connection not available')
    }
    const result = await this.query<Subscriber>(
      `INSERT INTO ${Entities.Subcribers} (email) VALUES ($1) RETURNING *`,
      [email]
    )
    return result.rows[0]
  }

  async updateSubscriber(
    id: string,
    data: Partial<Subscriber>
  ): Promise<Subscriber> {
    if (!this.pool) {
      throw new Error('Database connection not available')
    }
    const setClause = Object.entries(data)
      .map(([key, _], index) => `"${key}" = $${index + 1}`)
      .join(', ')
    const values = Object.values(data)

    const result = await this.query<Subscriber>(
      `UPDATE ${Entities.Subcribers} SET ${setClause} WHERE id = $${
        values.length + 1
      } RETURNING *`,
      [...values, id]
    )
    return result.rows[0]
  }

  async getSubscriberTopics(subscriberId: string): Promise<SubscriberTopic[]> {
    const result = await this.query<SubscriberTopic>(
      `SELECT * FROM ${Entities.SubscriberTopics} WHERE "subscriberId" = $1`,
      [subscriberId]
    )
    return result.rows
  }

  async updateSubscriberTopics(
    subscriberId: string,
    topicIds: number[]
  ): Promise<void> {
    if (!this.pool) {
      throw new Error('Database connection not available')
    }
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')

      await client.query(
        `DELETE FROM ${Entities.SubscriberTopics} WHERE "subscriberId" = $1`,
        [subscriberId]
      )

      for (const topicId of topicIds) {
        await client.query(
          `INSERT INTO ${Entities.SubscriberTopics} ("subscriberId", "topicId") VALUES ($1, $2)`,
          [subscriberId, topicId]
        )
      }

      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  }

  async getTopics(): Promise<Topic[]> {
    const result = await this.query<Topic>(`SELECT * FROM ${Entities.Topics}`)
    return result.rows
  }

  async getRoles(): Promise<Role[]> {
    const result = await this.query<Role>(`SELECT * FROM ${Entities.Roles}`)
    return result.rows
  }

  async getSkills(): Promise<Skill[]> {
    const result = await this.query<Skill>(`SELECT * FROM ${Entities.Skills}`)
    return result.rows
  }

  async getSubscriberRoles(subscriberId: string): Promise<SubscriberRole[]> {
    const result = await this.query<SubscriberRole>(
      `SELECT * FROM ${Entities.SubscriberRoles} WHERE "subscriberId" = $1`,
      [subscriberId]
    )
    return result.rows
  }

  async getRolesRecommendationCount(): Promise<number> {
    const result = await this.query<{ count: string }>(
      `SELECT COUNT(*) FROM ${Entities.RoleRecommendations}`
    )
    return parseInt(result.rows[0]?.count || '0')
  }

  async getRolesRecommendationByTitleAndCompany(
    title: string,
    company: string
  ): Promise<RoleRecommendation[]> {
    const result = await this.query<RoleRecommendation>(
      `SELECT * FROM ${Entities.RoleRecommendations} WHERE title = $1 AND company = $2`,
      [title, company]
    )
    return result.rows
  }

  async insertRoleRecommendation(
    data: Omit<RoleRecommendation, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<RoleRecommendation> {
    if (!this.pool) {
      throw new Error('Database connection not available')
    }
    const result = await this.query<RoleRecommendation>(
      `INSERT INTO ${Entities.RoleRecommendations} (
        title, company, description, salary, currency, country, language, "minimumYears", "topicId", url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        data.title,
        data.company,
        data.description,
        data.salary,
        data.currency,
        data.country,
        data.language,
        data.minimumYears,
        data.topicId,
        data.url,
      ]
    )
    return result.rows[0]
  }

  async getRolesWithFilters(filters?: {
    country?: string[]
    skillsId?: number[]
    description?: string[]
    order?: { field: string; ascending: boolean }
  }): Promise<{ data: Role[]; count: number }> {
    let query = `SELECT * FROM ${Entities.Roles} WHERE ready = true`
    const params: any[] = []
    let paramCount = 1

    if (filters?.country?.length) {
      query += ` AND country = ANY($${paramCount})`
      params.push(filters.country)
      paramCount++
    }

    if (filters?.skillsId?.length) {
      const placeholders = filters.skillsId
        .map((_, idx) => `$${paramCount + idx}`)
        .join(',')
      query += ` AND "skillsId" && ARRAY[${placeholders}]::text[]`
      params.push(...filters.skillsId.map((id) => id.toString()))
      paramCount += filters.skillsId.length
    }

    if (filters?.description?.length) {
      query += ` AND description = ANY($${paramCount})`
      params.push(filters.description)
      paramCount++
    }

    if (filters?.order) {
      query += ` ORDER BY "${filters.order.field}" ${
        filters.order.ascending ? 'ASC' : 'DESC'
      }`
    } else {
      query += ` ORDER BY salary DESC NULLS LAST`
    }

    const result = await this.query<Role>(query, params)
    return { data: result.rows, count: result.rowCount || 0 }
  }

  async getSkillsInRoles(): Promise<SkillInRole[]> {
    const result = await this.query<SkillInRole>(
      `SELECT * from vw_skills_in_roles
      ORDER BY name`
    )
    return result.rows
  }

  async getCountriesInRoles(): Promise<{ country: string }[]> {
    const result = await this.query<{ country: string }>(
      `SELECT * FROM "vw_countries_in_roles"
      ORDER BY country`
    )
    return result.rows
  }

  async getSubscriberSkillsId(email: string): Promise<string[]> {
    const result = await this.query<{ skillsId: string[] }>(
      `SELECT "skillsId" FROM ${Entities.Subcribers} WHERE email = $1`,
      [email]
    )
    return result.rows[0]?.skillsId || []
  }

  async updateSubscriberOptOut(email: string): Promise<void> {
    if (!this.pool) {
      throw new Error('Database connection not available')
    }
    await this.query(
      `UPDATE ${Entities.Subcribers} SET "sendBestOpenings" = false WHERE email = $1`,
      [email]
    )
  }

  async getRolesForSubscriber(
    skillsId: string[] | null,
    yearsOfExperience: number | null,
    limit = 40
  ): Promise<Role[]> {
    let query = `SELECT * FROM ${Entities.Roles} WHERE ready = true`
    const params: any[] = []
    let paramCount = 1

    if (skillsId?.length) {
      query += ` AND "skillsId" && $${paramCount}::text[]`
      params.push(skillsId)
      paramCount++
    }

    if (yearsOfExperience !== null) {
      query += ` AND "minimumYears" <= $${paramCount}`
      params.push(yearsOfExperience)
      paramCount++
    }

    query += ` ORDER BY "createdAt" DESC LIMIT $${paramCount}`
    params.push(limit)

    const result = await this.query<Role>(query, params)
    return result.rows
  }
}
