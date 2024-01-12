import { faker } from '@faker-js/faker'
import * as sharedFile from 'shared'
import * as createProfileFormLinkFile from 'shared/src/services/createProfileFormLink'
import { HEADER_TITLE_SUFFIX, HeaderHtmlKeys } from 'shared/ui/email/Header'
import { vi } from 'vitest'
import { mountHeader } from '../renderHeader'

describe('Render header', () => {
  beforeAll(() => {
    vi.spyOn(
      createProfileFormLinkFile,
      'createProfileFormLink'
    ).mockImplementation(vi.fn().mockReturnValue(faker.internet.url()))
  })
  it('Calculate the total roles count', () => {
    vi.spyOn(sharedFile, 'encrypt').mockImplementation(() =>
      faker.string.sample()
    )
    const rolesIds = Array.from({ length: 100 }, () => faker.string.uuid())
    const subscriberId = faker.string.uuid()
    const urlPrefix = faker.internet.url()
    const html = mountHeader(
      subscriberId,
      urlPrefix,
      rolesIds,
      `${faker.string.uuid()} ${
        HeaderHtmlKeys.rolesCount
      } ${HEADER_TITLE_SUFFIX}`
    )
    expect(html).toContain(`${rolesIds.length} ${HEADER_TITLE_SUFFIX}`)
  })
})
