'use client'
import { useState, useEffect } from 'react'

interface ArticleReaderProps {
  mp3Url: string
}
export const ArticleReader = ({ mp3Url }: ArticleReaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioRef, setAudio] = useState(null)

  useEffect(() => {
    if (!audioRef) return
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying, audioRef])

  useEffect(() => {
    setAudio(new Audio(mp3Url))
    // Cleanup to pause audio when component unmounts
    return () => {
      audioRef?.current.pause()
    }
  }, [])

  return (
    <div className="fixed left-4 top-4 z-50 flex items-center space-x-2 rounded-full bg-[rgb(79,70,229)] p-2 text-white shadow-lg">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
            fill="#FFF"
          ></path>{' '}
          <path
            d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
            fill="#FFF"
          ></path>{' '}
          <path
            d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
            fill="#FFF"
          ></path>{' '}
        </g>
      </svg>
      <span>Ouça essa entrevista</span>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="focus:outline-none"
      >
        {isPlaying ? (
          // Pause icon
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 9v6m4-6v6m-5 4V5m8 14V5"
            />
          </svg>
        ) : (
          // Play icon
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
