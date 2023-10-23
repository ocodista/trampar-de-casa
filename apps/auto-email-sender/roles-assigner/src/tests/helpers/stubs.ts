import { supabaseClientMock } from 'shared/src/test/helpers/mocks'
import { vi } from 'vitest'

export const getSupabaseClientStub = vi.fn().mockReturnValue(supabaseClientMock)
