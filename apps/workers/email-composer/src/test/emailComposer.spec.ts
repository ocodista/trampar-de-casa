import { faker } from '@faker-js/faker'
import { EmailQueues } from 'shared/src/enums/emailQueues'
import * as createRabbitMqConnectionFile from 'shared/src/queue/createRabbitMqConnection'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { EmailPreRenderMessage, composeEmail } from 'src/emailComposer'
import { vi } from 'vitest'
import * as getHtmlRolesFile from '../getHtmlRoles'
import { parsePreRenderMessage } from 'src/parsePreRenderMessage'

const createChannelStub = vi.fn().mockResolvedValue(channelMock)
const createRabbitMqConnectionStub = vi.fn().mockResolvedValue({
  createChannel: createChannelStub,
})
const getHtmlRolesStub = vi.fn()
const rabbitMqConfig = () => {
  vi.spyOn(
    createRabbitMqConnectionFile,
    'createRabbitMqConnection'
  ).mockImplementation(createRabbitMqConnectionStub)
}

describe('Email Composer Service Tests', () => {
  beforeEach(() => {
    rabbitMqConfig()
    vi.spyOn(getHtmlRolesFile, 'getHtmlRoles').mockImplementation(
      getHtmlRolesStub
    )
  })

  it('establishes connection with rabbitMQ', async () => {
    await composeEmail()
    expect(createRabbitMqConnectionStub).toBeCalled()
  })

  describe('For each queue message', () => {
    const emailMock = faker.internet.email()
    const rolesMock = [faker.string.uuid(), faker.string.uuid()]
    const prerenderMessageMock: EmailPreRenderMessage = {
      [emailMock]: {
        footerHTML: 'FOOTERHTML',
        headerHTML: 'headerHTML',
        roles: rolesMock,
      },
    }
    const mockedBufferMessage = Buffer.from(
      JSON.stringify(prerenderMessageMock)
    )

    it('gets roles HTML', async () => {
      await parsePreRenderMessage(mockedBufferMessage)
      expect(getHtmlRolesStub).toBeCalledWith(rolesMock)
    })

    it('converts rabbit message buffer into [email]: bodyHTML object', async () => {
      const result = await parsePreRenderMessage(
        Buffer.from(JSON.stringify(prerenderMessageMock))
      )
      const rolesHTML = await getHtmlRolesFile.getHtmlRoles(rolesMock)
      expect(result).toStrictEqual({
        [emailMock]: `${prerenderMessageMock[emailMock].headerHTML}${rolesHTML}${prerenderMessageMock[emailMock].footerHTML}`,
      })
    })
  })
})
