'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getAudioUrl } from './utils'

const slug = window.location.href.split('/').at(-1)
const mp3Url = getAudioUrl(slug)

export const ArticleReader = () => {
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1_100)

    return () => {
      audioRef?.current.pause()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="fixed right-5 top-5 z-50 w-[300px]">
      <div
        className={`flex flex-col items-center gap-4 rounded-lg bg-[#004AAD] p-4 text-white shadow-xl transition-transform duration-700 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-[200px]'
        }`}
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
              audioRef?.current.pause()
              setIsVisible(false)
            }}
            className="absolute right-3 top-1"
            style={{
              position: 'absolute',

              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
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
