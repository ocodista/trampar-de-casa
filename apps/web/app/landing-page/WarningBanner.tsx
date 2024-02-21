import React from 'react'

export function WarningBanner() {
  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center gap-1 bg-red-400 px-4 py-2 leading-none text-indigo-100 max-md:flex-col max-md:gap-2 max-md:py-3"
        role="alert"
      >
        <span className="mr-2 font-medium leading-tight max-md:text-lg">
          Nosso provedor de e-mail está com problemas, você receberá o e-mail
          dessa semana assim que normalizarem, peço desculpas por toda a
          inconveniência
        </span>
      </div>
    </div>
  )
}
