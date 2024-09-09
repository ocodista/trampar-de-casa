'use client'

import Link from 'next/link'

export function FocusBanner() {
  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center gap-1 bg-indigo-600 px-4 py-2 leading-none text-indigo-100 max-md:flex-col max-md:gap-2 max-md:py-3"
        role="alert"
      >
        <span className="md:text-md mr-2 text-sm text-xs font-medium leading-tight lg:text-lg">
          {'15% de desconto no ingresso do FrontInSampa!'}
        </span>
        <Link
          className="mr-[6px] flex cursor-pointer items-center gap-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-indigo-700 md:text-sm md:font-semibold"
          href="https://fastix.com.br/events/front-in-sampa?coupon=TRAMPARDCASA"
          referrerPolicy="no-referrer"
          target="__blank"
        >
          TRAMPARDCASA 😎
        </Link>
      </div>
    </div>
  )
}
