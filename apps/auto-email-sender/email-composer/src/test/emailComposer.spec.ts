import { faker } from '@faker-js/faker'
import * as resendLib from 'resend'
import * as sharedFile from 'shared'
import * as createRabbitMqConnectionFile from 'shared/src/queue/createRabbitMqConnection'
import { channelMock } from 'shared/src/test/helpers/rabbitMQ'
import { EmailPreRenderMessage, composeEmail } from 'src/emailComposer'
import { parsePreRenderMessage, rolesSubject } from 'src/parsePreRenderMessage'
import { vi } from 'vitest'
import * as createEmailHtmlFile from '../createEmailHtml'
import * as getHtmlRolesFile from '../getHtmlRoles'
import { collectionMock } from './utils/mockMongo'
// mock process.exit
vi.spyOn(process, 'exit').mockImplementation(vi.fn())

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
const mongoDbConfig = () => {
  vi.spyOn(sharedFile, 'getMongoConnection')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementation(async () => ({
      db: () => ({
        collection: vi.fn(),
      }),
    }))
}
const resendConfig = () => {
  vi.spyOn(resendLib, 'Resend').mockReturnValue({
    emails: {
      send: vi.fn(),
    },
  } as unknown as resendLib.Resend)
}

describe('Email Composer Service Tests', () => {
  beforeEach(() => {
    rabbitMqConfig()
    vi.spyOn(getHtmlRolesFile, 'getHtmlRoles').mockImplementation(
      getHtmlRolesStub
    )
  })

  it('establishes connection with rabbitMQ', async () => {
    rabbitMqConfig()
    mongoDbConfig()
    resendConfig()

    await composeEmail()

    expect(createRabbitMqConnectionStub).toHaveBeenCalled()
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
      const memoizedRoles = new Map()
      await parsePreRenderMessage(
        mockedBufferMessage,
        collectionMock,
        memoizedRoles,
        '',
        ''
      )
      expect(getHtmlRolesStub).toBeCalledWith(
        rolesMock,
        collectionMock,
        memoizedRoles,
        ''
      )
    })

    it('converts rabbit message buffer into [email]: bodyHTML object', async () => {
      const createEmailHtmlStub = vi.fn()
      vi.spyOn(createEmailHtmlFile, 'createEmailHtml').mockImplementation(
        createEmailHtmlStub
      )
      const memoizedRoles = new Map()
      const createEmailHtmlReturn = faker.string.sample()
      createEmailHtmlStub.mockResolvedValue(createEmailHtmlReturn)
      const rolesHTML = faker.string.sample()
      getHtmlRolesStub.mockReturnValue(rolesHTML)

      const returnedObj = await parsePreRenderMessage(
        Buffer.from(JSON.stringify(prerenderMessageMock)),
        collectionMock,
        memoizedRoles,
        '',
        ''
      )

      expect(returnedObj).toEqual({
        [emailMock]: {
          html: createEmailHtmlReturn,
          subject: rolesSubject(rolesMock.length),
        },
      })
    })
  })
})
