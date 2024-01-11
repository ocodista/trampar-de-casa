'use client'

import { Button } from 'app/components/ui/button'
import { Input } from 'app/components/ui/input'
import { useToast } from 'app/hooks/use-toast'
import { FormEventHandler } from 'react'

export default function Form() {
  const { toast } = useToast()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email')
    const response = await fetch(
      `/api/email-preview/send?email=${email.toString()}`,
      { method: 'POST' }
    )
    if (response.ok) {
      toast({
        title: 'Tudo certo 🥳',
        description: 'Email enviado!',
      })
      return
    }

    toast({
      title: 'Algo deu errado',
      variant: 'destructive',
      description: 'Tente novamente mais tarde',
    })
  }
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <fieldset className="space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          required
          placeholder="test@email.com"
          id="email"
          type="email"
          name="email"
        />
      </fieldset>
      <Button type="submit">Enviar</Button>
    </form>
  )
}
