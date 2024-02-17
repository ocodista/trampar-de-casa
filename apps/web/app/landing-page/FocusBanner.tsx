'use client'

import Link from 'next/link'
import { LandingPageRoutes } from './landingPageRoutes'

export function FocusBanner() {
  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center gap-1 bg-indigo-600 px-4 py-2 leading-none text-indigo-100 max-md:flex-col max-md:gap-2 max-md:py-3"
        role="alert"
      >
        <span className="mr-2 font-medium leading-tight max-md:text-lg">
          Sam converteu sua empresa ao Trabalho Remoto.
        </span>
        <Link
          className="mr-[6px] flex cursor-pointer items-center gap-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-indigo-700 max-md:text-sm max-md:font-semibold"
          href={LandingPageRoutes.Blog}
          referrerPolicy="no-referrer"
          target="__blank"
        >
          🤓 Leia a Entrevista
        </Link>
      </div>
    </div>
  )
}
