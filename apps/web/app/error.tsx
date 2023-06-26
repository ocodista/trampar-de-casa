'use client'

import { Button } from "global/components/ui/button"
import { useToast } from "global/components/ui/use-toast"

 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const { toast } = useToast()
  console.log(error)
  toast({
    title: "Oops",
    variant: "destructive",
    description: 'Algo deu errado 🥶',
  });

  return (
    <div className="grid place-content-center w-full h-full">
      <h2>Algo deu errado...</h2>
      <Button variant="outline" onClick={() => reset()}>Tente novamente</Button>
    </div>
  )
}
