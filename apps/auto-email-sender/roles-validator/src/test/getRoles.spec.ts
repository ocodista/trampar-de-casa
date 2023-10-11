import * as getSupabaseClientFile from 'db'
import { getSupabaseClientStub } from 'shared/src/test/helpers/stubs'
import { getRoles } from 'src/getRoles'
import { vi } from 'vitest'

vi.spyOn(getSupabaseClientFile, 'getSupabaseClient').mockImplementation(
  getSupabaseClientStub
)

describe('get roles', () => {
  it('stablish connection with supabase', async () => {
    await getRoles()

    expect(getSupabaseClientStub).toBeCalled()
  })
})
