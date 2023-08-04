import { faker } from '@faker-js/faker'
import * as encryptFile from 'shared'
import { getUnsubscribeLink } from 'src/getUnsubscribeLink'
import { vi } from 'vitest'
import { getSubscriberMock } from './factories/subscriberFactory'
const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })

vi.spyOn(encryptFile, 'encrypt').mockImplementation(() => ENCRYPTED_VALUE_MOCK)
describe('Create unsubscribe link', () => {
  it('Create unsubscribe link', () => {
    vi.stubEnv('SECRET_KEY', faker.string.sample())
    const urlMock = faker.internet.url()
    const subscriberMock = getSubscriberMock()
    const expectedUrl = `${urlMock}${encryptFile.UiRoutes.OptOut}/${ENCRYPTED_VALUE_MOCK}`

    const unsubscribeLink = getUnsubscribeLink(urlMock, subscriberMock.id)

    expect(unsubscribeLink).toEqual(expectedUrl)
  })
  it(`Throws an error when not having SECRET_KEY env`, () => {
    const EMPTY_STRING = ''
    vi.stubEnv('SECRET_KEY', EMPTY_STRING)
    const urlMock = faker.internet.url()
    const subscriberMock = getSubscriberMock()

    expect(() => {
      getUnsubscribeLink(urlMock, subscriberMock.id)
    }).toThrowError()
  })
})
