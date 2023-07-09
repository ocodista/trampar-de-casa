import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'
import { useToast } from '../../../global/components/ui/use-toast'
import { ApiRoutes } from '../../../global/enums/apiRoutes'
import { UiRoutes } from '../../../global/enums/uiRoutes'
import { errorMessage } from '../../constants'

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
        <div className="absolute top-0 left-0">
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
              className="p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none"
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
                className="py-4 px-7 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200 pointer disabled:opacity-50 cursor-pointer disabled:cursor-default"
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
