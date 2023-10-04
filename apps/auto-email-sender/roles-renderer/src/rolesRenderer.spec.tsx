import { faker } from '@faker-js/faker'
import { SupabaseClient } from '@supabase/supabase-js'
import { MongoClient } from 'mongodb'
import * as sharedFile from 'shared'
import { Topics } from 'shared'
import { describe, expect, it, vi } from 'vitest'
import { RolesSkillsView, getRolesInBatches } from './getRoles'
import { htmlStartingDoctype, parseHTML } from './parseHTML'
import { rolesRenderer } from './rolesRenderer'

const getRolesSkillsMock = (
  topic: Topics = Topics.NATIONAL_VACANCIES
): RolesSkillsView =>
  ({
    id: faker.string.uuid(),
    companyName: faker.company.name(),
    country: faker.location.country(),
    createdAt: faker.date.past(),
    currency: 'USD',
    description: faker.string.sample(),
    language: '',
    ready: faker.datatype.boolean(),
    salary: '',
    skillNames: [],
    title: faker.person.jobTitle(),
    topicId: topic,
    url: '',
  } as unknown as RolesSkillsView)

const getRolesSkillsMocks = (count: number): RolesSkillsView[] =>
  new Array(count).fill(0).map(() => getRolesSkillsMock())

const mockRoles = getRolesSkillsMocks(20)
const mockSupabaseClient: SupabaseClient = {
  from: () => ({
    select: () => ({
      eq: () => ({
        range: (start: number, end: number) => ({
          order: () =>
            Promise.resolve({
              data: mockRoles.slice(start, end + 1),
              error: null,
            }),
        }),
      }),
    }),
  }),
} as unknown as SupabaseClient

describe('Roles Renderer', () => {
  it('get roles in batches', async ({ expect }) => {
    const roleBatches = getRolesInBatches(mockSupabaseClient, 10)
    const batchedRoles = []
    for await (const batch of roleBatches) {
      batchedRoles.push(batch)
    }
    const expectedResult = [mockRoles.slice(0, 10), mockRoles.slice(10, 20)]
    expect(batchedRoles).toEqual(expectedResult)
  })

  it('parses component and return html without the doctype', () => {
    const parsed = parseHTML(mockRoles[0])
    expect(parsed).not.toContain(htmlStartingDoctype)
  })

  it(`parses and stores html in mongoDb`, async () => {
    const mockMongoCollection = {
      insertOne: vi.fn(),
      updateOne: vi.fn(),
      deleteOne: vi.fn(),
      find: vi.fn(),
      findOne: vi.fn(),
    }
    const mockMongoConnection = {
      db: vi.fn().mockReturnValue({
        collection: vi.fn().mockReturnValue(mockMongoCollection),
      }),
      close: vi.fn(),
    }
    vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
      async () => mockMongoConnection as unknown as MongoClient
    )

    await rolesRenderer()

    expect(mockMongoConnection.db).toHaveBeenCalled()
  })
})
