'use client'
 
export default function GlobalError ({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Algo deu errado!</h2>
        <button onClick={() => reset()}>Tente novamente</button>
        <a className="pl-2" href="/">Volte para a página inicial</a>
      </body>
    </html>
  )
}