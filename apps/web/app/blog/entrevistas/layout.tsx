'use client'
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

// export default function Layout({ children }) {
//   return (
//     <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-8 lg:py-12">
//       <img
//         src="/img/beams.jpg"
//         alt=""
//         className="fixed left-1/2 top-48 max-w-none -translate-x-2/3 -translate-y-1/2"
//         width="1308"
//       />
//       <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
//       <div className="relative w-full bg-white px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:pb-28 lg:pt-16">
//         <div className="prose mx-auto max-w-prose lg:text-lg">{children}</div>
//       </div>
//     </div>
//   )
// }
