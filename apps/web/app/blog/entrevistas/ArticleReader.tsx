'use client'

import React, { useRef } from 'react'
import { getAudioUrl } from './utils'
import { usePathname } from 'next/navigation'
import styles from './article-reader.module.css'

export const ArticleReader = () => {
  const pathname = usePathname()
  const slug = pathname.split('/').at(-1)
  const mp3Url = getAudioUrl(slug)
  const audioRef = useRef(null)
  const alertRef = useRef(null)

  return (
    <div ref={alertRef} className="fixed right-5 top-5 z-50 w-[320px]">
      <div
        className={`${styles.slideIn} flex flex-col items-center gap-4 rounded-lg bg-[#004AAD] p-4 text-white shadow-xl transition-transform duration-700
          ease-out`}
        role="region"
        aria-labelledby="audioPlayerTitle"
        tabIndex={0}
      >
        <div className="flex items-center">
          <div id="audioPlayerTitle" className="text-lg font-semibold">
            Ouça essa entrevista!
          </div>
          <button
            onClick={() => {
              alertRef?.current &&
                alertRef.current.classList.add(styles.slideOut)
              audioRef?.current && audioRef.current.pause()
            }}
            className="color-white transparent absolute right-3 top-1 cursor-pointer border-none"
          >
            &#x2715;{' '}
          </button>
        </div>
        <audio
          ref={audioRef}
          src={mp3Url}
          controls
          className="w-full rounded"
          style={{ outline: 'none' }}
        />
      </div>
    </div>
  )
}
