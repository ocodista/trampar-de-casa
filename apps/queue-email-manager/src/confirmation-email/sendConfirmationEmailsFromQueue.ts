import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import { sendConfirmationEmail } from "shared/src/email";
import { EmailQueues } from "shared/src/enums/emailQueues";
import { connectToQueue } from "shared/src/queue";

dotenv.config()

const rabbitmqUrl = process.env.RABBIT_CONNECTION_STRING || ''
const secretKey = process.env.SECRET_KEY || ''

async function sendEmail(id: string, email: string) {
  const handleError = (err: unknown) => {
    console.error(`Error sending to: ${email}`, err)
    fs.appendFileSync(path.resolve(__dirname, './error-emails.txt'), `${email}\n`)
  }

  try {
    const response = await sendConfirmationEmail({ 
      resendKey: process.env.RESEND_KEY || '',
      secretKey,
      to: email,
      subscriberId: id
    })
    if (!response) {
      handleError((response as any).statusText)
    } else {
      fs.appendFileSync(path.resolve(__dirname, './success-emails.txt'), `${email}\n`)
      console.log(`Successfully sent to: ${email}\n`)
    }
  } catch (err) {
    handleError(err)
  }
}

async function main() {
  const emailsSent = fs.readFileSync(path.resolve(__dirname, './success-emails.txt'), 'utf8').split("\n")

  const channel = await connectToQueue(rabbitmqUrl, EmailQueues.ConfirmationEmail)
  const { ConfirmationEmail } = EmailQueues
  await channel.assertQueue(ConfirmationEmail, { durable: false });

  channel.prefetch(1)

  channel.consume(ConfirmationEmail, async (message) => {
    if (message !== null) {
      const parsedMessage = JSON.parse(message.content.toString())
      const { id, email } = parsedMessage
      if (!emailsSent.includes(email)) {
        console.log("Sending to: " + email + "...")
        await sendEmail(id, email)
      }
      else {
        console.log(`Ignoring ${email}...`)
      }
      channel.ack(message);
    } 
  }, { noAck: false });

  console.log("Waiting for messages...\n")
}

main().catch(console.error);

