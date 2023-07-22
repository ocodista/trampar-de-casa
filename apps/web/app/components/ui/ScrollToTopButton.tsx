'use client'
import clsx from 'clsx'
import { ChevronUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [backToTop, setBackToTop] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleScroll() {
    if (window.scrollY > 600) {
      setBackToTop(true)
    } else {
      setBackToTop(false)
    }
  }

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollUp}
      aria-label="Go to Top"
      role="button"
      className={clsx(
        'fixed right-6 rounded-lg border border-slate-100 bg-indigo-600 p-2 text-5xl text-slate-100 shadow transition-all duration-300 hover:bg-indigo-700 focus:ring focus:ring-indigo-300',
        [
          { 'bottom-6 opacity-80': backToTop },
          { '-bottom-20 opacity-0': !backToTop },
        ]
      )}
    >
      <ChevronUpIcon />
    </button>
  )
}
