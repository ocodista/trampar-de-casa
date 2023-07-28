import { faker } from '@faker-js/faker'
import * as encryptFile from 'shared'
import { getUnsubscribeLink } from 'src/getUnsubscribeLink'
import { vi } from 'vitest'
import { getSubscriberMock } from './factories/subscriberFactory'
const ENCRYPTED_VALUE_MOCK = faker.string.hexadecimal({ length: 32 })

vi.spyOn(encryptFile, 'encrypt').mockImplementation(() => ENCRYPTED_VALUE_MOCK)
describe('Create unsubscribe link', () => {
  it('Create unsubscribe link', () => {
    const urlMock = faker.internet.url()
    const subscriberMock = getSubscriberMock()
    const expectedUrl = `${urlMock}${encryptFile.UiRoutes.OptOut}/${ENCRYPTED_VALUE_MOCK}`

    const unsubscribeLink = getUnsubscribeLink(urlMock, subscriberMock.id)

    expect(unsubscribeLink).toEqual(expectedUrl)
  })
})
