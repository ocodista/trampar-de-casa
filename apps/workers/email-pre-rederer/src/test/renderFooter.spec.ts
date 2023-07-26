import { faker } from '@faker-js/faker'
import * as encryptFile from 'shared'
import * as getUnsubscribeFile from 'src/getUnsubscribeLink'
import { renderFooter } from 'src/renderFooter'
import { vi } from 'vitest'
import { getSubscriberMock } from './factories/subscriberFactory'

const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })
vi.spyOn(encryptFile, 'encrypt').mockImplementation(() => ENCRYPTED_VALUE_MOCK)
describe('Render footer', () => {
  it('Create unsubscribe link', () => {
    const urlMock = faker.internet.url()
    const subscriberMock = getSubscriberMock()
    const expectedUrl = `${urlMock}${encryptFile.UiRoutes.OptOut}/${ENCRYPTED_VALUE_MOCK}`

    const unsubscribeLink = getUnsubscribeFile.getUnsubscribeLink(
      urlMock,
      subscriberMock.id
    )

    expect(unsubscribeLink).toEqual(expectedUrl)
  })
  it.todo('Should inject unsubscribe link on footer', () => {
    const unsubscribeLinkMock = faker.internet.url()
    const urlPrefix = faker.internet.url()
    const getUnsubscribeLinkMock = vi.fn()
    getUnsubscribeLinkMock.mockResolvedValue(unsubscribeLinkMock)
    const subscriberMock = getSubscriberMock()

    vi.spyOn(getUnsubscribeFile, 'getUnsubscribeLink').mockImplementation(
      getUnsubscribeLinkMock
    )

    renderFooter(subscriberMock.id, urlPrefix)

    expect(getUnsubscribeLinkMock).toBeCalledWith()
  })
})
