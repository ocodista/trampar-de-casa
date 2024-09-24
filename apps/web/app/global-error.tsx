'use client'

import Image from 'next/image'
import errorImage from 'public/images/errorImage.png'

export default function GlobalError({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-amber-50 p-4">
        <div className="max-w-2xl rounded-lg bg-white p-8 text-center shadow-xl">
          <Image
            src={errorImage}
            alt="Escritório bagunçado com sinais de 'Sem café'"
            width={600}
            height={600}
            className="mb-6 rounded-lg"
          />
          <h2 className="text-brown-700 mb-4 text-3xl font-bold">
            Oops! Acabou o café!
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Parece que estamos enfrentando um erro.
            café!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="rounded bg-amber-500 px-4 py-2 text-center font-bold text-white transition duration-300 hover:bg-amber-600"
            >
              Voltar para a Página Inicial
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
