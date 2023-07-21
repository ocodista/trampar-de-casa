import { zodResolver } from '@hookform/resolvers/zod'
import { UiRoutes } from 'app/enums/uiRoutes'
import { useToast } from 'app/hooks/use-toast'
import { StatusCodes } from 'http-status-codes'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useForm } from 'react-hook-form'
import { ApiRoutes } from 'shared'
import { z } from 'zod'

const validationSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
})

type ValidationSchema = z.infer<typeof validationSchema>

const PADDING_X = 32

export const EmailForm = () => {
  const [isLoading, setLoading] = useState(false)
  const [isConfettiVisible, setConfettiVisibility] = useState(false)
  const {
    register,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })
  const router = useRouter()

  const email = watch('email')

  useEffect(() => {
    setTimeout(() => {
      setConfettiVisibility(false)
    }, 20_000)
  }, [isConfettiVisible])

  const { toast } = useToast()

  // TODO: Create loader
  // TODO: Handle error globally
  const saveSubscriber = async () => {
    const email = getValues().email
    try {
      setLoading(true)
      const response = await fetch(ApiRoutes.Subscribers, {
        body: JSON.stringify({ email }),
        method: 'POST',
      })

      if (response.ok) {
        setConfettiVisibility(true)
        toast({
          title: 'Tudo certo 🥳',
          description: 'Você receberá as vagas na próxima quarta-feira!',
        })
        return
      }

      if (response.status === StatusCodes.CONFLICT) {
        toast(errorMessage(await response.text()))
        return
      }

      throw new Error(response.statusText)
    } catch (err) {
      toast(
        errorMessage(
          'Não conseguimos adicionar seu e-mail, tente novamente mais tarde.'
        )
      )
    } finally {
      setLoading(false)
    }
    return false
  }

  return (
    <>
      {isConfettiVisible && (
        <div className="absolute left-0 top-0">
          <Confetti width={window.innerWidth - PADDING_X} />
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          alert('Clickou')
          router.push(UiRoutes.Profile)
        }}
      >
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:flex-1">
            <input
              className="w-full p-3 text-gray-600 placeholder-gray-600 outline-none xl:p-0 xl:pr-7"
              id="email"
              type="email"
              placeholder="Digite seu melhor e-mail"
              {...register('email')}
            />
          </div>
          <div className="w-full xl:w-auto">
            <div className="block">
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="pointer w-full cursor-pointer rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition duration-200 ease-in-out hover:bg-indigo-700 focus:ring focus:ring-indigo-300 disabled:cursor-default disabled:opacity-50"
              >
                Quero participar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
function errorMessage(
  arg0: string
): import('app/hooks/use-toast').ToastComponentProps {
  throw new Error('Function not implemented.')
}
