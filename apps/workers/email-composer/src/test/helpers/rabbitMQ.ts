import amqplibFile, { Connection } from 'amqplib'
import { vi } from 'vitest'

export const assertQueueStub = vi.fn()

const channelMock = {
  ack: vi.fn(),
  assertQueue: assertQueueStub,
} as unknown as amqplibFile.Channel

const connectionReturnMock: Connection = {
  createChannel: () => channelMock,
} as unknown as Connection

export const queueConnectStub = vi.fn()
queueConnectStub.mockResolvedValue(connectionReturnMock)

export const amqplibMock = {
  connect: queueConnectStub,
  close: vi.fn(),
}
