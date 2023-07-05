import { useEffect, useState } from 'react'
import { ChevronUpIcon } from 'lucide-react'

export default function ScrollToTopButton() {
  const [backToTop, setBackToTop] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        setBackToTop(true)
      } else {
        setBackToTop(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    backToTop && (
      <button
        onClick={scrollUp}
        className="fixed bottom-6 right-6 p-4 text-5xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200 rounded-lg shadow text-slate-100 border-slate-100 border opacity-75"
      >
        <ChevronUpIcon />
      </button>
    )
  )
}
