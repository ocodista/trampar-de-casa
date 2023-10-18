import { faker } from '@faker-js/faker'
import { GetMessage } from 'amqplib'

export const messageFactory = () => {
  const emailMock = faker.internet.email()
  const htmlMock = faker.string.sample()
  const messageMock = {
    content: Buffer.from(
      JSON.stringify({
        [emailMock]: htmlMock,
      })
    ),
  } as GetMessage

  return { emailMock, htmlMock, messageMock }
}
