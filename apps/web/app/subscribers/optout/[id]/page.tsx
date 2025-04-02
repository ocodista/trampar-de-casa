'use client'
import ButtonAnchor from 'app/components/ui/ButtonAnchor'
import { useCallback, useContext, useEffect } from 'react'
import { ApiRoutes } from 'shared/src/enums'
import { LoadingContext } from '../../../contexts/LoadingContext'
import { useToast } from '../../../hooks/use-toast'

export default function Page({ params }: { params: { id: string } }) {
  const { isLoading, setLoaderVisibility } = useContext(LoadingContext)
  const { id } = params
  const { toast } = useToast()

  const showToast = useCallback(
    () =>
      toast({
        title: 'Algo deu errado',
        variant: 'destructive',
        description: 'Tente novamente mais tarde',
      }),
    [toast]
  )

  useEffect(() => {
    if (!id) {
      showToast()
      return
    }

    ;(async () => {
      setLoaderVisibility(true)
      const response = await fetch(`${ApiRoutes.OptOut}/${id}`, {
        method: 'GET',
      })

      if (!response.ok) {
        showToast()
      }
      setLoaderVisibility(false)
    })()
  }, [id, setLoaderVisibility, showToast])

  if (isLoading) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {id ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Tudo certo!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Você foi removido com sucesso da nossa lista de assinantes e não
              receberá mais e-mails da nossa plataforma.
            </p>
          </div>
        ) : (
          <h1 className="text-3xl font-extrabold text-gray-900">
            Algo deu errado.
          </h1>
        )}

        <ButtonAnchor href="/">Voltar para página principal</ButtonAnchor>
      </div>
    </div>
  )
}
