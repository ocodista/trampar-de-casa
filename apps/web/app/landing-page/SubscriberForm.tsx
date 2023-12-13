'use client'
import { useLoadingContext } from 'app/contexts/LoadingContext'
import { ToastComponentProps, useToast } from 'app/hooks/use-toast'
import { StatusCodes } from 'http-status-codes'
import { FormEventHandler, useState } from 'react'
import { ApiRoutes } from 'shared/src/enums/apiRoutes'
import fireworks from '../utils/confetti'
import { ContributeDialog } from './ContributeDialog'

export function SubscriberForm() {
  const { isLoading, withLoading } = useLoadingContext()
  const { toast } = useToast()
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false)

  const errorToast = (description: string, props?: ToastComponentProps) =>
    toast({
      title: 'Algo deu errado 🥶',
      variant: 'destructive',
      description: description,
      ...props,
    })

  const resendEmail = async (email: string) => {
    const response = await fetch(ApiRoutes.ResendEmail, {
      body: JSON.stringify({ email }),
      method: 'POST',
    })
    if (response.ok) {
      setIsContributeDialogOpen(true)
      fireworks()
      return
    }
    if (response.status === StatusCodes.CONFLICT) {
      errorToast(await response.text())
      return
    }
    errorToast(
      'Não conseguimos reenviar seu e-mail, tente novamente mais tarde.'
    )
    return
  }

  const saveSubscriber: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email').toString()

    const response = await fetch(ApiRoutes.Subscribers, {
      body: JSON.stringify({ email }),
      method: 'POST',
    })

    const resendEmailToast = async () => {
      const { message, isConfirmed } = (await response.json()) as {
        isConfirmed: boolean
        message: string
      }
      const conflictToast = errorToast(message, {
        action: !isConfirmed && (
          <h1
            className="cursor-pointer"
            onClick={async () => {
              conflictToast.dismiss()
              await withLoading(async () => await resendEmail(email))
            }}
          >
            Reenviar email
          </h1>
        ),
      })
    }

    if (response.ok) {
      setIsContributeDialogOpen(true)
      fireworks()
      return
    }
    if (response.status === StatusCodes.CONFLICT) {
      await resendEmailToast()
      return
    }
    errorToast(
      'Não conseguimos adicionar seu e-mail, tente novamente mais tarde.'
    )
    return
  }

  return (
    <>
      <div className="-my-2.5 inline-block w-full rounded-[18px] border-2 border-black p-1.5 focus-within:ring focus-within:ring-indigo-300 lg:-m-2.5 xl:pl-7">
        <ContributeDialog
          open={isContributeDialogOpen}
          onClose={() => setIsContributeDialogOpen(false)}
        />
        <form onSubmit={(e) => withLoading(async () => saveSubscriber(e))}>
          <div className="flex flex-wrap items-center">
            <div className="w-full xl:flex-1">
              <input
                className="w-full p-3 text-gray-600 placeholder-gray-600 outline-none xl:p-0 xl:pr-7"
                id="email"
                type="email"
                disabled={isLoading}
                name="email"
                required
                placeholder="Digite seu melhor e-mail"
              />
            </div>
            <div className="w-full xl:w-auto">
              <div className="block">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="pointer w-full cursor-pointer rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition duration-200 ease-in-out hover:bg-indigo-700 focus:ring 
                      focus:ring-indigo-300 disabled:cursor-default disabled:opacity-50"
                >
                  Quero participar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <section className="my-4 mb-16 min-h-[30px] text-sm text-red-600"></section>
    </>
  )
}
