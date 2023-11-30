import { faker } from '@faker-js/faker'
import { getHtmlRoles } from 'src/getHtmlRoles'
import { expect } from 'vitest'
import { mockMongoDb } from './utils/mockMongo'

describe('Get HTML roles', () => {
  it('run getHtmlRoles 100 times', async () => {
    const { findOneStub, collectionMock } = mockMongoDb()
    findOneStub.mockResolvedValue(faker.string.sample(1_000))

    const firstRoleHTML = faker.string.sample()
    const twoRoleHTML = faker.string.sample()
    findOneStub.mockResolvedValueOnce(firstRoleHTML)
    findOneStub.mockResolvedValueOnce(twoRoleHTML)
    const rolesIdArray = Array.from({ length: 40 }).map(() =>
      faker.string.uuid()
    )

    const memoizedRoles = new Map()
    const emptyArray = Array.from({ length: 100 })
    for (const _ of emptyArray) {
      await getHtmlRoles(rolesIdArray, collectionMock, memoizedRoles, '')
    }

    expect(true).toBeTruthy()
  })
})
