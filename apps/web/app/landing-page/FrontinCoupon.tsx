'use client'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function FrontinCoupon() {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center gap-1 bg-indigo-600 px-4 py-2 leading-none text-indigo-100 max-md:flex-col max-md:gap-2 max-md:py-3"
        role="alert"
      >
        <span className="mr-2 font-medium leading-tight max-md:text-lg">
          <span className="font-bold">20% de desconto</span> no maior evento de{' '}
          <i>Front-end</i> da América Latina.
        </span>

        <span
          className="mr-[6px] flex cursor-pointer items-center gap-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-indigo-700 max-md:text-sm max-md:font-semibold"
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
