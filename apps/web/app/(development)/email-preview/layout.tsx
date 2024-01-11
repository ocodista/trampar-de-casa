'use server'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  if (process.env['development'] === 'true') {
    notFound()
  }
  return <>{children}</>
}
