'use client'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatusCodes } from 'http-status-codes'
import { Check, Copy } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { ApiRoutes } from 'shared/src/enums'
import { z } from 'zod'
import { PartnerCompanies } from '../components/PartnerCompanies'
import { useLoadingContext } from '../contexts/LoadingContext'
import { useToast } from '../hooks/use-toast'
import fireworks from '../utils/confetti'

const validationSchema = z.object({
  email: z.string().email('Insira um e-mail válido!'),
})

type ValidationSchema = z.infer<typeof validationSchema>

export const Hero = () => {
  const { isLoading, withLoading } = useLoadingContext()
  const [isCopied, setIsCopied] = useState(false)

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
  })

  const {
    register,
    getValues,
    formState: { isValid, errors },
  } = methods

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

  return (
    <>
      <div className="text-center">
        <div
          className="px-4 py-2 max-md:py-3 bg-indigo-600 text-indigo-100 leading-none flex items-center justify-center gap-1 max-md:flex-col max-md:gap-2"
          role="alert"
        >
          <span className="font-medium mr-2 leading-tight max-md:text-lg">
            <span className="font-bold">20% de desconto</span> no maior evento
            de <i>Front-end</i> da América Latina.
          </span>

          <span
            className="px-3 py-1 mr-[6px] flex items-center gap-2 rounded-full uppercase text-xs max-md:text-sm font-bold max-md:font-semibold bg-indigo-500 hover:bg-indigo-700 transition-colors cursor-pointer"
            onClick={async () => {
              await navigator.clipboard
                .writeText('TRAMPARDECASA')
                .then(() => setIsCopied(true))

              setTimeout(() => {
                setIsCopied(false)
                window.open(
                  'https://www.eventbrite.com.br/e/frontin-sampa-2023-code-in-the-dark-tickets-574922567877',
                  '_blank'
                )
              }, 300)
            }}
          >
            TRAMPARDECASA {isCopied ? <Check size={14} /> : <Copy size={14} />}
          </span>
        </div>
      </div>

      <div className="pt-6 pb-28">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center -m-8">
            <div className="w-full lg:w-1/2 p-8 lg:pr-0">
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
              <h1 className="mb-6 text-6xl md:text-8xl lg:text-10xl font-bold font-heading leading-none max-xs:text-4xl">
                Vagas remotas no seu e-mail
              </h1>
              <p className="mb-9 text-lg md:text-xl text-gray-900 font-medium max-xl:max-w-sm">
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
            <div className="w-full lg:w-1/2 p-8">
              <Image
                className="mx-auto max-md:w-full max-lg:w-10/12 max-lg:aspect-video object-cover transform hover:-translate-y-12 transition ease-in-out duration-1000 rounded-xl"
                src="/images/HO-brasil.webp"
                alt="Escritório com uma paisagem natural ao fundo que pode ser vista pelas janelas"
                width={583}
                height={583}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
