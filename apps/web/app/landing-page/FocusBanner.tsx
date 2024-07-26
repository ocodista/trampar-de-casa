'use client'

import Link from 'next/link'

export function FocusBanner() {
  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center gap-1 bg-indigo-600 px-4 py-2 leading-none text-indigo-100 max-md:flex-col max-md:gap-2 max-md:py-3"
        role="alert"
      >
        <span className="mr-2 font-medium leading-tight max-md:text-lg">
          {'Apoie nosso projeto e fortaleça o trabalho remoto, cadastre-se na '}
        </span>
        <Link
          className="mr-[6px] flex cursor-pointer items-center gap-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold uppercase transition-colors hover:bg-indigo-700 max-md:text-sm max-md:font-semibold"
          href={'https://husky.io?ref=nzg5ndz'}
          referrerPolicy="no-referrer"
          target="__blank"
        >
          Husky 🤑✨
        </Link>
      </div>
    </div>
  )
}
