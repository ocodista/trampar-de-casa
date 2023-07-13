'use client'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoadingContext } from 'app/contexts/LoadingContext'
import { useToast } from 'app/hooks/use-toast'
import { StatusCodes } from 'http-status-codes'
import { useForm } from 'react-hook-form'
import { ApiRoutes } from 'shared/src/enums/apiRoutes'
import { z } from 'zod'
import fireworks from '../utils/confetti'

const validationSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
})
type ValidationSchema = z.infer<typeof validationSchema>

export function SubscriberForm() {
  const { isLoading, withLoading } = useLoadingContext()
  const { toast } = useToast()

  const saveSubscriber = async () => {
    const email = getValues().email
    try {
      const response = await fetch(ApiRoutes.Subscribers, {
        body: JSON.stringify({ email }),
        method: 'POST',
      })

      if (response.ok) {
        fireworks()
        toast({
          title: 'Tudo certo 🥳',
          description: 'Enviamos uma confirmação para o seu e-mail!',
        })
        return
      }

      if (response.status === StatusCodes.CONFLICT) {
        toast({
          title: 'Algo deu errado 🥶',
          variant: 'destructive',
          description: await response.text(),
        })
        return
      }

      throw new Error(response.statusText)
    } catch (err) {
      toast({
        title: 'Algo deu errado 🥶',
        variant: 'destructive',
        description:
          'Não conseguimos adicionar seu e-mail, tente novamente mais tarde.',
      })
    }

    return false
  }

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const {
    register,
    getValues,
    formState: { isValid, errors },
  } = methods

  return (
    <>
      <div className="p-1.5 xl:pl-7 inline-block w-full border-2 border-black rounded-xl focus-within:ring focus-within:ring-indigo-300 -my-2.5 lg:-m-2.5">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await withLoading(saveSubscriber)
          }}
        >
          <div className="flex flex-wrap items-center">
            <div className="w-full xl:flex-1">
              <input
                className="p-3 xl:p-0 xl:pr-7 w-full text-gray-600 placeholder-gray-600 outline-none"
                id="email"
                type="email"
                disabled={isLoading}
                placeholder="Digite seu melhor e-mail"
                {...register('email')}
              />
            </div>
            <div className="w-full xl:w-auto">
              <div className="block">
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="py-4 px-7 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200 pointer 
                      disabled:opacity-50 cursor-pointer disabled:cursor-default"
                >
                  Quero participar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <section className="text-red-600 my-4 mb-16 min-h-[30px] text-sm">
        <ErrorMessage
          name="email"
          errors={errors}
          render={({ message }) => <p>{message}</p>}
        />
      </section>
    </>
  )
}
