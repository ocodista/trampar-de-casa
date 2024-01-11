'use server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { isDevMode } from 'shared'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  if (!isDevMode()) {
    notFound()
  }
  return <>{children}</>
}
