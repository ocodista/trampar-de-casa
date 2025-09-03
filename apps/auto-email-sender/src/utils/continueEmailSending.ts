#!/usr/bin/env ts-node
import readline from 'readline'
import { createRabbitMqChannel, EmailQueues } from 'shared'
import { emailSender } from '../email-sender'

const waitForUserConfirmation = async (emailCount: number): Promise<void> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    console.log(`\n🚨 READY TO SEND ${emailCount} EMAILS 🚨`)
    console.log('Press ENTER to continue or Ctrl+C to abort...')

    rl.question('', () => {
      rl.close()
      resolve()
    })

    process.on('SIGINT', () => {
      console.log('\n❌ Aborted by user')
      rl.close()
      process.exit(0)
    })
  })
}

export const continueEmailSending = async () => {
  try {
    console.log('📧 Checking email queue status...')

    const queueChannel = await createRabbitMqChannel()
    const queueInfo = await queueChannel.checkQueue(EmailQueues.EmailSender)
    const emailCount = queueInfo.messageCount

    console.log(`📧 Found ${emailCount.toLocaleString()} emails ready to send`)

    if (emailCount > 0) {
      await waitForUserConfirmation(emailCount)
      console.log('✅ User confirmed - proceeding with email sending...')

      console.time('emailSender time')
      const emailSenderResult = await emailSender()
      console.timeEnd('emailSender time')
      console.log('✅ emailSender completed')
      console.log(
        'emailSender result:',
        JSON.stringify(emailSenderResult, null, 2)
      )

      console.log('\n🎉 Email sending completed successfully!')
    } else {
      console.log('⚠️ No emails found in queue - nothing to send')

      // Check other queues to see if processing is incomplete
      const otherQueues = [
        EmailQueues.RolesAssignerSubs,
        EmailQueues.EmailPreRenderSubs,
        EmailQueues.EmailPreRenderer,
      ]

      let hasOtherMessages = false
      for (const queueName of otherQueues) {
        const info = await queueChannel.checkQueue(queueName)
        if (info.messageCount > 0) {
          console.log(`📋 Found ${info.messageCount} messages in ${queueName}`)
          hasOtherMessages = true
        }
      }

      if (hasOtherMessages) {
        console.log(
          '\n💡 Tip: Run the full process to complete processing and generate emails'
        )
      }
    }

    await queueChannel.close()
  } catch (error) {
    console.error('\n❌ ERROR during email sending:', error)
    throw error
  }
}

// If run directly
if (require.main === module) {
  continueEmailSending()
    .then(() => {
      console.log('\n✅ Continue email sending completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Error:', error)
      process.exit(1)
    })
}
