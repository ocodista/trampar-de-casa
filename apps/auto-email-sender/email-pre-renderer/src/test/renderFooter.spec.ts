import { faker } from '@faker-js/faker'
import * as encryptFile from 'shared'
import { HtmlFooterKeys } from 'shared/ui/email/Footer'
import { vi } from 'vitest'
import * as getUnsubscribeFile from '../getUnsubscribeLink'
import { mountFooter } from '../renderFooter'
import { getSubscriberMock } from './factories/subscriberFactory'

const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })
vi.spyOn(encryptFile, 'encrypt').mockImplementation(() => ENCRYPTED_VALUE_MOCK)
describe('Render footer', () => {
  const getUnsubscribeLinkMock = vi.fn()
  beforeEach(() => {
    vi.spyOn(getUnsubscribeFile, 'getUnsubscribeLink').mockImplementation(
      getUnsubscribeLinkMock
    )
  })
  afterAll(() => {
    vi.clearAllMocks()
  })

  it('Should create unsubscribe link', () => {
    const unsubscribeLinkMock = faker.internet.url()
    const urlPrefix = faker.internet.url()
    getUnsubscribeLinkMock.mockResolvedValue(unsubscribeLinkMock)
    const subscriberMock = getSubscriberMock()

    mountFooter(subscriberMock.id, urlPrefix, '')

    expect(getUnsubscribeLinkMock).toBeCalledWith(urlPrefix, subscriberMock.id)
  })

  it('Should inject unsubscribe link on footer', () => {
    const unsubscribeLinkMock = faker.internet.url()
    const urlPrefix = faker.internet.url()
    getUnsubscribeLinkMock.mockImplementation(() => unsubscribeLinkMock)
    const subscriberMock = getSubscriberMock()

    const renderedFooter = mountFooter(
      subscriberMock.id,
      urlPrefix,
      `test ${HtmlFooterKeys.unsubscribeLink} test`
    )
    expect(renderedFooter).toContain(unsubscribeLinkMock)
  })
})
