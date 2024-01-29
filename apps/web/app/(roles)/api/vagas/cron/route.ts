import { getSupabaseClient } from 'db'
import { Resend } from 'resend'

const CRON_SECRET = process.env.CRON_SECRET
const OWNER_EMAIL = process.env.OWNER_EMAIL

export const GET = async (request: Request) => {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const supabase = getSupabaseClient()
  const { count } = await supabase
    .from('rolesRecommendation')
    .select('id', { count: 'exact' })
  if (count === 0) return new Response()

  const resendKey = process.env['RESEND_KEY']
  const resend = new Resend(resendKey)

  await resend.emails.send({
    from: 'Trampar de Casa <logger@trampardecasa.com.br>',
    to: OWNER_EMAIL,
    subject: 'Verifique as sugestões de vagas',
    text: 'Acesse a tabela "rolesRecommendation" e valide as vagas.',
  })
  return Response.json({ success: true })
}
