import { render } from '@react-email/render'
import React from 'react'
import { Header } from './Header'

export function renderHeader(rolesIds: string[], userId: string) {
  return render(<Header userId={userId} rolesCount={rolesIds.length} />)
}
