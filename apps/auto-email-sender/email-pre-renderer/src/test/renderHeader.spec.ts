import { faker } from '@faker-js/faker'
import * as createProfileFormLinkFile from 'shared/src/services/createProfileFormLink'
import { HEADER_TITLE_SUFFIX } from 'src/Header'
import { renderHeader } from 'src/renderHeader'
import { vi } from 'vitest'

describe('Render header', () => {
  beforeAll(() => {
    vi.spyOn(
      createProfileFormLinkFile,
      'createProfileFormLink'
    ).mockImplementation(vi.fn().mockReturnValue(faker.internet.url()))
  })
  it('Calculate the total roles count', () => {
    const rolesIds = Array.from({ length: 100 }, () => faker.string.uuid())
    const html = renderHeader(rolesIds, faker.string.uuid())
    expect(html).toContain(`${rolesIds.length} ${HEADER_TITLE_SUFFIX}`)
  })
})
