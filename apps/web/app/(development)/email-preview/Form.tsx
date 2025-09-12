'use client'

import { Button } from 'app/components/ui/button'
import { Input } from 'app/components/ui/input'
import { useToast } from 'app/hooks/use-toast'
import { FormEventHandler, useState } from 'react'

export default function Form() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentDetails, setSentDetails] = useState<{
    unsubscribeUrl?: string
    subscriberId?: string
    resendId?: string
  } | null>(null)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email')

    // Generate a test subscriber ID
    const subscriberId = `test-${Date.now()}`

    const response = await fetch(
      `/api/email-preview/send?email=${email.toString()}&subscriberId=${subscriberId}`,
      { method: 'POST' }
    )

    if (response.ok) {
      const data = await response.json()
      setSentDetails(data)

      // Log to console for debugging
      console.log('📧 Email sent successfully:', data)

      toast({
        title: 'Tudo certo 🥳',
        description: `Email enviado para ${email}! Check console for details.`,
      })
      setIsSubmitting(false)
      return
    }

    toast({
      title: 'Algo deu errado',
      variant: 'destructive',
      description: 'Tente novamente mais tarde',
    })

    setIsSubmitting(false)
  }
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <fieldset className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            required
            placeholder="test@email.com"
            id="email"
            type="email"
            name="email"
            defaultValue="caiohoborghi@gmail.com"
          />
        </fieldset>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="plausible-event-name=Button+Enviar+Email"
        >
          Enviar
        </Button>
      </form>

      {sentDetails && (
        <div className="mt-6 space-y-2 rounded-lg border border-green-200 bg-green-50 p-4">
          <h3 className="font-semibold text-green-800">
            ✅ Email Sent Successfully!
          </h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Subscriber ID:</span>{' '}
              {sentDetails.subscriberId}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Resend ID:</span>{' '}
              {sentDetails.resendId}
            </p>
            <div className="mt-2">
              <p className="font-medium text-gray-700">Unsubscribe URL:</p>
              <code className="mt-1 block break-all rounded bg-gray-100 p-2 text-xs">
                {sentDetails.unsubscribeUrl}
              </code>
            </div>
            <p className="mt-2 text-xs text-gray-600">
              💡 Check your email client for the unsubscribe link. When clicked,
              check the server logs for the unsubscribe confirmation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
