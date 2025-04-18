'use client'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from 'app/components/ui/dialog'
import {
  login,
  sendEditPreferencesEmail,
} from 'app/utils/LoginPreferencesActions'
import { useState } from 'react'
import { buttonVariants } from 'app/components/ui/button'
import { cn } from 'global/utils'

type ContributeDialogProps = {
  open: boolean
  onClose: () => void
}

export function LoginPreferences({ onClose, open }: ContributeDialogProps) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleClose = () => {
    onClose()
    setEmailSent(false)
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    if (!validateEmail(email)) {
      setErrorMessage('Por favor, insira um endereço de e-mail válido.')
      return
    }

    try {
      const subscriberId = await login(email)
      if (subscriberId) {
        localStorage.setItem('loginEmail', email)
        await sendEditPreferencesEmail(email, subscriberId)
        setEmailSent(true)
        setEmail('')
      }
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        setErrorMessage(
          'E-mail não encontrado. Por favor, verifique o e-mail e tente novamente.'
        )
      } else {
        setErrorMessage('Erro ao fazer login. Por favor, tente novamente.')
      }
      console.error('Erro ao fazer login:', error)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrorMessage('')
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          {emailSent ? (
            <>
              <DialogTitle>Verifique seu e-mail!</DialogTitle>
              <DialogDescription>
                <b>Enviamos um link</b> para você configurar suas preferências.
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle className="font-bold">
                Faça login para definir suas preferências
              </DialogTitle>
              <DialogDescription>
                Ao fazer login, <b>enviaremos um e-mail</b> com o link para
                configurar suas preferências.
              </DialogDescription>
              <div className="flex h-full w-full">
                <form className="w-full" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-1 block">E-mail:</label>
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  {errorMessage && (
                    <div className="mb-4 text-red-500">{errorMessage}</div>
                  )}
                  <button
                    type="submit"
                    className={cn(
                      'px-11',
                      buttonVariants({ size: 'lg' }),
                      'w-full font-semibold'
                    )}
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
