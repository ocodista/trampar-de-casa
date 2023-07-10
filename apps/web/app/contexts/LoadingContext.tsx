'use client'

import { createContext, useContext, useState } from 'react'
import { LoadingOverlay } from '../components/ui/loadingOverlay'

type LoadingContext = {
  isLoading: boolean
  withLoading: (f: () => Promise<unknown>) => Promise<unknown>
  setLoaderVisibility: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContext>(
  {} as LoadingContext
)

export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false)

  const withLoading = async (asyncFunction: () => Promise<unknown>) => {
    setLoading(true)
    const result = await asyncFunction()
    setLoading(false)
    return result
  }

  return (
    <LoadingContext.Provider
      value={{ isLoading, withLoading, setLoaderVisibility: setLoading }}
    >
      <LoadingOverlay className={isLoading ? 'flex' : 'hidden'} />
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext)
