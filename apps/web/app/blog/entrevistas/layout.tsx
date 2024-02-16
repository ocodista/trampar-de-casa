import { ReactNode } from 'react'
import style from './article.module.css'

export default function Layout({ children }: { children: ReactNode }) {
  const styleClass =
    'relative w-full #bg-white px-6 py-12 #shadow-xl #shadow-slate-700/10 #ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pb-28 lg:pt-16 prose mx-auto max-w-prose lg:text-lg'
  return (
    <article className={`container ${style.article} ${styleClass}`}>
      {children}
    </article>
  )
}
