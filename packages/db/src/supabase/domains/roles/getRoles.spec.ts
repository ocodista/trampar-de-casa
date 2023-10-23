import * as getSupabaseClientFile from 'db'
import { getSupabaseClientStub } from 'shared/src/test/helpers/stubs'
import { vi } from 'vitest'
import { getRoles } from './getRoles'

vi.spyOn(getSupabaseClientFile, 'getSupabaseClient').mockImplementation(
  getSupabaseClientStub
)

describe('get roles', () => {
  it('stablish connection with supabase', async () => {
    await getRoles()

    expect(getSupabaseClientStub).toBeCalled()
  })
})
