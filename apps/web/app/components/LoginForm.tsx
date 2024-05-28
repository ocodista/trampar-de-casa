'use client'
import { useToast } from 'app/hooks/use-toast'
import { signInWithEmail } from 'app/utils/logInWithEmail'
import { ChangeEvent, useState } from 'react'
import { z } from 'zod'

export function LoginForm() {
  const emailSchema = z.string().email('Insira um e-mail válido!')
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const validateEmailAndSend = () => {
    try {
      emailSchema.parse(email)
      signInWithEmail(email)
      return true
    } catch (error) {
      toast({
        title: 'Erro ao validar o e-mail',
        variant: 'destructive',
        description: error.issues[0].message,
      })
      return
    }
  }
  return (
    <form className="container mx-auto flex flex-col items-center justify-center gap-4 overflow-hidden p-6">
      <fieldset className="flex flex-col items-start justify-center gap-2">
        <label>Email :</label>
        <input
          type="email"
          className="rounded-md border border-indigo-500 p-2"
          placeholder="Insira aqui o seu email"
          onChange={handleInputValue}
        />
      </fieldset>
      <button
        onClick={validateEmailAndSend}
        type="button"
        className="pointer w-fit cursor-pointer rounded-xl bg-indigo-600 px-16 py-3 font-semibold text-white transition duration-200 ease-in-out hover:bg-indigo-700 focus:ring  focus:ring-indigo-300 disabled:cursor-default disabled:opacity-50"
      >
        Entrar
      </button>
    </form>
  )
}
