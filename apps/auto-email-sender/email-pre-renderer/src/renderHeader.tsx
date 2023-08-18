import { render } from '@react-email/render'
import React from 'react'
import { Header } from './Header'

export function renderHeader(rolesIds: string[]) {
  return render(<Header rolesCount={rolesIds.length} />)
}
