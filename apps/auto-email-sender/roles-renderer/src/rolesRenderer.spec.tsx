import { faker } from '@faker-js/faker'
import { SupabaseClient } from '@supabase/supabase-js'
import { rolesSkillsView } from 'db'
import { RedisClientType } from 'redis'
import { describe, expect, it, vi } from 'vitest'
import { getRolesInBatches } from './getRoles'
import { parseAndStoreRole } from './parseAndStoreRole'
import { htmlStartingDoctype, parseHTML } from './parseHTML'

const getRolesSkillsMock = (): rolesSkillsView =>
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
    url: '',
  } as unknown as rolesSkillsView)

const getRolesSkillsMocks = (count: number): rolesSkillsView[] =>
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

const mockRedisClient: RedisClientType = {
  set: (key: string, value: string, callback: (_a: any, _b: any) => void) => {
    callback && callback(null, 'OK')
    return true
  },
} as unknown as RedisClientType

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

  it('parses and stores html in roles:{id} key at Redis', async () => {
    const setSpy = vi.spyOn(mockRedisClient, 'set')
    await parseAndStoreRole(mockRedisClient, mockRoles[0])
    expect(setSpy).toHaveBeenCalledWith(
      `role:${mockRoles[0].id}`,
      parseHTML(mockRoles[0])
    )
    setSpy.mockRestore()
  })
})
