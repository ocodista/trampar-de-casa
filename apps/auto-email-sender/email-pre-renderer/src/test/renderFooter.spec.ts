import { faker } from '@faker-js/faker'
import * as encryptFile from 'shared'
import { renderFooter } from 'src/renderFooter'
import { vi } from 'vitest'
import * as getUnsubscribeFile from '../getUnsubscribeLink'
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

    renderFooter(subscriberMock.id, urlPrefix)

    expect(getUnsubscribeLinkMock).toBeCalledWith(urlPrefix, subscriberMock.id)
  })

  it('Should inject unsubscribe link on footer', () => {
    const unsubscribeLinkMock = faker.internet.url()
    const urlPrefix = faker.internet.url()
    getUnsubscribeLinkMock.mockImplementation(() => unsubscribeLinkMock)
    const subscriberMock = getSubscriberMock()

    const renderedFooter = renderFooter(subscriberMock.id, urlPrefix)
    expect(renderedFooter).toContain(unsubscribeLinkMock)
  })
})
