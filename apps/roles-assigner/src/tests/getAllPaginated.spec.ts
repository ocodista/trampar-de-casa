import { Roles } from 'db'
import { Entities } from 'shared'
import { getAllPaginated } from 'src/getAllPaginated'
import { getRoleMock } from './mocks/factories/roleFactory'
import { getRowsBlockStub, supabaseClientMock } from './mocks/mockHelper'

let entity: Entities
let batchSize: number

it('should yield all the data correctly', async () => {
  entity = Entities.Subcribers // Or whatever entity you are testing
  batchSize = 1
  const rolesMock = [getRoleMock(), getRoleMock()]
  const getRowsBlockSpy = getRowsBlockStub(rolesMock)

  const rolesReturned: Roles[] = []
  for await (const roles of getAllPaginated({
    supabase: supabaseClientMock,
    entity,
    batchSize,
  })) {
    rolesReturned.push(...roles)
  }

  expect(rolesReturned.length).toBe(rolesMock.length)
  expect(getRowsBlockSpy).toBeCalledTimes(rolesMock.length)
  expect(rolesReturned).toEqual(rolesMock)
})
