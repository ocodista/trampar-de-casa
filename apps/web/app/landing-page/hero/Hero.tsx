'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Confetti from 'react-confetti'
import { StatusCodes } from 'http-status-codes'
import { LoadingContext } from '../../contexts/LoadingContext'
import { ApiRoutes } from 'shared/src/enums'
import { useToast } from '../../components/ui/use-toast'
import { PartnerCompanies } from './PartnerCompanies'
import { ErrorMessage } from '@hookform/error-message'
import { useQuery } from 'react-query'

const validationSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
})

type ValidationSchema = z.infer<typeof validationSchema>

const PADDING_X = 32

export const Hero = () => {
  const { isLoading, withLoading } = useContext(LoadingContext)

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const {
    register,
    getValues,
    formState: { isValid, errors },
  } = methods

  const [isConfettiVisible, setConfettiVisibility] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setConfettiVisibility(false)
    }, 20_000)
  }, [isConfettiVisible])

  const { toast } = useToast()

  const getSubscribersCount = async (): Promise<number | null> => {
    const response = await fetch(ApiRoutes.Subscribers)
    if (!response?.ok) return null
    const count = await response.json()
    return count
  }
  const { data: subscribersCount } = useQuery<number>(
    'subscribersCountQuery',
    async () => await getSubscribersCount()
  )

  const saveSubscriber = async () => {
    const email = getValues().email
    try {
      const response = await fetch(ApiRoutes.Subscribers, {
        body: JSON.stringify({ email }),
        method: 'POST',
      })

      if (response.ok) {
        setConfettiVisibility(true)
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

  return (
    <>
      {isConfettiVisible && <Confetti width={window.innerWidth - PADDING_X} />}
      <div className="pt-8 pb-28">
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/2 p-8 md:pr-0">
              {subscribersCount ? (
                <div className="inline-block mb-6 px-2 py-1 font-semibold bg-green-100 rounded-md roll-animation">
                  <div className="flex flex-wrap items-center -m-1">
                    <div className="w-auto py-1 px-2">
                      <span className="text-sm">
                        👋 Junte-se a {subscribersCount.toLocaleString()}{' '}
                        inscritos!
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[32px] mb-6"></div>
              )}
              <h1 className="mb-6 text-6xl md:text-8xl lg:text-10xl font-bold font-heading leading-none">
                Vagas remotas no seu e-mail
              </h1>
              <p className="mb-9 text-lg text-gray-900 font-medium md:max-w-md">
                Levamos as melhores oportunidades de trampo até você.
              </p>
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
              <PartnerCompanies />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <img
                className="transform hover:-translate-y-12 transition ease-in-out duration-1000 rounded-xl"
                src="images/HO-brasil.webp"
                alt="Escritório com uma paisagem natural ao fundo que pode ser vista pelas janelas"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
