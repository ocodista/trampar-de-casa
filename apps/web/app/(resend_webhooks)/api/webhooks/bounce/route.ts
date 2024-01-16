import { getSupabaseClient } from 'db/src/supabase/getSupabaseClient'
import { Webhook } from 'svix'

const getWebhook = () => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  if (!webhookSecret) throw new Error('RESEND_WEBHOOK_SECRET is not settled')
  return new Webhook(webhookSecret)
}

type EmailType =
  | 'email.sent'
  | 'email.delivered'
  | 'email.delivery_delayed'
  | 'email.complained'
  | 'email.bounced'
  | 'email.opened'
  | 'email.clicked'
interface WebhookEvent {
  created_at: string
  data: {
    created_at: string
    email_id: string
    from: string
    subject: string
    to: string[]
  }
  type: EmailType
}

export const POST = async (req: Request) => {
  const webhook = getWebhook()
  const svix_id = req.headers.get('svix-id') ?? ''
  const svix_timestamp = req.headers.get('svix-timestamp') ?? ''
  const svix_signature = req.headers.get('svix-signature') ?? ''

  const body = await req.text()
  const payload = webhook.verify(body, {
    'svix-id': svix_id,
    'svix-timestamp': svix_timestamp,
    'svix-signature': svix_signature,
  }) as WebhookEvent

  if (payload.type === 'email.bounced') {
    const supabaseClient = getSupabaseClient()
    const bouncedEmail = payload.data.to[0]

    const { error } = await supabaseClient
      .from('Subscribers')
      .update({ optOut: true })
      .eq('email', bouncedEmail)
    if (error) {
      console.error('Error when update bounced email: ', error)
    }
  }

  return new Response(null, { status: 200 })
}
