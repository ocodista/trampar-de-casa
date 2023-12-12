'use client'
import { useToast } from 'app/hooks/use-toast'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ToastContainer() {
  const searchParam = useSearchParams()
  const { toast } = useToast()
  useEffect(() => {
    const hasSuccessParam = searchParam.has('success')
    if (!hasSuccessParam) return
    toast({
      title: 'Tudo certo 🥳',
      description: 'Muito obrigado por compartilhar sua experiência!',
    })
  }, [])

  return null
}
