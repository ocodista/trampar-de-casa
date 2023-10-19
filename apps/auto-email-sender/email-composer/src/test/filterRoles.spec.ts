import { faker } from '@faker-js/faker'
import { MongoClient } from 'mongodb'
import * as sharedFile from 'shared'
import { getHtmlRoles } from 'src/getHtmlRoles'
import {
  RenderRolesSection,
  RenderRolesSectionProps,
} from 'src/renderRolesSection'
import { expect, vi } from 'vitest'

const mockMongoDb = () => {
  const collectionStub = vi.fn()
  const findOneStub = vi.fn()
  collectionStub.mockReturnValue({
    findOne: findOneStub,
  })
  vi.spyOn(sharedFile, 'getMongoConnection').mockImplementation(
    async () =>
      ({
        db: () => ({
          collection: collectionStub,
        }),
      } as unknown as MongoClient)
  )

  return { collectionStub, findOneStub }
}

describe('Get HTML roles', () => {
  it('establish connection with redis', async () => {
    const { collectionStub } = mockMongoDb()
    await getHtmlRoles([faker.string.sample()])

    expect(collectionStub).toBeCalled()
  })
  it.only('concatenate roles taken on redis', async () => {
    const { findOneStub } = mockMongoDb()
    const rolesIdArray = [faker.string.uuid(), faker.string.uuid()]
    const firstRoleHTML = faker.string.sample()
    const twoRoleHTML = faker.string.sample()
    findOneStub.mockResolvedValueOnce(firstRoleHTML)
    findOneStub.mockResolvedValueOnce(twoRoleHTML)

    const concatenatedRoles = await getHtmlRoles(rolesIdArray)

    expect(concatenatedRoles).toStrictEqual(
      RenderRolesSection({
        roles: [firstRoleHTML, twoRoleHTML],
      } as unknown as RenderRolesSectionProps)
    )
  })
})
