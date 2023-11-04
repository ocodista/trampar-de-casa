import { faker } from '@faker-js/faker'
import { GetMessage } from 'amqplib'

export const messageFactory = () => {
  const emailMock = faker.internet.email()
  const subjectMock = faker.string.sample()
  const htmlMock = faker.string.sample()
  const messageMock = {
    content: Buffer.from(
      JSON.stringify({
        [emailMock]: { html: htmlMock, subject: subjectMock },
      })
    ),
  } as GetMessage

  return { emailMock, htmlMock, messageMock, subjectMock }
}
