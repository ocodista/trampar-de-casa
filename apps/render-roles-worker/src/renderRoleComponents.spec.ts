import { faker } from '@faker-js/faker'
import { Prisma, Roles } from 'db'
import { describe, expect, it } from 'vitest'
import { renderRoleComponents } from './renderRoleComponents'

// MockFactory { constructor (classGenerator) }

// const rolesFactory = new MockFactory((): Roles => {
//  companyId: faker.location.country()
//})

// getMock: () => { return this._classGenerator() }
// getMocks: (length: number) => { new Array({ length }).map(this._classGenerator) }

// TODO: mockFactory<Roles>.getMock()
export const roleMocks = (length: number) =>
  new Array({ length }).map(
    () =>
      ({
        companyId: faker.string.uuid(),
        country: faker.location.country(),
        createdAt: faker.date.anytime(),
        currency: faker.finance.currency(),
        description: faker.hacker.phrase(),
        id: faker.string.uuid(),
        language: faker.location.country(),
        ready: true,
        salary: 'R$ SAASD',
        sentRolesId: '',
        skills: ['1', '2', '3'] as Prisma.JsonValue,
        title: faker.company.name(),
        updatedAt: faker.date.anytime(),
        url: '',
      } as unknown as Roles)
  )

describe('renderRoleComponents', () => {
  it('Return rendered string without DOCTYPE elemeent', () => {
    for (const renderedRoles of renderRoleComponents(roles)) {
      expect(renderedRoles.renderedString.match('!DOCTYPE')).toBeFalsy()
    }
  })
})

describe('sendRenderedRolesTo', () => {
  it.todo('Should be settled with "ROLE_TEMPLATE" prefix and id')
})
