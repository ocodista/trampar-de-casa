import amqplibFile, { Connection } from 'amqplib'
import { vi } from 'vitest'

export const assertQueueStub = vi.fn()
export const consumerStub = vi.fn()
export const ackStub = vi.fn()
export const sendToQueueStub = vi.fn()
export const prefetchStub = vi.fn()

export const channelMock = {
  ack: ackStub,
  assertQueue: assertQueueStub,
  consume: consumerStub,
  sendToQueue: sendToQueueStub,
  prefetch: prefetchStub,
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
