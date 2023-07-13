'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function FrontinCoupon() {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <div className="text-center">
      <div
        className="px-4 py-2 max-md:py-3 bg-indigo-600 text-indigo-100 leading-none flex items-center justify-center gap-1 max-md:flex-col max-md:gap-2"
        role="alert"
      >
        <span className="font-medium mr-2 leading-tight max-md:text-lg">
          <span className="font-bold">20% de desconto</span> no maior evento de{' '}
          <i>Front-end</i> da América Latina.
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
  )
}
