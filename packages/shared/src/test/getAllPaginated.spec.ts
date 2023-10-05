import { Roles } from 'db'
import { Entities } from 'shared'
import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { getAllPaginated } from '../services/getAllPaginated'
import { getRoleMock } from './factories/roleFactory'
import { getRowsBlockStub } from './helpers/stubs'

let entity: Entities
let batchSize: number

it('should yield all the data correctly', async () => {
  entity = Entities.Subcribers // Or whatever entity you are testing
  batchSize = 1
  const rolesMock = [getRoleMock(), getRoleMock()]
  const getRowsBlockSpy = getRowsBlockStub(rolesMock)

  const rolesReturned: Roles[] = []
  for await (const roles of getAllPaginated<Roles>({
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
