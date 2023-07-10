'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLoadingContext } from '../contexts/LoadingContext'
import { ApiRoutes } from 'shared/src/enums'
import { useToast } from '../hooks/use-toast'

export default function Page() {
  const { isLoading, setLoaderVisibility } = useLoadingContext()
  const searchParams = useSearchParams()
  const id = searchParams.get('id') || ''
  const { toast } = useToast()

  useEffect(() => {
    if (!id) {
      toast({
        title: 'Algo deu errado',
        variant: 'destructive',
        description: 'Tente novamente mais tarde',
      })
      return
    }

    ;(async () => {
      setLoaderVisibility(true)
      const response = await fetch(ApiRoutes.ConfirmEmail, {
        body: JSON.stringify({
          id,
        }),
        method: 'POST',
      })

      if (!response.ok) {
        toast({
          title: 'Algo deu errado',
          variant: 'destructive',
          description: 'Tente novamente mais tarde',
        })
      }
      setLoaderVisibility(false)
    })()
  }, [id, setLoaderVisibility, toast])

  if (isLoading) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {id ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Tudo certo!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Obrigado por confirmar o seu e-mail.
            </p>
          </div>
        ) : (
          <h1 className="text-3xl font-extrabold text-gray-900">
            Algo deu errado.
          </h1>
        )}

        <a
          href="/"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:boder hover:border-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Voltar para página principal.
        </a>
      </div>
    </div>
  )
}
