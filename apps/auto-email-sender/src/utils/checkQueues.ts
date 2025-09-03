#!/usr/bin/env ts-node
import { createRabbitMqChannel, EmailQueues } from 'shared'

export const checkQueues = async () => {
  try {
    console.log('📊 Checking RabbitMQ queues status...\n')

    const channel = await createRabbitMqChannel()

    const queues = [
      {
        name: EmailQueues.RolesAssignerSubs,
        description: 'Subscribers waiting for role assignment',
      },
      {
        name: EmailQueues.EmailPreRenderSubs,
        description: 'Subscribers waiting for email pre-render',
      },
      {
        name: EmailQueues.EmailPreRenderer,
        description: 'Pre-rendered emails waiting for composition',
      },
      {
        name: EmailQueues.EmailSender,
        description: 'Composed emails ready to send',
      },
    ]

    let totalMessages = 0

    for (const queue of queues) {
      try {
        const queueInfo = await channel.checkQueue(queue.name)
        const messageCount = queueInfo.messageCount
        totalMessages += messageCount

        const status = messageCount > 0 ? '📧' : '✅'
        console.log(
          `${status} ${queue.name}: ${messageCount.toLocaleString()} messages`
        )
        console.log(`   └── ${queue.description}`)

        if (messageCount > 0) {
          console.log(`   └── Status: ${messageCount} pending`)
        }
        console.log()
      } catch (error) {
        console.error(`❌ Error checking queue ${queue.name}:`, error)
      }
    }

    console.log(`📊 SUMMARY:`)
    console.log(
      `   • Total messages across all queues: ${totalMessages.toLocaleString()}`
    )

    if (totalMessages > 0) {
      console.log(
        `   • Status: Processing incomplete - use --continue to resume`
      )
    } else {
      console.log(`   • Status: All queues empty - processing complete`)
    }

    await channel.close()
    return { totalMessages, queues: queues.length }
  } catch (error) {
    console.error('❌ Failed to check queues:', error)
    throw error
  }
}

// If run directly
if (require.main === module) {
  checkQueues()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error:', error)
      process.exit(1)
    })
}
