import { getEmailProps } from '../getEmailProps'
import { getRoleMock } from './factories/roleFactory'
import { getSubscriberMock } from './factories/subscriberFactory'

describe('Get Email Props', () => {
  it('converts subscriber and roles into { user: { email, id }, roleIds: [] } object', () => {
    const subscriberMock = getSubscriberMock()
    const rolesMock = [getRoleMock(), getRoleMock()]
    expect(getEmailProps(subscriberMock, rolesMock)).toStrictEqual({
      user: { email: subscriberMock.email, id: subscriberMock.id },
      rolesId: rolesMock.map((role) => role.id),
    })
  })
})
